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
            return (flags.includes(type.getFlags()) ||
                (type.isUnion() &&
                    type.types.every(subtype => flags.includes(subtype.getFlags()))));
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any -- Postponed
        function getVisitors() {
            return functions_1.o.fromEntries(context.subOptionsArray.map(subOptions => {
                const { _id, message, replacement, search, selector: mixed, typeContain, typeDontContain, typeEq, typeNeq } = subOptions;
                const selector = functions_1.a.fromMixed(mixed).join(", ");
                return [
                    selector,
                    (node) => {
                        const tsNode = context.toTsNode(node);
                        const type = context.checker.getTypeAtLocation(tsNode);
                        if (isTypeEqualsTo(type, typeEq) &&
                            isTypeNotEqualsTo(type, typeNeq) &&
                            isTypeIncludes(type, typeContain) &&
                            isTypeExcludes(type, typeDontContain))
                            context.report({
                                data: {
                                    _id,
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
                ];
            }));
        }
        function isTypeEqualsTo(type, expected) {
            if (expected)
                switch (expected) {
                    case "any":
                        return type.getFlags() === ts.TypeFlags.Any;
                    case "array":
                        return context.checker.isArrayType(type);
                    case "boolean":
                        return checkType(type, ts.TypeFlags.Boolean, ts.TypeFlags.BooleanLike, ts.TypeFlags.BooleanLiteral);
                    case "null":
                        return type.getFlags() === ts.TypeFlags.Null;
                    case "number":
                        return checkType(type, ts.TypeFlags.Number, ts.TypeFlags.NumberLike, ts.TypeFlags.NumberLiteral);
                    case "string":
                        return checkType(type, ts.TypeFlags.String, ts.TypeFlags.StringLike, ts.TypeFlags.StringLiteral);
                    case "symbol":
                        return checkType(type, ts.TypeFlags.ESSymbol, ts.TypeFlags.ESSymbolLike, ts.TypeFlags.UniqueESSymbol);
                    case "undefined":
                        return type.getFlags() === ts.TypeFlags.Undefined;
                    case "unknown":
                        return type.getFlags() === ts.TypeFlags.Unknown;
                }
            return true;
        }
        function isTypeExcludes(type, expected) {
            return expected ? !isTypeIncludes(type, expected) : true;
        }
        function isTypeIncludes(type, expected) {
            return expected
                ? isTypeEqualsTo(type, expected) ||
                    (type.isUnion() &&
                        type.types.some(subtype => isTypeEqualsTo(subtype, expected)))
                : true;
        }
        function isTypeNotEqualsTo(type, expected) {
            return expected ? !isTypeEqualsTo(type, expected) : true;
        }
    },
    fixable: "code",
    isRuleOptions: functions_1.is.object,
    isSubOptions: (0, functions_1.evaluate)(() => {
        const TypeVO = (0, functions_1.createValidationObject)({
            any: "any",
            array: "array",
            boolean: "boolean",
            null: "null",
            number: "number",
            string: "string",
            symbol: "symbol",
            undefined: "undefined",
            unknown: "unknown"
        });
        const isType = functions_1.is.factory(functions_1.is.enumeration, TypeVO);
        return functions_1.is.object.factory({ selector: functions_1.is.or.factory(functions_1.is.string, functions_1.is.strings) }, {
            _id: functions_1.is.string,
            message: functions_1.is.string,
            replacement: functions_1.is.string,
            search: functions_1.is.string,
            typeContain: isType,
            typeDontContain: isType,
            typeEq: isType,
            typeNeq: isType
        });
    }),
    messages: { customMessage: "{{ message }} ({{ _id }})" },
    name: "no-restricted-syntax"
});
//# sourceMappingURL=no-restricted-syntax.js.map