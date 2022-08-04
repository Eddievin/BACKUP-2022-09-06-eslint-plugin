import type * as estree from "estree";
import type { ReportDescriptor, RuleContext, RuleFix, RuleListener, SourceCode } from "@typescript-eslint/utils/dist/ts-eslint";
import type { s, unknowns } from "@skylib/functions";
import type { KebabCase } from "type-fest";
import type { TSESTree } from "@typescript-eslint/utils";
import { is } from "@skylib/functions";
export declare enum Fixable {
    code = "code",
    whitespace = "whitespace"
}
export declare enum TypeGroup {
    any = "any",
    array = "array",
    boolean = "boolean",
    complex = "complex",
    function = "function",
    never = "never",
    null = "null",
    number = "number",
    object = "object",
    readonly = "readonly",
    string = "string",
    symbol = "symbol",
    tuple = "tuple",
    undefined = "undefined",
    unknown = "unknown"
}
export declare const isTypeGroup: is.Guard<TypeGroup>;
export declare const isTypeGroups: is.Guard<readonly TypeGroup[]>;
export interface Context<M extends string, O extends object, S extends object> {
    readonly eol: s.Eol;
    readonly getComments: (node: TSESTree.Node) => Ranges;
    readonly getFullRange: (node: TSESTree.Node) => TSESTree.Range;
    readonly getFullText: (node: TSESTree.Node) => string;
    readonly getLeadingSpaces: (node: TSESTree.Node) => Range;
    /**
     * Gets location from range.
     *
     * @param range - Range.
     * @returns Location.
     */
    readonly getLoc: (range: Range) => estree.SourceLocation;
    /**
     * Gets member name.
     *
     * @param node - Node.
     * @param context - Context.
     * @returns Member name.
     */
    readonly getMemberName: (node: TSESTree.ClassElement | TSESTree.TypeElement) => string;
    /**
     * Gets text.
     *
     * @param mixed - Node, comment or range.
     * @returns Text.
     */
    readonly getText: (mixed: Range | TSESTree.Comment | TSESTree.Node | number) => string;
    /**
     * Checks if node has trailing comment.
     *
     * @param node - Node.
     * @returns _True_ if node has trailing comment, _false_ otherwise.
     */
    readonly hasTrailingComment: (node: TSESTree.Node) => boolean;
    readonly id: string;
    readonly isAdjacentNodes: (node1: TSESTree.Node, node2: TSESTree.Node) => boolean;
    readonly locZero: TSESTree.SourceLocation;
    readonly normalizeSource: (source: string) => string;
    readonly options: O;
    readonly package: Package;
    readonly path: string;
    readonly rawContext: Readonly<RuleContext<any, any>>;
    /**
     * Reports error.
     *
     * @param descriptor - Descriptor.
     */
    readonly report: (descriptor: ReportDescriptor<M>) => void;
    readonly scope: ReturnType<RuleContext<M, unknowns>["getScope"]>;
    readonly source: SourceCode;
    readonly subOptionsArray: readonly S[];
}
export interface DefineTemplateBodyVisitor {
    (templateVisitor: any, scriptVisitor?: any, options?: any): RuleListener;
}
export declare type KeysToKebabCase<T> = {
    [K in string & keyof T as KebabCase<K>]: T[K];
};
export interface Package {
    readonly name?: string;
}
export declare type PrefixKeys<T, P extends string> = {
    [K in string & keyof T as `${P}${K}`]: T[K];
};
export declare type Range = readonly [number, number];
export declare type Ranges = readonly Range[];
export declare type RuleFixes = readonly RuleFix[];
export declare type TypeGroups = readonly TypeGroup[];
//# sourceMappingURL=types.d.ts.map