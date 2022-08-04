"use strict";
/* eslint-disable complexity -- Postponed */
Object.defineProperty(exports, "__esModule", { value: true });
exports.TypeCheck = void 0;
const tslib_1 = require("tslib");
/* eslint-disable @skylib/require-jsdoc -- Postponed */
// eslint-disable-next-line @skylib/disallow-import/project -- Ok
const ts = tslib_1.__importStar(require("typescript"));
// eslint-disable-next-line @skylib/disallow-import/project -- Ok
const tsutils = tslib_1.__importStar(require("tsutils"));
const utils_1 = require("@typescript-eslint/utils");
const functions_1 = require("@skylib/functions");
const types_1 = require("./types");
class TypeCheck {
    /**
     * Creates class instance.
     *
     * @param context - Context.
     */
    constructor(context) {
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
        Object.defineProperty(this, "isObjectType", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: (type) => tsutils.isObjectType(type)
        });
        Object.defineProperty(this, "checker", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "code", {
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
        const parser = utils_1.ESLintUtils.getParserServices(context);
        functions_1.assert.toBeTrue(tsutils.isStrictCompilerOptionEnabled(parser.program.getCompilerOptions(), "strictNullChecks"), 'Expecting "strictNullChecks" compiler option to be enabled');
        this.checker = parser.program.getTypeChecker();
        this.code = context.getSourceCode().getText();
        this.toTsNode = parser.esTreeNodeToTSNodeMap.get.bind(parser.esTreeNodeToTSNodeMap);
    }
    /**
     * Checks if node is an array.
     *
     * @param node - Node.
     * @returns _True_ if node is an array, _false_ otherwise.
     */
    getCallSignatures(node) {
        const type = this.getType(node);
        return this.checker.getSignaturesOfType(type, ts.SignatureKind.Call);
    }
    getConstructorType(node) {
        const tsNode = this.toTsNode(node);
        return tsutils.isConstructorDeclaration(tsNode)
            ? tsutils.getConstructorTypeOfClassLikeDeclaration(tsNode.parent, this.checker)
            : undefined;
    }
    getContextualType(node) {
        const tsNode = this.toTsNode(node);
        assertExpression(tsNode, "Expecting expression");
        return this.checker.getContextualType(tsNode);
    }
    getIndexInfo(type, kind) {
        return this.checker.getIndexInfoOfType(type, kind);
    }
    getReturnType(signature) {
        return this.checker.getReturnTypeOfSignature(signature);
    }
    getSymbol(node) {
        const tsNode = this.toTsNode(node);
        return this.checker.getSymbolAtLocation(tsNode);
    }
    getType(node) {
        const tsNode = this.toTsNode(node);
        return this.checker.getTypeAtLocation(tsNode);
    }
    /**
     * Checks if signature or symbol is missing doc comment.
     *
     * @param mixed - Signature or symbol.
     * @returns _True_ if signature or symbol is missing doc comment, _false_ otherwise.
     */
    hasDocComment(mixed) {
        return mixed.getDocumentationComment(this.checker).length > 0;
    }
    /**
     * Checks if node is an array.
     *
     * @param node - Node.
     * @returns _True_ if node is an array, _false_ otherwise.
     */
    isArray(node) {
        const type = this.getType(node);
        return this.checker.isArrayType(type);
    }
    isReadonlyProperty(property, type) {
        return tsutils.isPropertyReadonlyInType(type, property.getEscapedName(), this.checker);
    }
    typeHas(type, expected) {
        return expected
            ? this.typeIs(type, expected) ||
                (type.isUnion() &&
                    type.types.some(subtype => this.typeIs(subtype, expected)))
            : true;
    }
    typeHasNoneOf(type, expected) {
        return expected ? expected.every(x => !this.typeHas(type, x)) : true;
    }
    typeHasOneOf(type, expected) {
        return expected ? expected.some(x => this.typeHas(type, x)) : true;
    }
    typeIs(type, expected) {
        if (expected)
            switch (expected) {
                case types_1.TypeGroup.any:
                    return this.zzz(type, ts.TypeFlags.Any);
                case types_1.TypeGroup.array:
                    return (this.zzz(type, ts.TypeFlags.NonPrimitive, ts.TypeFlags.Object) &&
                        this.checker.isArrayType(type));
                case types_1.TypeGroup.boolean:
                    return this.zzz(type, ts.TypeFlags.Boolean, ts.TypeFlags.BooleanLike, ts.TypeFlags.BooleanLiteral);
                case types_1.TypeGroup.complex: {
                    if (this.checker.isArrayType(type) ||
                        this.checker.isTupleType(type)) {
                        const subtypes = type.typeArguments;
                        functions_1.assert.not.empty(subtypes, "Missing type arguments");
                        return subtypes.some(subtype => this.typeIs(subtype, expected));
                    }
                    if (type.isUnionOrIntersection())
                        return type.types.some(subtype => this.typeIs(subtype, expected));
                    const symbol = type.getSymbol();
                    return symbol ? ["__object", "__type"].includes(symbol.name) : false;
                }
                case types_1.TypeGroup.function:
                    return (this.zzz(type, ts.TypeFlags.NonPrimitive, ts.TypeFlags.Object) &&
                        type.getCallSignatures().length > 0);
                case types_1.TypeGroup.never:
                    return this.zzz(type, ts.TypeFlags.Never);
                case types_1.TypeGroup.null:
                    return this.zzz(type, ts.TypeFlags.Null);
                case types_1.TypeGroup.number:
                    return this.zzz(type, ts.TypeFlags.Number, ts.TypeFlags.NumberLike, ts.TypeFlags.NumberLiteral);
                case types_1.TypeGroup.object:
                    return (this.zzz(type, ts.TypeFlags.NonPrimitive, ts.TypeFlags.Object) &&
                        !this.typeIs(type, types_1.TypeGroup.array) &&
                        !this.typeIs(type, types_1.TypeGroup.function));
                case types_1.TypeGroup.readonly:
                    return type
                        .getProperties()
                        .some(property => tsutils.isPropertyReadonlyInType(type, property.getEscapedName(), this.checker));
                case types_1.TypeGroup.string:
                    return this.zzz(type, ts.TypeFlags.String, ts.TypeFlags.StringLike, ts.TypeFlags.StringLiteral);
                case types_1.TypeGroup.symbol:
                    return this.zzz(type, ts.TypeFlags.ESSymbol, ts.TypeFlags.ESSymbolLike, ts.TypeFlags.UniqueESSymbol);
                case types_1.TypeGroup.tuple:
                    return (this.zzz(type, ts.TypeFlags.NonPrimitive, ts.TypeFlags.Object) &&
                        this.checker.isTupleType(type));
                case types_1.TypeGroup.undefined:
                    return this.zzz(type, ts.TypeFlags.Undefined);
                case types_1.TypeGroup.unknown:
                    return this.zzz(type, ts.TypeFlags.Unknown);
            }
        return true;
    }
    typeIsNoneOf(type, expected) {
        return expected ? expected.every(x => !this.typeIs(type, x)) : true;
    }
    typeIsOneOf(type, expected) {
        return expected ? expected.some(x => this.typeIs(type, x)) : true;
    }
    /**
     * Gets type parts.
     *
     * @param node - Node.
     * @returns Type parts.
     */
    unionTypeParts(node) {
        return node.type === utils_1.AST_NODE_TYPES.UnaryExpression &&
            node.operator === "typeof"
            ? recurs(this.checker.getTypeAtLocation(this.toTsNode(node.argument)))
            : this.unionTypeParts2(node);
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
    /**
     * Gets type parts.
     *
     * @param node - Node.
     * @returns Type parts.
     */
    unionTypeParts2(node) {
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
function assertExpression(tsNode, error) {
    functions_1.assert.toBeTrue(tsutils.isExpression(tsNode), error);
}
//# sourceMappingURL=TypeCheck.js.map