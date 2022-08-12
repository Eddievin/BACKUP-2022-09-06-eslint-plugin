/* eslint-disable @skylib/no-sibling-import -- Postponed */
/* eslint-disable @skylib/only-export-name -- Postponed */

import type * as estree from "estree";
// eslint-disable-next-line @typescript-eslint/no-shadow -- Postponeds
import type { Context, Range } from "./types";
import type { CreateRuleOptions, SharedOptions2 } from "./core";
import { assert, cast, evaluate, is, o, s } from "@skylib/functions";
import { createFileMatcher, getPackage, stripBase } from "./core";
import { AST_NODE_TYPES } from "@typescript-eslint/utils";
import type { RuleContext } from "@typescript-eslint/utils/dist/ts-eslint";
import type { TSESTree } from "@typescript-eslint/utils";
import nodePath from "node:path";
import type { unknowns } from "@skylib/functions";

const isSharedOptions2 = is.object.factory<SharedOptions2>(
  {},
  { _id: is.string, filesToLint: is.strings, filesToSkip: is.strings }
);

/**
 * Creates better context.
 *
 * @param context - Context.
 * @param ruleOptionsArray - Raw rule options array.
 * @param options - Options.
 * @returns Better context.
 */
export function createBetterContext<
  M extends string,
  O extends object,
  S extends object,
  K extends string = never
>(
  context: RuleContext<M, unknowns>,
  ruleOptionsArray: unknowns,
  options: CreateRuleOptions<M, O, S, K>
): Context<M, O, S> {
  const id = context.id;

  const path = context.getFilename();

  const source = context.getSourceCode();

  const code = source.getText();

  const _package = getPackage();

  const getText = (
    mixed: Range | TSESTree.Comment | TSESTree.Node | number
  ): string => {
    if (is.number(mixed)) return code.slice(mixed);

    if (is.array(mixed)) return code.slice(...mixed);

    return code.slice(...mixed.range);
  };

  return {
    eol: s.detectEol(code),
    getCommentRanges: (node: TSESTree.Node) =>
      source.getCommentsBefore(node).map(comment => comment.range),
    getComments: (node: TSESTree.Node) =>
      source
        .getCommentsBefore(node)
        .map(comment => code.slice(...comment.range)),
    getFullRange: (node: TSESTree.Node) => [
      Math.min(
        node.range[0],
        ...source.getCommentsBefore(node).map(comment => comment.range[0])
      ),
      node.range[1]
    ],
    getFullText: (node: TSESTree.Node): string =>
      code.slice(
        Math.min(
          node.range[0],
          ...source.getCommentsBefore(node).map(comment => comment.range[0])
        ),
        node.range[1]
      ),
    getLeadingSpaces: (node: TSESTree.Node) => {
      const end = Math.min(
        node.range[0],
        ...source.getCommentsBefore(node).map(comment => comment.range[0])
      );

      const pos = code.slice(0, end).trimEnd().length;

      return [pos, end];
    },
    getLoc: (range): estree.SourceLocation => ({
      end: source.getLocFromIndex(range[1]),
      start: source.getLocFromIndex(range[0])
    }),
    getMemberName: (
      node: TSESTree.ClassElement | TSESTree.TypeElement
    ): string => {
      switch (node.type) {
        case AST_NODE_TYPES.MethodDefinition:
        case AST_NODE_TYPES.PropertyDefinition:
        case AST_NODE_TYPES.TSAbstractMethodDefinition:
        case AST_NODE_TYPES.TSAbstractPropertyDefinition:
        case AST_NODE_TYPES.TSMethodSignature:
        case AST_NODE_TYPES.TSPropertySignature:
          switch (node.key.type) {
            case AST_NODE_TYPES.Identifier:
              return node.key.name;

            case AST_NODE_TYPES.Literal:
              return cast.string(node.key.value);

            default:
              return getText(node.key);
          }

        case AST_NODE_TYPES.StaticBlock:
        case AST_NODE_TYPES.TSIndexSignature:
        case AST_NODE_TYPES.TSCallSignatureDeclaration:
        case AST_NODE_TYPES.TSConstructSignatureDeclaration:
          return "";
      }
    },
    getText,
    hasTrailingComment: (node): boolean =>
      code.slice(node.range[1]).trimStart().startsWith("//"),
    id,
    isAdjacentNodes: (node1: TSESTree.Node, node2: TSESTree.Node): boolean => {
      if (node1.parent === node2.parent) {
        const pos = node1.range[1];

        const end = Math.min(
          node2.range[0],
          ...source.getCommentsBefore(node2).map(comment => comment.range[0])
        );

        if (pos <= end) return ["", ","].includes(code.slice(pos, end).trim());
      }

      return false;
    },
    locZero: {
      end: source.getLocFromIndex(0),
      start: source.getLocFromIndex(0)
    },
    normalizeSource: (source2: string): string => {
      source2 = evaluate(() => {
        if (source2 === "@") {
          assert.not.empty(_package.name, "Missing package name");

          return `${_package.name}/src`;
        }

        if (source2.startsWith("@/")) {
          assert.not.empty(_package.name, "Missing package name");

          return `${_package.name}/src/${source2.slice(2)}`;
        }

        if (
          source2 === "." ||
          source2 === ".." ||
          source2.startsWith("./") ||
          source2.startsWith("../")
        ) {
          assert.not.empty(_package.name, "Missing package name");

          const path2 = stripBase(
            nodePath.join(nodePath.dirname(path), source2)
          );

          return `${_package.name}/${path2}`;
        }

        return source2;
      });

      return s.path.canonicalize(source2);
    },
    options: getRuleOptions(ruleOptionsArray, options),
    package: getPackage(),
    path,
    rawContext: context,
    report: context.report.bind(context),
    scope: context.getScope(),
    source,
    stripExtension: (str: string): string => {
      for (const ext of [".js", ".ts", ".vue"])
        if (str.endsWith(ext)) return str.slice(0, -ext.length);

      return str;
    },
    subOptionsArray: getSubOptionsArray(ruleOptionsArray, options, path)
  };
}

