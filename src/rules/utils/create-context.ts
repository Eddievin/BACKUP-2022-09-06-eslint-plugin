/* eslint-disable @skylib/only-export-name -- Postponed */

/* eslint-disable @skylib/custom/prefer-arrow-function-property -- Postponed */

import type * as estree from "estree";
import type { Context, DefineTemplateBodyVisitor } from "./types";
import type { CreateRuleOptions, SharedOptions2 } from "./core";
import { assert, cast, evaluate, is, o, s } from "@skylib/functions";
import { createFileMatcher, getPackage, stripBase } from "./core";
import { AST_NODE_TYPES } from "@typescript-eslint/utils";
import type { RuleContext } from "@typescript-eslint/utils/dist/ts-eslint";
import type { TSESTree } from "@typescript-eslint/utils";
import type { unknowns } from "@skylib/functions";

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

  return {
    code,
    defineTemplateBodyVisitor: (
      // eslint-disable-next-line @typescript-eslint/no-explicit-any -- Ok
      templateVisitor: any,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any -- Ok
      scriptVisitor?: any
      // eslint-disable-next-line @typescript-eslint/no-explicit-any -- Ok
    ): any => {
      assert.not.empty(context.parserServices, "Missing Vue parser");

      const defineTemplateBodyVisitor = o.get(
        context.parserServices,
        "defineTemplateBodyVisitor"
      );

      assert.callable<DefineTemplateBodyVisitor>(
        defineTemplateBodyVisitor,
        "Missing Vue parser"
      );

      return defineTemplateBodyVisitor(templateVisitor, scriptVisitor);
    },
    eol: s.detectEol(code),
    getLocFromRange(range): estree.SourceLocation {
      return {
        end: source.getLocFromIndex(range[1]),
        start: source.getLocFromIndex(range[0])
      };
    },
    getMemberName(node: TSESTree.ClassElement | TSESTree.TypeElement): string {
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
              return this.getText(node.key);
          }

        case AST_NODE_TYPES.StaticBlock:
        case AST_NODE_TYPES.TSIndexSignature:
        case AST_NODE_TYPES.TSCallSignatureDeclaration:
        case AST_NODE_TYPES.TSConstructSignatureDeclaration:
          return "";
      }
    },
    getText(node): string {
      return code.slice(...node.range);
    },
    hasTrailingComment(node): boolean {
      return code.slice(node.range[1]).trimStart().startsWith("//");
    },
    id,
    locZero: {
      end: source.getLocFromIndex(0),
      start: source.getLocFromIndex(0)
    },
    options: getRuleOptions(ruleOptionsArray, options),
    package: getPackage(),
    path,
    rawContext: context,
    report: context.report.bind(context),
    scope: context.getScope(),
    source,
    subOptionsArray: getSubOptionsArray(ruleOptionsArray, options, path)
  };
}

const isSharedOptions2 = is.object.factory<SharedOptions2>(
  {},
  { _id: is.string, filesToLint: is.strings, filesToSkip: is.strings }
);

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
