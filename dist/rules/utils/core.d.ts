import type { Accumulator, Rec, strings } from "@skylib/functions";
import type { Context, Package } from "./types";
import type { RuleListener, RuleModule } from "@typescript-eslint/utils/dist/ts-eslint";
import { is } from "@skylib/functions";
import type { TSESTree } from "@typescript-eslint/utils";
import minimatch from "minimatch";
export declare const isPackage: is.Guard<Package>;
export declare const base: string;
export declare const createFileMatcher: ((patterns: strings, defVal: boolean, options: Readonly<minimatch.IOptions>) => Matcher) & Readonly<{
    /**
     * Creates file matcher.
     *
     * @param disallow - Disallow patterns.
     * @param allow - Allow patterns.
     * @param defVal - Default value.
     * @param options - Minimatch options.
     * @returns Matcher.
     */
    disallowAllow: (disallow: strings, allow: strings, defVal: boolean, options: Readonly<minimatch.IOptions>) => Matcher;
}>;
export declare const isPattern: is.Guard<Pattern>;
export declare const isSelector: is.Guard<string | readonly string[]>;
export interface CreateRuleOptions<M extends string, O extends object, S extends object, K extends string = never> {
    /**
     * Creates rule listener.
     *
     * @param context - Context.
     * @returns Rule listener.
     */
    readonly create: (context: Context<M, O, S>) => RuleListener;
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
export declare type Selector = strings | string;
export interface SharedOptions1 {
    readonly filesToLint?: strings;
    readonly filesToSkip?: strings;
}
export interface SharedOptions2 {
    readonly _id?: string;
    readonly filesToLint?: strings;
    readonly filesToSkip?: strings;
}
/**
 * Adds node to child nodes map.
 *
 * @param node - Node.
 * @param mutableChildNodesMap - Child nodes map.
 */
export declare function buildChildNodesMap(node: TSESTree.Node, mutableChildNodesMap: Accumulator<string, TSESTree.Node>): void;
/**
 * Creates matcher.
 *
 * @param mixedPattern - RegExp pattern(s).
 * @param defVal - Default value.
 * @returns Matcher.
 */
export declare function createMatcher(mixedPattern: Pattern | undefined, defVal: boolean): Matcher;
/**
 * Creates rule listenter.
 *
 * @param options - Options.
 * @returns Rule listenter.
 */
export declare function createRule<M extends string, O extends object, S extends object, K extends string = never>(options: CreateRuleOptions<M, O, S, K>): RuleModule<M, [
    Partial<O & SharedOptions1> & {
        readonly [L in K]?: ReadonlyArray<Partial<S & SharedOptions2>>;
    }
]>;
/**
 * Gets program comments.
 *
 * @param program - Program.
 * @returns Comments.
 */
export declare function getComments(program: TSESTree.Program): TSESTree.Comment[];
/**
 * Gets name from filename.
 *
 * @param path - Path.
 * @param expected - Expected name.
 * @returns Name.
 */
export declare function getIdentifierFromPath(path: string, expected?: string): string;
/**
 * Generates node ID.
 *
 * @param node - Node.
 * @returns Node ID.
 */
export declare function getNodeId(node: TSESTree.Node | undefined): string;
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
/**
 * Checks if two nodes are adjacent.
 *
 * @param node1 - Node 1.
 * @param node2 - Node 2.
 * @param childNodesMap - Child nodes map.
 * @returns _True_ if two nodes are adjacent, _false_ otherwise.
 */
export declare function isAdjacentNodes(node1: TSESTree.Node, node2: TSESTree.Node, childNodesMap: Accumulator<string, TSESTree.Node>): boolean;
/**
 * Returns string representing node.
 *
 * @param node - Node.
 * @param context - Context.
 * @returns String representing node.
 */
export declare function nodeToString(node: TSESTree.Node, context: Context<never, object, object>): string;
/**
 * Strips base path.
 *
 * @param path - Path.
 * @param replacement - Replacement.
 * @returns Stripped path.
 */
export declare function stripBase(path: string, replacement?: string): string;
//# sourceMappingURL=core.d.ts.map