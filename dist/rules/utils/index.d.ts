import type * as estree from "estree";
import minimatch from "minimatch";
import type * as ts from "typescript";
import type { ParserServices, TSESTree } from "@typescript-eslint/utils";
import type { InvalidTestCase as BaseInvalidTestCase, ReportDescriptor, RuleContext, RuleListener, RuleModule, SourceCode, ValidTestCase as BaseValidTestCase } from "@typescript-eslint/utils/dist/ts-eslint";
import * as is from "@skylib/functions/dist/guards";
import * as s from "@skylib/functions/dist/string";
import type { ReadonlyRecord } from "@skylib/functions/dist/types/core";
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
    readonly messages: ReadonlyRecord<M, string>;
    readonly subOptionsKey?: string;
}
export interface Context<M extends string, O extends object, S extends object> {
    readonly checker: ts.TypeChecker;
    readonly code: string;
    readonly eol: s.Eol;
    /**
     * Gets leading trivia.
     *
     * @param node - Node.
     * @returns Leading trivia.
     */
    readonly getLeadingTrivia: (node: TSESTree.Node) => string;
    /**
     * Gets location from range.
     *
     * @param range - Range.
     * @returns Location.
     */
    readonly getLocFromRange: (range: ReadonlyRange) => estree.SourceLocation;
    /**
     * Gets range with leading trivia.
     *
     * @param node - Node.
     * @returns Range.
     */
    readonly getRangeWithLeadingTrivia: (node: TSESTree.Node) => TSESTree.Range;
    /**
     * Gets text.
     *
     * @param node - Node.
     * @returns Text.
     */
    readonly getText: (node: TSESTree.Comment | TSESTree.Node) => string;
    /**
     * Gets text with leading trivia.
     *
     * @param node - Node.
     * @returns Text.
     */
    readonly getTextWithLeadingTrivia: (node: TSESTree.Node) => string;
    /**
     * Gets type definitions as a string.
     *
     * @param types - Types.
     * @returns Type definitions as a string.
     */
    readonly getTypeDefinitions: (types: readonly ts.Type[]) => string;
    /**
     * Checks if node has leading doc comment.
     *
     * @param node - Node.
     * @returns _True_ if node has leading doc comment, _false_ otherwise.
     */
    readonly hasLeadingDocComment: (node: TSESTree.Node) => boolean;
    readonly id: string;
    readonly locZero: TSESTree.Position;
    /**
     * Checks if signature or symbol is missing doc comment.
     *
     * @param mixed - Signature or symbol.
     * @returns _True_ if signature or symbol is missing doc comment, _false_ otherwise.
     */
    readonly missingDocComment: (mixed: ts.Signature | ts.Symbol) => boolean;
    readonly options: O;
    readonly package: Package;
    readonly path: string;
    /**
     * Reports error.
     *
     * @param descriptor - Descriptor.
     */
    readonly report: (descriptor: ReportDescriptor<M>) => void;
    readonly scope: ReturnType<RuleContext<M, readonly unknown[]>["getScope"]>;
    readonly source: SourceCode;
    readonly subOptionsArray: readonly S[];
    readonly toEsNode: ParserServices["tsNodeToESTreeNodeMap"]["get"];
    readonly toTsNode: ParserServices["esTreeNodeToTSNodeMap"]["get"];
}
export interface GetSelectorsOptions {
    readonly excludeSelectors: readonly string[];
    readonly includeSelectors: readonly string[];
    readonly noDefaultSelectors: boolean;
}
export interface InvalidTestCase<M extends string> extends BaseInvalidTestCase<M, readonly [object]> {
    name: string;
}
export declare type Matcher = (str: string) => boolean;
export declare type MessageId<T> = T extends RuleModule<infer I, infer _O> ? I : never;
export interface Package {
    readonly name?: string;
}
export declare const isPackage: is.Guard<Package>;
export declare type ReadonlyRange = readonly [number, number];
export interface ValidTestCase extends BaseValidTestCase<readonly [object]> {
    name: string;
}
export declare const base: string;
/**
 * Adds node to child nodes map.
 *
 * @param node - Node.
 * @param mutableChildNodesMap - Child nodes map.
 */
export declare function buildChildNodesMap(node: TSESTree.Node, mutableChildNodesMap: Map<string, TSESTree.Node[]>): void;
/**
 * Creates file matcher.
 *
 * @param patterns - Patterns.
 * @param defVal - Default value.
 * @param options - Minimatch options.
 * @returns Matcher.
 */
export declare function createFileMatcher(patterns: readonly string[], defVal: boolean, options: Readonly<minimatch.IOptions>): Matcher;
export declare namespace createFileMatcher {
    var disallowAllow: (disallow: readonly string[], allow: readonly string[], defVal: boolean, options: Readonly<minimatch.IOptions>) => Matcher;
}
/**
 * Creates matcher.
 *
 * @param patterns - RegExp patterns.
 * @returns Matcher.
 */
export declare function createMatcher(patterns: readonly string[]): Matcher;
/**
 * Creates rule listenter.
 *
 * @param options - Options.
 * @returns Rule listenter.
 */
export declare function createRule<M extends string, O extends object, S extends object>(options: CreateRuleOptions<M, O, S>): RuleModule<M, readonly unknown[]>;
/**
 * Gets program comments.
 *
 * @param program - Program.
 * @returns Comments.
 */
export declare function getComments(program: TSESTree.Program): TSESTree.Comment[];
/**
 * Parses package file.
 *
 * @param path - Path.
 * @returns Package file data.
 */
export declare function getPackage(path?: string): Package;
/**
 * Generates node ID.
 *
 * @param node - Node.
 * @returns Node ID.
 */
export declare function getNodeId(node: TSESTree.Node | undefined): string;
/**
 * Gets selectors as a string.
 *
 * @param options - Options.
 * @param defaultSelectors - Default selectors.
 * @returns Selectors as a string.
 */
export declare function getSelectors(options: GetSelectorsOptions, defaultSelectors: readonly string[]): string;
/**
 * Gets type name.
 *
 * @param type - Type.
 * @returns Type name.
 */
export declare function getTypeName(type: ts.Type): string;
/**
 * Gets type names as a string.
 *
 * @param types - Types.
 * @returns Type names as a string.
 */
export declare function getTypeNames(types: readonly ts.Type[]): string;
/**
 * Checks if two nodes are adjacent.
 *
 * @param node1 - Node 1.
 * @param node2 - Node 2.
 * @param childNodesMap - Child nodes map.
 * @returns _True_ if two nodes are adjacent, _false_ otherwise.
 */
export declare function isAdjacentNodes(node1: TSESTree.Node, node2: TSESTree.Node, childNodesMap: ReadonlyMap<string, readonly TSESTree.Node[]>): boolean;
/**
 * Strips base path.
 *
 * @param path - Path.
 * @param replacement - Replacement.
 * @returns Stripped path.
 */
export declare function stripBase(path: string, replacement?: string): string;
/**
 * Runs test.
 *
 * @param name - Rule name.
 * @param rule - Rule.
 * @param invalid - Invalid tests.
 * @param valid - Valid tests.
 */
export declare function testRule<M extends string>(name: string, rule: RuleModule<M, readonly [object]>, invalid: ReadonlyArray<InvalidTestCase<M>>, valid?: readonly ValidTestCase[]): void;
//# sourceMappingURL=index.d.ts.map