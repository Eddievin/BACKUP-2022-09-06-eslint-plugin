"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.noRestrictedSyntax = void 0;
const tslib_1 = require("tslib");
const utils = tslib_1.__importStar(require("./utils"));
const functions_1 = require("@skylib/functions");
const ts = tslib_1.__importStar(require("typescript"));
exports.noRestrictedSyntax = utils.createRule({
    create: context => {
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
            if (expected)
                switch (expected) {
                    case "any":
                        return checkType(type, ts.TypeFlags.Any);
                    case "array":
                        return (checkType(type, ts.TypeFlags.NonPrimitive, ts.TypeFlags.Object) &&
                            isArray());
                    case "boolean":
                        return checkType(type, ts.TypeFlags.Boolean, ts.TypeFlags.BooleanLike, ts.TypeFlags.BooleanLiteral);
                    case "null":
                        return checkType(type, ts.TypeFlags.Null);
                    case "number":
                        return checkType(type, ts.TypeFlags.Number, ts.TypeFlags.NumberLike, ts.TypeFlags.NumberLiteral);
                    case "function":
                        return (checkType(type, ts.TypeFlags.NonPrimitive, ts.TypeFlags.Object) &&
                            isFunction());
                    case "object":
                        return (checkType(type, ts.TypeFlags.NonPrimitive, ts.TypeFlags.Object) &&
                            isObject());
                    case "string":
                        return checkType(type, ts.TypeFlags.String, ts.TypeFlags.StringLike, ts.TypeFlags.StringLiteral);
                    case "symbol":
                        return checkType(type, ts.TypeFlags.ESSymbol, ts.TypeFlags.ESSymbolLike, ts.TypeFlags.UniqueESSymbol);
                    case "undefined":
                        return checkType(type, ts.TypeFlags.Undefined);
                    case "unknown":
                        return checkType(type, ts.TypeFlags.Unknown);
                }
            return true;
            function isArray() {
                return context.checker.isArrayType(type);
            }
            function isFunction() {
                return type.getCallSignatures().length > 0;
            }
            function isObject() {
                return !isArray() && !isFunction();
            }
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
            const { message, replacement, search, selector: mixed, typeHas, typeHasNoneOf, typeHasNot, typeHasOneOf, typeIs, typeIsNoneOf, typeIsNot, typeIsOneOf } = context.options;
            const selector = functions_1.a.fromMixed(mixed).join(", ");
            return {
                [selector]: (node) => {
                    const tsNode = context.toTsNode(node);
                    const type = context.checker.getTypeAtLocation(tsNode);
                    if (checkTypeIs(type, typeIs) &&
                        checkTypeHasNot(type, typeHasNot) &&
                        checkTypeIsNot(type, typeIsNot) &&
                        checkTypeHas(type, typeHas) &&
                        checkTypeHasNoneOf(type, typeHasNoneOf) &&
                        checkTypeHasOneOf(type, typeHasOneOf) &&
                        checkTypeIsNoneOf(type, typeIsNoneOf) &&
                        checkTypeIsOneOf(type, typeIsOneOf))
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
        const TypeVO = (0, functions_1.createValidationObject)({
            any: "any",
            array: "array",
            boolean: "boolean",
            function: "function",
            null: "null",
            number: "number",
            object: "object",
            string: "string",
            symbol: "symbol",
            undefined: "undefined",
            unknown: "unknown"
        });
        const isType = functions_1.is.factory(functions_1.is.enumeration, TypeVO);
        const isTypes = functions_1.is.factory(functions_1.is.array.of, isType);
        return functions_1.is.object.factory({ selector: functions_1.is.or.factory(functions_1.is.string, functions_1.is.strings) }, {
            message: functions_1.is.string,
            replacement: functions_1.is.string,
            search: functions_1.is.string,
            typeHas: isType,
            typeHasNoneOf: isTypes,
            typeHasNot: isType,
            typeHasOneOf: isTypes,
            typeIs: isType,
            typeIsNoneOf: isTypes,
            typeIsNot: isType,
            typeIsOneOf: isTypes
        });
    }),
    messages: { customMessage: "{{ message }}" },
    name: "no-restricted-syntax"
});
//# sourceMappingURL=no-restricted-syntax.js.map