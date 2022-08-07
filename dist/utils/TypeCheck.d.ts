import * as ts from "typescript";
import type { NumStrU, unknowns } from "@skylib/functions";
import type { ParserServices, TSESTree } from "@typescript-eslint/utils";
import type { RuleContext } from "@typescript-eslint/utils/dist/ts-eslint";
import { TypeGroup } from "./types";
import type { TypeGroups } from "./types";
export declare class TypeCheck {
    readonly checker: ts.TypeChecker;
    /**
     * Checks if type is boolean.
     *
     * @param type - Type.
     * @returns _True_ if type is boolean, _false_ otherwise.
     */
    readonly isBoolish: (type: ts.Type) => boolean;
    readonly isObjectType: (type: ts.Type) => type is ts.ObjectType;
    /**
     * Creates class instance.
     *
     * @param context - Context.
     */
    constructor(context: RuleContext<never, unknowns>);
    /**
     * Checks if node is an array.
     *
     * @param node - Node.
     * @returns _True_ if node is an array, _false_ otherwise.
     */
    getCallSignatures(node: TSESTree.Node): TypeCheck.Signatures;
    getConstructorType(node: TSESTree.Node): ts.Type | undefined;
    getContextualType(node: TSESTree.Node): ts.Type | undefined;
    getIndexInfo(type: ts.Type, kind: ts.IndexKind): ts.IndexInfo | undefined;
    getReturnType(signature: ts.Signature): ts.Type;
    getSymbol(node: TSESTree.Node): ts.Symbol | undefined;
    getType(node: TSESTree.Node): ts.Type;
    /**
     * Checks if signature or symbol is missing doc comment.
     *
     * @param mixed - Signature or symbol.
     * @returns _True_ if signature or symbol is missing doc comment, _false_ otherwise.
     */
    hasDocComment(mixed: ts.Signature | ts.Symbol): boolean;
    /**
     * Checks if node is an array.
     *
     * @param node - Node.
     * @returns _True_ if node is an array, _false_ otherwise.
     */
    isArrayOrTuple(node: TSESTree.Node): boolean;
    isArrayOrTupleType(type: ts.Type): type is ts.TupleTypeReference | ts.TypeReference;
    isReadonlyProperty(property: ts.Symbol, type: ts.Type): boolean;
    typeHas(type: ts.Type, expected?: TypeGroup): boolean;
    typeHasNoneOf(type: ts.Type, expected?: TypeGroups): boolean;
    typeHasOneOf(type: ts.Type, expected?: TypeGroups): boolean;
    typeIs(type: ts.Type, expected: TypeGroup | undefined): boolean;
    typeIsNoneOf(type: ts.Type, expected?: TypeGroups): boolean;
    typeIsOneOf(type: ts.Type, expected?: TypeGroups): boolean;
    /**
     * Gets type parts.
     *
     * @param node - Node.
     * @returns Type parts.
     */
    unionTypeParts(node: TSESTree.Node): TypeCheck.TypeParts;
    protected readonly code: string;
    protected readonly toTsNode: ParserServices["esTreeNodeToTSNodeMap"]["get"];
    protected readonly zzz: (type: ts.Type, ...flags: readonly ts.TypeFlags[]) => boolean;
    /**
     * Gets type parts.
     *
     * @param node - Node.
     * @returns Type parts.
     */
    protected unionTypeParts2(node: TSESTree.Node): TypeCheck.TypeParts;
}
export declare namespace TypeCheck {
    type Signatures = readonly ts.Signature[];
    type TypePart = NumStrU | ts.Type;
    type TypeParts = readonly TypePart[];
}
//# sourceMappingURL=TypeCheck.d.ts.map