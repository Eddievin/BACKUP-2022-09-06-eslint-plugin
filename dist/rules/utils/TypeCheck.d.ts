import * as ts from "typescript";
import type { ParserServices, TSESTree } from "@typescript-eslint/utils";
import type { NumStrU } from "@skylib/functions";
import { TypeGroup } from "./types";
import type { TypeGroups } from "./types";
export declare class TypeCheck {
    /**
     * Checks if type is boolean.
     *
     * @param type - Type.
     * @returns _True_ if type is boolean, _false_ otherwise.
     */
    readonly isBoolish: (type: ts.Type) => boolean;
    /**
     * Creates class instance.
     *
     * @param checker - Checker.
     * @param toTsNode - Converter.
     */
    constructor(checker: ts.TypeChecker, toTsNode: ParserServices["esTreeNodeToTSNodeMap"]["get"]);
    /**
     * Checks if node is an array.
     *
     * @param node - Node.
     * @returns _True_ if node is an array, _false_ otherwise.
     */
    getCallSignatures(node: TSESTree.Node): TypeCheck.Signatures;
    getType(node: TSESTree.Node): ts.Type;
    /**
     * Checks if node is an array.
     *
     * @param node - Node.
     * @returns _True_ if node is an array, _false_ otherwise.
     */
    isArray(node: TSESTree.Node): boolean;
    /**
     * Gets type parts.
     *
     * @param node - Node.
     * @returns Type parts.
     */
    parseUnionType(node: TSESTree.Node): TypeCheck.TypeParts;
    /**
     * Gets type parts.
     *
     * @param node - Node.
     * @returns Type parts.
     */
    parseUnionTypeTypeofFix(node: TSESTree.Node): TypeCheck.TypeParts;
    typeHas(type: ts.Type, expected?: TypeGroup): boolean;
    typeHasNoneOf(type: ts.Type, expected?: TypeGroups): boolean;
    typeHasNot(type: ts.Type, expected?: TypeGroup): boolean;
    typeHasOneOf(type: ts.Type, expected?: TypeGroups): boolean;
    typeIs(type: ts.Type, expected?: TypeGroup): boolean;
    typeIsNoneOf(type: ts.Type, expected?: TypeGroups): boolean;
    typeIsNot(type: ts.Type, expected?: TypeGroup): boolean;
    typeIsOneOf(type: ts.Type, expected?: TypeGroups): boolean;
    protected readonly checker: ts.TypeChecker;
    protected readonly toTsNode: ParserServices["esTreeNodeToTSNodeMap"]["get"];
    protected readonly zzz: (type: ts.Type, ...flags: readonly ts.TypeFlags[]) => boolean;
}
export declare namespace TypeCheck {
    type Signatures = readonly ts.Signature[];
    type TypePart = NumStrU | ts.Type;
    type TypeParts = readonly TypePart[];
}
//# sourceMappingURL=TypeCheck.d.ts.map