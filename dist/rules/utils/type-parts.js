"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTypePartsWithTypeofFix = exports.getTypeParts = void 0;
const tslib_1 = require("tslib");
const _ = (0, tslib_1.__importStar)(require("lodash"));
const tsutils = (0, tslib_1.__importStar)(require("tsutils"));
const ts = (0, tslib_1.__importStar)(require("typescript"));
const experimental_utils_1 = require("@typescript-eslint/experimental-utils");
const assert = (0, tslib_1.__importStar)(require("@skylib/functions/dist/assertions"));
const is = (0, tslib_1.__importStar)(require("@skylib/functions/dist/guards"));
const core_1 = require("@skylib/functions/dist/types/core");
/**
 * Gets type parts.
 *
 * @param node - Node.
 * @param context - Context.
 * @returns Type parts.
 */
function getTypeParts(node, context) {
    return recurs(context.checker.getTypeAtLocation(context.toTsNode(node)));
    function recurs(type) {
        if (type.isNumberLiteral())
            return [type.value];
        if (type.isStringLiteral())
            return [type.value];
        if (type.isUnion())
            return _.flatten(tsutils.unionTypeParts(type).map(part => recurs(part)));
        return [type];
    }
}
exports.getTypeParts = getTypeParts;
/**
 * Gets type parts.
 *
 * @param node - Node.
 * @param context - Context.
 * @returns Type parts.
 */
function getTypePartsWithTypeofFix(node, context) {
    return node.type === experimental_utils_1.AST_NODE_TYPES.UnaryExpression &&
        node.operator === "typeof"
        ? recurs(context.checker.getTypeAtLocation(context.toTsNode(node.argument)))
        : getTypeParts(node, context);
    function recurs(type) {
        if (type.getCallSignatures().length)
            return ["function"];
        if (type.getConstructSignatures().length)
            return ["function"];
        if (type.isUnion())
            return _.flatten(tsutils.unionTypeParts(type).map(part => recurs(part)));
        assert.byGuard(type.flags, isExpectedFlags);
        switch (type.flags) {
            case ts.TypeFlags.BigInt:
            case ts.TypeFlags.BigIntLiteral:
                return ["bigint"];
            case ts.TypeFlags.BooleanLiteral:
                return ["boolean"];
            case ts.TypeFlags.Number:
            case ts.TypeFlags.NumberLiteral:
                return ["number"];
            case ts.TypeFlags.Null:
            case ts.TypeFlags.Object:
                return ["object"];
            case ts.TypeFlags.String:
            case ts.TypeFlags.StringLiteral:
                return ["string"];
            case ts.TypeFlags.ESSymbol:
            case ts.TypeFlags.UniqueESSymbol:
                return ["symbol"];
            case ts.TypeFlags.Undefined:
            case ts.TypeFlags.Void:
                return ["undefined"];
        }
    }
}
exports.getTypePartsWithTypeofFix = getTypePartsWithTypeofFix;
getTypeParts.typeofFix = getTypePartsWithTypeofFix;
const ExpectedFlagsVO = (0, core_1.createValidationObject)({
    [ts.TypeFlags.BigInt]: ts.TypeFlags.BigInt,
    [ts.TypeFlags.BigIntLiteral]: ts.TypeFlags.BigIntLiteral,
    [ts.TypeFlags.BooleanLiteral]: ts.TypeFlags.BooleanLiteral,
    [ts.TypeFlags.Number]: ts.TypeFlags.Number,
    [ts.TypeFlags.NumberLiteral]: ts.TypeFlags.NumberLiteral,
    [ts.TypeFlags.Null]: ts.TypeFlags.Null,
    [ts.TypeFlags.Object]: ts.TypeFlags.Object,
    [ts.TypeFlags.String]: ts.TypeFlags.String,
    [ts.TypeFlags.StringLiteral]: ts.TypeFlags.StringLiteral,
    [ts.TypeFlags.ESSymbol]: ts.TypeFlags.ESSymbol,
    [ts.TypeFlags.UniqueESSymbol]: ts.TypeFlags.UniqueESSymbol,
    [ts.TypeFlags.Undefined]: ts.TypeFlags.Undefined,
    [ts.TypeFlags.Void]: ts.TypeFlags.Void
});
const isExpectedFlags = is.factory(is.enumeration, ExpectedFlagsVO);
//# sourceMappingURL=type-parts.js.map