import { is } from "@skylib/functions";
import minimatch from "minimatch";
import type { Context, Package } from "./types";
import type { Accumulator, Rec, objects, strings } from "@skylib/functions";
import type { TSESTree } from "@typescript-eslint/utils";
import type { RuleListener, RuleModule } from "@typescript-eslint/utils/dist/ts-eslint";
export declare const isPackage: is.Guard<Package>;
export declare const base: string;
/**
 * Creates file matcher.
 *
 * @param patterns - Patterns.
 * @param defVal - Default value.
 * @param options - Minimatch options.
 * @returns Matcher.
 */
export declare const createFileMatcher: {
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
} & ((patterns: strings, defVal: boolean, options: Readonly<minimatch.IOptions>) => Matcher);
export interface CreateRuleOptions<M extends string, O extends object, S extends object> {
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
    readonly isRuleOptions: is.Guard<O>;
    readonly isSubOptions?: is.Guard<S>;
    readonly messages: Rec<M, string>;
    readonly name: string;
    readonly subOptionsKey?: string;
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
export declare type MessageId<T> = T extends RuleModule<infer I, infer _O> ? I : never;
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
 * @param patterns - RegExp patterns.
 * @returns Matcher.
 */
export declare function createMatcher(patterns: strings): Matcher;
/**
 * Creates rule listenter.
 *
 * @param options - Options.
 * @returns Rule listenter.
 */
export declare function createRule<M extends string, O extends object, S extends object>(options: CreateRuleOptions<M, O, S>): RuleModule<M, objects>;
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
export declare function getNameFromFilename(path: string, expected?: string): string;
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
 * Strips base path.
 *
 * @param path - Path.
 * @param replacement - Replacement.
 * @returns Stripped path.
 */
export declare function stripBase(path: string, replacement?: string): string;
//# sourceMappingURL=core.d.ts.map