"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.custom = void 0;
const tslib_1 = require("tslib");
const utils = tslib_1.__importStar(require("./utils"));
const functions_1 = require("@skylib/functions");
const tsutils = tslib_1.__importStar(require("tsutils"));
const ts = tslib_1.__importStar(require("typescript"));
exports.custom = utils.createRule({
    create: (context) => {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment -- Postponed
        const listener = getVisitors();
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return -- Postponed
        return context.defineTemplateBodyVisitor(listener, listener);
        function checkType(type, ...flags) {
            if (type.isTypeParameter()) {
                const constraint = type.getConstraint();
                if (functions_1.is.not.empty(constraint))
                    type = constraint;
                else
                    return flags.includes(ts.TypeFlags.Unknown);
            }
            return (flags.includes(type.getFlags()) ||
                (type.isUnion() &&
                    type.types.every(subtype => flags.includes(subtype.getFlags()))));
        }
        function checkTypeHas(type, expected) {
            return expected
                ? checkTypeIs(type, expected) ||
                    (type.isUnion() &&
                        type.types.some(subtype => checkTypeIs(subtype, expected)))
                : true;
        }
        function checkTypeHasNoneOf(type, expected) {
            return expected ? expected.every(x => checkTypeHasNot(type, x)) : true;
        }
        function checkTypeHasNot(type, expected) {
            return expected ? !checkTypeHas(type, expected) : true;
        }
        function checkTypeHasOneOf(type, expected) {
            return expected ? expected.some(x => checkTypeHas(type, x)) : true;
        }
        function checkTypeIs(type, expected) {
            var _a;
            if (expected)
                switch (expected) {
                    case "any":
                        return checkType(type, ts.TypeFlags.Any);
                    case "array":
                        return (checkType(type, ts.TypeFlags.NonPrimitive, ts.TypeFlags.Object) &&
                            context.checker.isArrayType(type));
                    case "boolean":
                        return checkType(type, ts.TypeFlags.Boolean, ts.TypeFlags.BooleanLike, ts.TypeFlags.BooleanLiteral);
                    case "complex":
                        if (context.checker.isArrayType(type) ||
                            context.checker.isTupleType(type)) {
                            const subtypes = type.typeArguments;
                            functions_1.assert.not.empty(subtypes, "Missing type arguments");
                            return subtypes.some(subtype => checkTypeIs(subtype, expected));
                        }
                        if (type.isUnionOrIntersection())
                            return type.types.some(subtype => checkTypeIs(subtype, expected));
                        return ((_a = type.getSymbol()) === null || _a === void 0 ? void 0 : _a.name) === "__object";
                    case "function":
                        return (checkType(type, ts.TypeFlags.NonPrimitive, ts.TypeFlags.Object) &&
                            type.getCallSignatures().length > 0);
                    case "null":
                        return checkType(type, ts.TypeFlags.Null);
                    case "number":
                        return checkType(type, ts.TypeFlags.Number, ts.TypeFlags.NumberLike, ts.TypeFlags.NumberLiteral);
                    case "object":
                        return (checkType(type, ts.TypeFlags.NonPrimitive, ts.TypeFlags.Object) &&
                            !checkTypeIs(type, "array") &&
                            !checkTypeIs(type, "function"));
                    case "readonly":
                        return type
                            .getProperties()
                            .some(property => tsutils.isPropertyReadonlyInType(type, property.getEscapedName(), context.checker));
                    case "string":
                        return checkType(type, ts.TypeFlags.String, ts.TypeFlags.StringLike, ts.TypeFlags.StringLiteral);
                    case "symbol":
                        return checkType(type, ts.TypeFlags.ESSymbol, ts.TypeFlags.ESSymbolLike, ts.TypeFlags.UniqueESSymbol);
                    case "tuple":
                        return (checkType(type, ts.TypeFlags.NonPrimitive, ts.TypeFlags.Object) &&
                            context.checker.isTupleType(type));
                    case "undefined":
                        return checkType(type, ts.TypeFlags.Undefined);
                    case "unknown":
                        return checkType(type, ts.TypeFlags.Unknown);
                }
            return true;
        }
        function checkTypeIsNoneOf(type, expected) {
            return expected ? expected.every(x => checkTypeIsNot(type, x)) : true;
        }
        function checkTypeIsNot(type, expected) {
            return expected ? !checkTypeIs(type, expected) : true;
        }
        function checkTypeIsOneOf(type, expected) {
            return expected ? expected.some(x => checkTypeIs(type, x)) : true;
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any -- Postponed
        function getVisitors() {
            const { checkReturnType, message, replacement, search, selector: mixed, typeHas, typeHasNoneOf, typeHasNot, typeHasOneOf, typeIs, typeIsNoneOf, typeIsNot, typeIsOneOf } = Object.assign({ checkReturnType: false }, context.options);
            const selector = functions_1.a.fromMixed(mixed).join(", ");
            return {
                [selector]: (node) => {
                    const types = (0, functions_1.evaluate)(() => {
                        const tsNode = context.toTsNode(node);
                        const type = context.checker.getTypeAtLocation(tsNode);
                        return checkReturnType
                            ? type
                                .getCallSignatures()
                                .map(signature => signature.getReturnType())
                            : [type];
                    });
                    if (types.some(type => checkTypeIs(type, typeIs)) &&
                        types.some(type => checkTypeHasNot(type, typeHasNot)) &&
                        types.some(type => checkTypeIsNot(type, typeIsNot)) &&
                        types.some(type => checkTypeHas(type, typeHas)) &&
                        types.some(type => checkTypeHasNoneOf(type, typeHasNoneOf)) &&
                        types.some(type => checkTypeHasOneOf(type, typeHasOneOf)) &&
                        types.some(type => checkTypeIsNoneOf(type, typeIsNoneOf)) &&
                        types.some(type => checkTypeIsOneOf(type, typeIsOneOf)))
                        context.report({
                            data: {
                                message: message !== null && message !== void 0 ? message : `This syntax is not allowed: ${selector}`
                            },
                            fix: () => functions_1.is.not.empty(replacement)
                                ? [
                                    {
                                        range: node.range,
                                        text: functions_1.is.not.empty(search)
                                            ? context.getText(node).replace(
                                            // eslint-disable-next-line security/detect-non-literal-regexp -- Ok
                                            new RegExp(search, "u"), replacement)
                                            : replacement
                                    }
                                ]
                                : [],
                            loc: context.getLocFromRange(node.range),
                            messageId: "customMessage"
                        });
                }
            };
        }
    },
    fixable: "code",
    isRuleOptions: (0, functions_1.evaluate)(() => {
        const TestVO = (0, functions_1.createValidationObject)({
            any: "any",
            array: "array",
            boolean: "boolean",
            complex: "complex",
            function: "function",
            null: "null",
            number: "number",
            object: "object",
            readonly: "readonly",
            string: "string",
            symbol: "symbol",
            tuple: "tuple",
            undefined: "undefined",
            unknown: "unknown"
        });
        const isTest = functions_1.is.factory(functions_1.is.enumeration, TestVO);
        const isTests = functions_1.is.factory(functions_1.is.array.of, isTest);
        return functions_1.is.object.factory({ selector: functions_1.is.or.factory(functions_1.is.string, functions_1.is.strings) }, {
            checkReturnType: functions_1.is.boolean,
            message: functions_1.is.string,
            replacement: functions_1.is.string,
            search: functions_1.is.string,
            typeHas: isTest,
            typeHasNoneOf: isTests,
            typeHasNot: isTest,
            typeHasOneOf: isTests,
            typeIs: isTest,
            typeIsNoneOf: isTests,
            typeIsNot: isTest,
            typeIsOneOf: isTests
        });
    }),
    messages: { customMessage: "{{ message }}" },
    name: "custom"
});
//# sourceMappingURL=custom.js.map