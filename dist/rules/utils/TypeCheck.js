"use strict";
/* eslint-disable @skylib/custom -- Wait for @skylib/config update */
Object.defineProperty(exports, "__esModule", { value: true });
exports.TypeCheck = void 0;
const tslib_1 = require("tslib");
/* eslint-disable @skylib/require-jsdoc -- Postponed */
const ts = tslib_1.__importStar(require("typescript"));
const tsutils = tslib_1.__importStar(require("tsutils"));
const functions_1 = require("@skylib/functions");
const types_1 = require("./types");
class TypeCheck {
    /**
     * Creates class instance.
     *
     * @param checker - Checker.
     * @param toTsNode - Converter.
     */
    constructor(checker, toTsNode) {
        /**
         * Checks if type is boolean.
         *
         * @param type - Type.
         * @returns _True_ if type is boolean, _false_ otherwise.
         */
        Object.defineProperty(this, "isBoolish", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: (type) => {
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
        });
        Object.defineProperty(this, "checker", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "toTsNode", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "zzz", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: (type, ...flags) => {
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
        });
        this.checker = checker;
        this.toTsNode = toTsNode;
    }
    /**
     * Checks if node is an array.
     *
     * @param node - Node.
     * @returns _True_ if node is an array, _false_ otherwise.
     */
    getCallSignatures(node) {
        const tsNode = this.toTsNode(node);
        const type = this.checker.getTypeAtLocation(tsNode);
        return this.checker.getSignaturesOfType(type, ts.SignatureKind.Call);
    }
    getType(node) {
        const tsNode = this.toTsNode(node);
        return this.checker.getTypeAtLocation(tsNode);
    }
    /**
     * Checks if node is an array.
     *
     * @param node - Node.
     * @returns _True_ if node is an array, _false_ otherwise.
     */
    isArray(node) {
        const tsNode = this.toTsNode(node);
        const type = this.checker.getTypeAtLocation(tsNode);
        return this.checker.isArrayType(type);
    }
    /**
     * Gets type parts.
     *
     * @param node - Node.
     * @returns Type parts.
     */
    parseUnionType(node) {
        return recurs(this.checker.getTypeAtLocation(this.toTsNode(node)));
        function recurs(type) {
            if (type.isNumberLiteral())
                return [type.value];
            if (type.isStringLiteral())
                return [type.value];
            if (type.isUnion())
                return tsutils.unionTypeParts(type).flatMap(part => recurs(part));
            return [type];
        }
    }
    /**
     * Gets type parts.
     *
     * @param node - Node.
     * @returns Type parts.
     */
    parseUnionTypeTypeofFix(node) {
        return node.type === "UnaryExpression" && node.operator === "typeof"
            ? recurs(this.checker.getTypeAtLocation(this.toTsNode(node.argument)))
            : this.parseUnionType(node);
        function recurs(type) {
            if (type.getCallSignatures().length)
                return ["function"];
            if (type.getConstructSignatures().length)
                return ["function"];
            if (type.isUnion())
                return tsutils.unionTypeParts(type).flatMap(part => recurs(part));
            switch (functions_1.as.byGuard(type.flags, isExpectedFlags)) {
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
    typeHas(type, expected) {
        return expected
            ? this.typeIs(type, expected) ||
                (type.isUnion() &&
                    type.types.some(subtype => this.typeIs(subtype, expected)))
            : true;
    }
    typeHasNoneOf(type, expected) {
        return expected ? expected.every(x => this.typeHasNot(type, x)) : true;
    }
    typeHasNot(type, expected) {
        return expected ? !this.typeHas(type, expected) : true;
    }
    typeHasOneOf(type, expected) {
        return expected ? expected.some(x => this.typeHas(type, x)) : true;
    }
    typeIs(type, expected) {
        var _a;
        if (expected)
            switch (expected) {
                case "any":
                    return this.zzz(type, ts.TypeFlags.Any);
                case "array":
                    return (this.zzz(type, ts.TypeFlags.NonPrimitive, ts.TypeFlags.Object) &&
                        this.checker.isArrayType(type));
                case "boolean":
                    return this.zzz(type, ts.TypeFlags.Boolean, ts.TypeFlags.BooleanLike, ts.TypeFlags.BooleanLiteral);
                case "complex":
                    if (this.checker.isArrayType(type) ||
                        this.checker.isTupleType(type)) {
                        const subtypes = type.typeArguments;
                        functions_1.assert.not.empty(subtypes, "Missing type arguments");
                        return subtypes.some(subtype => this.typeIs(subtype, expected));
                    }
                    if (type.isUnionOrIntersection())
                        return type.types.some(subtype => this.typeIs(subtype, expected));
                    return ((_a = type.getSymbol()) === null || _a === void 0 ? void 0 : _a.name) === "__object";
                case "function":
                    return (this.zzz(type, ts.TypeFlags.NonPrimitive, ts.TypeFlags.Object) &&
                        type.getCallSignatures().length > 0);
                case "null":
                    return this.zzz(type, ts.TypeFlags.Null);
                case "number":
                    return this.zzz(type, ts.TypeFlags.Number, ts.TypeFlags.NumberLike, ts.TypeFlags.NumberLiteral);
                case "object":
                    return (this.zzz(type, ts.TypeFlags.NonPrimitive, ts.TypeFlags.Object) &&
                        !this.typeIs(type, types_1.TypeGroup.array) &&
                        !this.typeIs(type, types_1.TypeGroup.function));
                case "readonly":
                    return type
                        .getProperties()
                        .some(property => tsutils.isPropertyReadonlyInType(type, property.getEscapedName(), this.checker));
                case "string":
                    return this.zzz(type, ts.TypeFlags.String, ts.TypeFlags.StringLike, ts.TypeFlags.StringLiteral);
                case "symbol":
                    return this.zzz(type, ts.TypeFlags.ESSymbol, ts.TypeFlags.ESSymbolLike, ts.TypeFlags.UniqueESSymbol);
                case "tuple":
                    return (this.zzz(type, ts.TypeFlags.NonPrimitive, ts.TypeFlags.Object) &&
                        this.checker.isTupleType(type));
                case "undefined":
                    return this.zzz(type, ts.TypeFlags.Undefined);
                case "unknown":
                    return this.zzz(type, ts.TypeFlags.Unknown);
            }
        return true;
    }
    typeIsNoneOf(type, expected) {
        return expected ? expected.every(x => this.typeIsNot(type, x)) : true;
    }
    typeIsNot(type, expected) {
        return expected ? !this.typeIs(type, expected) : true;
    }
    typeIsOneOf(type, expected) {
        return expected ? expected.some(x => this.typeIs(type, x)) : true;
    }
}
exports.TypeCheck = TypeCheck;
const safeTypes = new functions_1.ReadonlySet([
    ts.TypeFlags.BigInt,
    ts.TypeFlags.BigIntLiteral,
    ts.TypeFlags.Boolean,
    ts.TypeFlags.BooleanLiteral,
    ts.TypeFlags.Number,
    ts.TypeFlags.NumberLiteral,
    ts.TypeFlags.String,
    ts.TypeFlags.StringLiteral
]);
const safeTypesWithUndefined = new functions_1.ReadonlySet([
    ts.TypeFlags.ESSymbol,
    ts.TypeFlags.Object,
    ts.TypeFlags.NonPrimitive,
    ts.TypeFlags.UniqueESSymbol
]);
const isExpectedFlags = functions_1.is.factory(functions_1.is.enumeration, {
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
//# sourceMappingURL=TypeCheck.js.map