/**
 * Gets rule options.
 *
 * @param ruleOptionsArray - Raw rule options array.
 * @param options - Options.
 * @returns Rule options.
 */
function getRuleOptions<
  M extends string,
  O extends object,
  S extends object,
  K extends string = never
>(ruleOptionsArray: unknowns, options: CreateRuleOptions<M, O, S, K>): O {
  const { isOptions } = { isOptions: is.unknown as is.Guard<O>, ...options };

  const ruleOptions = ruleOptionsArray[0];

  assert.byGuard(ruleOptions, isOptions, "Expecting valid rule options");

  return ruleOptions;
}

/**
 * Gets suboptions array.
 *
 * @param ruleOptionsArray - Raw rule options array.
 * @param options - Options.
 * @param path - Path.
 * @returns Suboptions array.
 */
function getSubOptionsArray<
  M extends string,
  O extends object,
  S extends object,
  K extends string = never
>(
  ruleOptionsArray: unknowns,
  options: CreateRuleOptions<M, O, S, K>,
  path: string
): readonly S[] {
  const { defaultSubOptions, isSubOptions, subOptionsKey } = options;

  if (isSubOptions) {
    const ruleOptions = getRuleOptions(ruleOptionsArray, options);

    assert.not.empty(subOptionsKey, "Expecting suboptions key");

    const raw = o.get(ruleOptions, subOptionsKey) ?? [];

    assert.array.of(raw, is.object, "Expecting valid rule options");

    const result = raw
      .map((subOptions): object => ({ ...defaultSubOptions, ...subOptions }))
      .filter(subOptions => shouldBeLinted2(subOptions, path));

    assert.array.of(result, isSubOptions, "Expecting valid rule options");

    return result;
  }

  return [];
}

/**
 * Determines if file should be linted.
 *
 * @param options - Options.
 * @param path - Path.
 * @returns _True_ if file should be linted, _false_ otherwise.
 */
function shouldBeLinted2(options: unknown, path: string): boolean {
  assert.byGuard(options, isSharedOptions2, "Expecting valid rule options");

  const disallowByPath = evaluate(() => {
    const matcher = createFileMatcher(
      { allow: options.filesToLint ?? [], disallow: options.filesToSkip ?? [] },
      false,
      { dot: true, matchBase: true }
    );

    return matcher(stripBase(s.path.canonicalize(path), "./"));
  });

  return !disallowByPath;
}
