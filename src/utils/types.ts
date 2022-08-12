import type * as estree from "estree";
import type {
  ReportDescriptor,
  RuleContext,
  RuleFix,
  RuleListener,
  SourceCode
} from "@typescript-eslint/utils/dist/ts-eslint";
import type { s, strings, unknowns } from "@skylib/functions";
import type { TSESTree } from "@typescript-eslint/utils";
import { is } from "@skylib/functions";

export enum Fixable {
  code = "code",
  whitespace = "whitespace"
}

export enum TypeGroup {
  any = "any",
  array = "array",
  boolean = "boolean",
  complex = "complex",
  function = "function",
  never = "never",
  null = "null",
  number = "number",
  object = "object",
  parameter = "parameter",
  readonly = "readonly",
  string = "string",
  symbol = "symbol",
  tuple = "tuple",
  // eslint-disable-next-line @typescript-eslint/no-shadow -- Wait for https://github.com/typescript-eslint/typescript-eslint/issues/5337
  undefined = "undefined",
  unknown = "unknown"
}

export const isTypeGroup = is.factory(is.enumeration, TypeGroup);

export const isTypeGroups = is.factory(is.array.of, isTypeGroup);

export interface Context<M extends string, O extends object, S extends object> {
  readonly eol: s.Eol;
  // eslint-disable-next-line @skylib/require-jsdoc -- Postponed
  readonly getCommentRanges: (node: TSESTree.Node) => Ranges;
  // eslint-disable-next-line @skylib/require-jsdoc -- Postponed
  readonly getComments: (node: TSESTree.Node) => strings;
  // eslint-disable-next-line @skylib/require-jsdoc -- Postponed
  readonly getFullRange: (node: TSESTree.Node) => TSESTree.Range;
  // eslint-disable-next-line @skylib/require-jsdoc -- Postponed
  readonly getFullText: (node: TSESTree.Node) => string;
  // eslint-disable-next-line @skylib/require-jsdoc -- Postponed
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
  readonly getMemberName: (
    node: TSESTree.ClassElement | TSESTree.TypeElement
  ) => string;
  /**
   * Gets text.
   *
   * @param mixed - Node, comment or range.
   * @returns Text.
   */
  readonly getText: (
    mixed: Range | TSESTree.Comment | TSESTree.Node | number
  ) => string;
  /**
   * Checks if node has trailing comment.
   *
   * @param node - Node.
   * @returns _True_ if node has trailing comment, _false_ otherwise.
   */
  readonly hasTrailingComment: (node: TSESTree.Node) => boolean;
  readonly id: string;
  // eslint-disable-next-line @skylib/require-jsdoc -- Postponed
  readonly isAdjacentNodes: (
    node1: TSESTree.Node,
    node2: TSESTree.Node
  ) => boolean;
  readonly locZero: TSESTree.SourceLocation;
  // eslint-disable-next-line @skylib/require-jsdoc -- Postponed
  readonly normalizeSource: (source: string) => string;
  readonly options: O;
  readonly package: Package;
  readonly path: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any -- Postponed
  readonly rawContext: Readonly<RuleContext<any, any>>;
  /**
   * Reports error.
   *
   * @param descriptor - Descriptor.
   */
  readonly report: (descriptor: ReportDescriptor<M>) => void;
  readonly scope: ReturnType<RuleContext<M, unknowns>["getScope"]>;
  readonly source: SourceCode;
  // eslint-disable-next-line @skylib/require-jsdoc -- Postponed
  readonly stripExtension: (path: string) => string;
  readonly subOptionsArray: readonly S[];
}

// eslint-disable-next-line @skylib/require-jsdoc -- Postponed
export interface DefineTemplateBodyVisitor {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any -- Postponed
  (templateVisitor: any, scriptVisitor?: any, options?: any): RuleListener;
}

export interface Package {
  readonly name?: string;
}

export type PrefixKeys<T, P extends string> = {
  [K in string & keyof T as `${P}${K}`]: T[K];
};

export type Range = readonly [number, number];

export type Ranges = readonly Range[];

export type RuleFixes = readonly RuleFix[];

export type TypeGroups = readonly TypeGroup[];
