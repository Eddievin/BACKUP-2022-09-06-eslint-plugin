import { is } from "@skylib/functions";
import type { ReportDescriptor as BaseReportDescriptor, RuleListener, RuleModule } from "@typescript-eslint/utils/dist/ts-eslint";
import type { Context, Package, PrefixKeys } from "./types";
import type { Rec, strings } from "@skylib/functions";
import type { TSESTree } from "@typescript-eslint/utils";
import { TypeCheck } from "./TypeCheck";
import minimatch from "minimatch";
export declare enum MatcherType {
    allowDisallow = "allowDisallow",
    disallowAllow = "disallowAllow"
}
export declare const isMatcherType: is.Guard<MatcherType>;
export declare const isPackage: is.Guard<Package>;
export declare const base: string;
export declare const isPattern: is.Guard<Pattern>;
export declare const isSelector: is.Guard<string | readonly string[]>;
export declare const selectors: {
    readonly arrayType: "TSArrayType, TSTupleType";
    readonly block: "BlockStatement, Program, SwitchCase, TSModuleBlock";
    readonly documentedBlock: "ExportNamedDeclaration, Program, TSModuleBlock";
    readonly function: ":function, MethodDefinition, TSAbstractMethodDefinition, TSCallSignatureDeclaration, TSConstructSignatureDeclaration, TSDeclareFunction, TSFunctionType, TSMethodSignature";
    readonly functionExpression: "ArrowFunctionExpression, FunctionExpression";
    readonly method: "MethodDefinition, TSAbstractMethodDefinition";
    readonly property: "PropertyDefinition, TSPropertySignature";
    readonly statement: ":statement, TSDeclareFunction, TSExportAssignment";
};
export interface CreateRuleOptions<M extends string, O extends object, S extends object, K extends string = never> {
    /**
     * Creates rule listener.
     *
     * @param context - Context.
     * @param typeCheck - Type check.
     * @returns Rule listener.
     */
    readonly create: (context: Context<M, O, S>, typeCheck: TypeCheck) => RuleListener;
    readonly defaultOptions?: Readonly<Partial<O>>;
    readonly defaultSubOptions?: Readonly<Partial<S>>;
    readonly fixable?: "code" | "whitespace";
    readonly isOptions?: is.Guard<O>;
    readonly isSubOptions?: is.Guard<S>;
    readonly messages: Rec<M, string>;
    readonly name: string;
    readonly subOptionsKey?: K;
    readonly vue?: boolean;
}
export interface GetSelectorsOptions {
    readonly excludeSelectors: strings;
    readonly includeSelectors: strings;
    readonly noDefaultSelectors: boolean;
}
export interface Matcher {
    /**
     * Checks if string matches condition.
     *
     * @param str - String.
     * @returns _True_ if string matches condition, _false_ otherwise.
     */
    (str: string): boolean;
}
export declare type Pattern = strings | string;
export declare type ReportDescriptor<T extends string = string> = BaseReportDescriptor<T>;
export declare type ReportDescriptors<T extends string = string> = ReadonlyArray<ReportDescriptor<T>>;
export declare type RuleListeners = readonly RuleListener[];
export declare type Selector = strings | string;
export interface SharedOptions2 {
    readonly _id?: string;
    readonly filesToLint?: strings;
    readonly filesToSkip?: strings;
}
/**
 * Creates file matcher.
 *
 * @param patterns - Patterns.
 * @param defVal - Default value.
 * @param options - Minimatch options.
 * @returns Matcher.
 */
export declare function createFileMatcher(patterns: strings | {
    readonly allow: strings;
    readonly disallow: strings;
}, defVal: boolean, options: Readonly<minimatch.IOptions>): Matcher;
/**
 * Creates matcher.
 *
 * @param pattern - RegExp pattern(s).
 * @param defVal - Default value.
 * @returns Matcher.
 */
export declare function createRegexpMatcher(pattern: Pattern, defVal: boolean): Matcher;
/**
 * Creates rule listenter.
 *
 * @param options - Options.
 * @returns Rule listenter.
 */
export declare function createRule<M extends string, O extends object, S extends object, K extends string = never>(options: CreateRuleOptions<M, O, S, K>): RuleModule<M, [
    Partial<O> & {
        readonly [L in K]?: ReadonlyArray<Partial<S & SharedOptions2>>;
    }
]>;
/**
 * Gets name from filename.
 *
 * @param path - Path.
 * @param expected - Expected name.
 * @returns Name.
 */
export declare function getIdentifierFromPath(path: string, expected?: string): string;
/**
 * Parses package file.
 *
 * @param path - Path.
 * @returns Package file data.
 */
export declare function getPackage(path?: string): Package;
/**
 * Gets selectors as a string.
 *
 * @param options - Options.
 * @param defaultSelectors - Default selectors.
 * @returns Selectors as a string.
 */
export declare function getSelectors(options: GetSelectorsOptions, defaultSelectors: strings): string;
export declare function mergeListenters(...listenters: RuleListeners): RuleListener;
/**
 * Returns string representing node.
 *
 * @param node - Node.
 * @param defVal - Default value.
 * @returns String representing node.
 */
export declare function nodeText(node: TSESTree.Node, defVal: string | (() => string)): string;
export declare function prefixKeys<T, P extends string>(obj: T, prefix: P): PrefixKeys<T, P>;
export declare function prepareForComparison(str: string, priority: string): string;
/**
 * Strips base path.
 *
 * @param path - Path.
 * @param replacement - Replacement.
 * @returns Stripped path.
 */
export declare function stripBase(path: string, replacement?: string): string;
export declare function wrapRule<M extends string, O extends readonly unknown[]>(rule: RuleModule<M, O>, options: O): RuleModule<M, O>;
//# sourceMappingURL=core.d.ts.map