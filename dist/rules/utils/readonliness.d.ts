import * as ts from "typescript";
import type { strings } from "@skylib/functions/dist/types/core";
import * as utils from ".";
export interface InvalidResult {
    readonly failed: true;
    readonly types: readonly ts.Type[];
}
export interface Options<M extends string, O extends object, S extends object> {
    readonly context: utils.Context<M, O, S>;
    readonly ignoreClasses: boolean;
    readonly ignoreInterfaces: boolean;
    readonly ignoreTypeParameters?: boolean;
    readonly ignoreTypes: strings;
    readonly readonliness: Readonliness;
}
export declare type Readonliness = "allDefinitelyReadonly" | "allDefinitelyWritable" | "allMaybeReadonly" | "allMaybeWritable" | "numberSignatureReadonly" | "stringSignatureReadonly";
export declare type Result = InvalidResult | ValidResult;
export declare type SourceType = "numberSignature" | "property" | "stringSignature";
export interface ValidResult {
    readonly passed: true;
}
export declare class Checker<M extends string, O extends object, S extends object> {
    /**
     * Creates class instance.
     *
     * @param options - Options.
     */
    constructor(options: Options<M, O, S>);
    /**
     * Checks type.
     *
     * @param type - Type.
     * @param restElement - Rest element.
     * @returns Validation result.
     */
    checkType(type: ts.Type, restElement?: boolean): Result;
    protected checker: ts.TypeChecker;
    protected ignoreClasses: boolean;
    protected ignoreInterfaces: boolean;
    protected ignoreTypeParameters: boolean;
    protected ignoreTypes: ReadonlySet<string>;
    protected readonliness: Readonliness;
    protected seenTypesPool: Set<ts.Type>;
    /**
     * Checks mapped type nodes.
     *
     * @param type - Type.
     * @returns Validation result.
     */
    protected checkMappedTypeNodes(type: ts.Type): Result;
    /**
     * Checks object type.
     *
     * @param type - Type.
     * @param restElement - Rest element.
     * @returns Validation result.
     */
    protected checkObjectType(type: ts.ObjectType, restElement: boolean): Result;
    /**
     * Checks properties.
     *
     * @param type - Type.
     * @param restElement - Rest element.
     * @returns Validation result.
     */
    protected checkProperties(type: ts.ObjectType, restElement: boolean): Result;
    /**
     * Checks signatures.
     *
     * @param type - Type.
     * @param restElement - Rest element.
     * @returns Validation result.
     */
    protected checkSignatures(type: ts.ObjectType, restElement: boolean): Result;
    /**
     * Checks subtypes.
     *
     * @param type - Type.
     * @param subtypes - Subtypes.
     * @returns Validation result.
     */
    protected checkSubTypes(type: ts.Type, subtypes: readonly ts.Type[]): Result;
    /**
     * Checks type parameter.
     *
     * @param type - Type.
     * @returns Validation result.
     */
    protected checkTypeParameter(type: ts.TypeParameter): Result;
    /**
     * Checks if type readonliness is invalid.
     *
     * @param typeIsReadonly - Whether type is readonly.
     * @param sourceType - Source type.
     * @returns _True_ if type readonliness is invalid, _false_ otherwise.
     */
    protected invalidReadonliness(typeIsReadonly: boolean, sourceType: SourceType): boolean;
    /**
     * Checks if mapped type node is readonly.
     *
     * @param node - Node.
     * @returns _True_ if mapped type node is readonly, _false_ otherwise.
     */
    protected readonlyMappedTypeNode(node: ts.MappedTypeNode): boolean;
    /**
     * Checks type.
     *
     * @param type - Type.
     * @param restElement - Rest element.
     * @returns Validation result.
     */
    protected recurs(type: ts.Type, restElement?: boolean): Result;
}
//# sourceMappingURL=readonliness.d.ts.map