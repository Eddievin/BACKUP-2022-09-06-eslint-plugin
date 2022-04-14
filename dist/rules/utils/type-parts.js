"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTypeParts = void 0;
const tslib_1 = require("tslib");
const assert = tslib_1.__importStar(require("@skylib/functions/dist/assertions"));
const is = tslib_1.__importStar(require("@skylib/functions/dist/guards"));
const helpers_1 = require("@skylib/functions/dist/helpers");
const o = tslib_1.__importStar(require("@skylib/functions/dist/object"));
const utils_1 = require("@typescript-eslint/utils");
const _ = tslib_1.__importStar(require("lodash"));
const tsutils = tslib_1.__importStar(require("tsutils"));
const ts = tslib_1.__importStar(require("typescript"));
/**
 * Gets type parts.
 *
 * @param node - Node.
 * @param context - Context.
 * @returns Type parts.
 */
exports.getTypeParts = o.extend((node, context) => {
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
}, {
    /**
     * Gets type parts.
     *
     * @param node - Node.
     * @param context - Context.
     * @returns Type parts.
     */
    typeofFix(node, context) {
        return node.type === utils_1.AST_NODE_TYPES.UnaryExpression &&
            node.operator === "typeof"
            ? recurs(context.checker.getTypeAtLocation(context.toTsNode(node.argument)))
            : (0, exports.getTypeParts)(node, context);
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
});
const ExpectedFlagsVO = (0, helpers_1.createValidationObject)({
    [ts.TypeFlags.BigInt]: ts.TypeFlags.BigInt,
    [ts.TypeFlags.BigIntLiteral]: ts.TypeFlags.BigIntLiteral,
    [ts.TypeFlags.BooleanLiteral]: ts.TypeFlags.BooleanLiteral,
    [ts.TypeFlags.ESSymbol]: ts.TypeFlags.ESSymbol,
    [ts.TypeFlags.Null]: ts.TypeFlags.Null,
    [ts.TypeFlags.Number]: ts.TypeFlags.Number,
    [ts.TypeFlags.NumberLiteral]: ts.TypeFlags.NumberLiteral,
    [ts.TypeFlags.Object]: ts.TypeFlags.Object,
    [ts.TypeFlags.String]: ts.TypeFlags.String,
    [ts.TypeFlags.StringLiteral]: ts.TypeFlags.StringLiteral,
    [ts.TypeFlags.Undefined]: ts.TypeFlags.Undefined,
    [ts.TypeFlags.UniqueESSymbol]: ts.TypeFlags.UniqueESSymbol,
    [ts.TypeFlags.Void]: ts.TypeFlags.Void
});
const isExpectedFlags = is.factory(is.enumeration, ExpectedFlagsVO);
//# sourceMappingURL=type-parts.js.map