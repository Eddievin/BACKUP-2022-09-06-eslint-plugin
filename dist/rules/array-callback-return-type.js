"use strict";
const tslib_1 = require("tslib");
const is = tslib_1.__importStar(require("@skylib/functions/dist/guards"));
const utils_1 = require("@typescript-eslint/utils");
const tsutils = tslib_1.__importStar(require("tsutils"));
const ts = tslib_1.__importStar(require("typescript"));
const utils = tslib_1.__importStar(require("./utils"));
const rule = utils.createRule({
    create(context) {
        return {
            [utils_1.AST_NODE_TYPES.CallExpression](node) {
                if (node.callee.type === utils_1.AST_NODE_TYPES.MemberExpression &&
                    node.callee.property.type === utils_1.AST_NODE_TYPES.Identifier &&
                    methods.has(node.callee.property.name) &&
                    isArray(node.callee.object, context)) {
                    const argument = node.arguments[0];
                    if (argument) {
                        const tsArgument = context.toTsNode(argument);
                        const type = context.checker.getTypeAtLocation(tsArgument);
                        const signatures = context.checker.getSignaturesOfType(type, ts.SignatureKind.Call);
                        if (signatures.every(signature => isBoolean(context.checker.getReturnTypeOfSignature(signature)))) {
                            // Ok
                        }
                        else
                            context.report({
                                messageId: "expectingBooleanReturnType",
                                node: argument
                            });
                    }
                }
            }
        };
    },
    isRuleOptions: is.object,
    messages: { expectingBooleanReturnType: "Expecting boolean return type" },
    name: "array-callback-return-type"
});
const methods = new Set(["some", "every"]);
const safeTypes = new Set([
    ts.TypeFlags.BigInt,
    ts.TypeFlags.BigIntLiteral,
    ts.TypeFlags.Boolean,
    ts.TypeFlags.BooleanLiteral,
    ts.TypeFlags.Number,
    ts.TypeFlags.NumberLiteral,
    ts.TypeFlags.String,
    ts.TypeFlags.StringLiteral
]);
const safeTypesWithUndefined = new Set([
    ts.TypeFlags.ESSymbol,
    ts.TypeFlags.Object,
    ts.TypeFlags.NonPrimitive,
    ts.TypeFlags.UniqueESSymbol
]);
/**
 * Checks if node is an array.
 *
 * @param node - Node.
 * @param context - Context.
 * @returns _True_ if node is an array, _false_ otherwise.
 */
function isArray(node, context) {
    const tsNode = context.toTsNode(node);
    const type = context.checker.getTypeAtLocation(tsNode);
    return context.checker.isArrayType(type);
}
/**
 * Checks if type is boolean.
 *
 * @param type - Type.
 * @returns _True_ if type is boolean, _false_ otherwise.
 */
function isBoolean(type) {
    if (safeTypes.has(type.getFlags()))
        return true;
    if (tsutils.isUnionType(type)) {
        const parts = tsutils.unionTypeParts(type);
        if (parts.length === 2) {
            if (parts.some(part => tsutils.isBooleanLiteralType(part, true)) &&
                parts.some(part => tsutils.isBooleanLiteralType(part, false)))
                return true;
            if (parts.some(part => tsutils.isBooleanLiteralType(part, true)) &&
                parts.some(part => part.getFlags() === ts.TypeFlags.Undefined))
                return true;
            if (parts.some(part => tsutils.isObjectType(part)) &&
                parts.some(part => part.getFlags() === ts.TypeFlags.Undefined))
                return true;
            if (parts.some(part => safeTypesWithUndefined.has(part.getFlags())) &&
                parts.some(part => part.getFlags() === ts.TypeFlags.Undefined))
                return true;
        }
    }
    return false;
}
module.exports = rule;
//# sourceMappingURL=array-callback-return-type.js.map