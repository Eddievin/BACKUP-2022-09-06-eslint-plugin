/* eslint-disable @skylib/custom/prefer-arrow-function-property -- Ok */

/* eslint-disable @skylib/custom/prefer-readonly-array -- Ok */

import * as _ from "@skylib/lodash-commonjs-es";
import type * as estree from "estree";
import type * as ts from "typescript";
import * as tsutils from "tsutils";
import { AST_NODE_TYPES, ESLintUtils } from "@typescript-eslint/utils";
import type { Accumulator, Rec, strings, unknowns } from "@skylib/functions";
import type { Context, DefineTemplateBodyVisitor, Package } from "./types";
import type {
  RuleContext,
  RuleListener,
  RuleModule
} from "@typescript-eslint/utils/dist/ts-eslint";
import {
  a,
  assert,
  cast,
  defineFn,
  evaluate,
  fn,
  is,
  json,
  o,
  s,
  typedef
} from "@skylib/functions";
import type { TSESTree } from "@typescript-eslint/utils";
import { TypeCheck } from "./TypeCheck";
import fs from "node:fs";
import minimatch from "minimatch";
import nodePath from "node:path";

export const isPackage: is.Guard<Package> = is.factory(
  is.object.of,
  {},
  { name: is.string }
);

export const base = fn.pipe(
  process.cwd(),
  s.path.canonicalize,
  s.path.addTrailingSlash
);

export const createFileMatcher = defineFn(
  /**
   * Creates file matcher.
   *
   * @param patterns - Patterns.
   * @param defVal - Default value.
   * @param options - Minimatch options.
   * @returns Matcher.
   */
  (
    patterns: strings,
    defVal: boolean,
    options: Readonly<minimatch.IOptions>
  ): Matcher => {
    const matchers = patterns.map(
      pattern =>
        (str: string): boolean =>
          minimatch(str, pattern, options)
    );

    // eslint-disable-next-line no-warning-comments -- Postponed
    // fixme
    return evaluate(() =>
      matchers.length
        ? (str): boolean => matchers.some(matcher => matcher(str))
        : (): boolean => defVal
    );
  },
  {
    /**
     * Creates file matcher.
     *
     * @param disallow - Disallow patterns.
     * @param allow - Allow patterns.
     * @param defVal - Default value.
     * @param options - Minimatch options.
     * @returns Matcher.
     */
    disallowAllow: (
      disallow: strings,
      allow: strings,
      defVal: boolean,
      options: Readonly<minimatch.IOptions>
    ): Matcher => {
      if (disallow.length || allow.length) {
        const disallowMatcher = createFileMatcher(disallow, true, options);

        const allowMatcher = createFileMatcher(allow, false, options);

        return (str): boolean => disallowMatcher(str) && !allowMatcher(str);
      }

      return (): boolean => defVal;
    }
  }
);

export const isPattern: is.Guard<Pattern> = is.or.factory(
  is.string,
  is.strings
);

export const isSelector = is.or.factory(is.string, is.strings);

export interface CreateRuleOptions<
  M extends string,
  O extends object,
  S extends object,
  K extends string = never
> {
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

export type Pattern = strings | string;

export type Selector = strings | string;

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
export function buildChildNodesMap(
  node: TSESTree.Node,
  mutableChildNodesMap: Accumulator<string, TSESTree.Node>
): void {
  mutableChildNodesMap.push(getNodeId(node.parent), node);
}

/**
 * Creates matcher.
 *
 * @param mixedPattern - RegExp pattern(s).
 * @param defVal - Default value.
 * @returns Matcher.
 */
export function createMatcher(
  mixedPattern: Pattern | undefined,
  defVal: boolean
): Matcher {
  if (is.not.empty(mixedPattern)) {
    const matchers = a
      .fromMixed(mixedPattern)
      // eslint-disable-next-line security/detect-non-literal-regexp -- Ok
      .map(pattern => new RegExp(pattern, "u"))
      .map(re => (str: string) => re.test(str));

    return str => matchers.some(matcher => matcher(str));
  }

  return () => defVal;
}

/**
 * Creates rule listenter.
 *
 * @param options - Options.
 * @returns Rule listenter.
 */
export function createRule<
  M extends string,
  O extends object,
  S extends object,
  K extends string = never
>(
  options: CreateRuleOptions<M, O, S, K>
): RuleModule<
  M,
  [
    Partial<O & SharedOptions1> & {
      readonly [L in K]?: ReadonlyArray<Partial<S & SharedOptions2>>;
    }
  ]
> {
  const { create, defaultOptions, fixable, messages, vue } = {
    vue: false,
    ...options
  } as const;

  const ruleCreator = ESLintUtils.RuleCreator(
    (name: string) => `https://ilyub.github.io/eslint-plugin/${name}.html`
  );

  return ruleCreator({
    create: (context: RuleContext<M, [object]>, rawOptions): RuleListener => {
      const betterContext = createBetterContext(context, rawOptions, options);

      const result = shouldBeLinted1(betterContext.options, betterContext.path)
        ? create(betterContext)
        : {};

      if (vue && is.not.empty(context.parserServices)) {
        const defineTemplateBodyVisitor = o.get(
          context.parserServices,
          "defineTemplateBodyVisitor"
        );

        if (is.callable<DefineTemplateBodyVisitor>(defineTemplateBodyVisitor))
          return defineTemplateBodyVisitor(result, result);
      }

      return result;
    },
    defaultOptions: [defaultOptions ?? {}],
    meta: {
      docs: {
        description: "Rule",
        recommended: false,
        requiresTypeChecking: true
      },
      messages,
      schema: [{}],
      type: "suggestion",
      ...(is.not.empty(fixable) ? { fixable } : {})
    },
    name: options.name
  });
}

/**
 * Gets program comments.
 *
 * @param program - Program.
 * @returns Comments.
 */
export function getComments(program: TSESTree.Program): TSESTree.Comment[] {
  return cast.not.empty(program.comments, []);
}

/**
 * Gets name from filename.
 *
 * @param path - Path.
 * @param expected - Expected name.
 * @returns Name.
 */
export function getIdentifierFromPath(path: string, expected?: string): string {
  // eslint-disable-next-line @typescript-eslint/no-shadow -- Ok
  const { base, dir, name } = nodePath.parse(path);

  return is.not.empty(expected) &&
    base.split(".").some(part => getName(part) === expected)
    ? expected
    : getName(name === "index" ? nodePath.parse(dir).name : name);

  function getName(x: string): string {
    x = a.first(x.split("."));

    // eslint-disable-next-line no-warning-comments -- Postponed
    // fixme
    return /^[A-Z]/u.test(x) ? s.ucFirst(_.camelCase(x)) : _.camelCase(x);
  }
}

/**
 * Generates node ID.
 *
 * @param node - Node.
 * @returns Node ID.
 */
export function getNodeId(node: TSESTree.Node | undefined): string {
  return node ? `${node.type}-${node.range[0]}-${node.range[1]}` : ".";
}

/**
 * Parses package file.
 *
 * @param path - Path.
 * @returns Package file data.
 */
export function getPackage(path = "package.json"): Package {
  if (fs.existsSync(path)) {
    const result = json.decode(fs.readFileSync(path).toString());

    if (isPackage(result)) return result;
  }

  return {};
}

/**
 * Gets selectors as a string.
 *
 * @param options - Options.
 * @param defaultSelectors - Default selectors.
 * @returns Selectors as a string.
 */
export function getSelectors(
  options: GetSelectorsOptions,
  defaultSelectors: strings
): string {
  const { excludeSelectors, includeSelectors, noDefaultSelectors } = options;

  const selectors = noDefaultSelectors
    ? includeSelectors
    : _.difference(
        [...defaultSelectors, ...includeSelectors],
        excludeSelectors
      );

  assert.toBeTrue(selectors.length > 0, "Expecting at least one selector");

  return selectors.join(", ");
}

/**
 * Checks if two nodes are adjacent.
 *
 * @param node1 - Node 1.
 * @param node2 - Node 2.
 * @param childNodesMap - Child nodes map.
 * @returns _True_ if two nodes are adjacent, _false_ otherwise.
 */
export function isAdjacentNodes(
  node1: TSESTree.Node,
  node2: TSESTree.Node,
  childNodesMap: Accumulator<string, TSESTree.Node>
): boolean {
  const id1 = getNodeId(node1.parent);

  const id2 = getNodeId(node2.parent);

  if (id1 === id2) {
    const siblings = childNodesMap.get(id1);

    const index1 = siblings.indexOf(node1);

    const index2 = siblings.indexOf(node2);

    return index1 !== -1 && index2 !== -1 && index2 - index1 === 1;
  }

  return false;
}

/**
 * Returns string representing node.
 *
 * @param node - Node.
 * @param context - Context.
 * @returns String representing node.
 */
export function nodeToString(
  node: TSESTree.Node,
  context: Context<never, object, object>
): string {
  switch (node.type) {
    case "Identifier":
      return node.name;

    case "Literal":
      return cast.string(node.value);

    default:
      return `\u0000${context.getText(node)}`;
  }
}

/**
 * Strips base path.
 *
 * @param path - Path.
 * @param replacement - Replacement.
 * @returns Stripped path.
 */
export function stripBase(path: string, replacement = ""): string {
  assert.toBeTrue(
    s.path.canonicalize(path).startsWith(base),
    `Expecting path to be inside project folder: ${path}`
  );

  return `${replacement}${path.slice(base.length)}`;
}

const isSharedOptions1 = is.object.factory<SharedOptions1>(
  {},
  { filesToLint: is.strings, filesToSkip: is.strings }
);

const isSharedOptions2 = is.object.factory<SharedOptions2>(
  {},
  {
    _id: is.string,
    filesToLint: is.strings,
    filesToSkip: is.strings
  }
);

/**
 * Creates better context.
 *
 * @param context - Context.
 * @param ruleOptionsArray - Raw rule options array.
 * @param options - Options.
 * @returns Better context.
 */
function createBetterContext<
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

  const parser = ESLintUtils.getParserServices(context);

  assert.toBeTrue(
    tsutils.isStrictCompilerOptionEnabled(
      parser.program.getCompilerOptions(),
      "strictNullChecks"
    ),
    'Expecting "strictNullChecks" compiler option to be enabled'
  );

  const checker = parser.program.getTypeChecker();

  const toEsNode = parser.tsNodeToESTreeNodeMap.get.bind(
    parser.tsNodeToESTreeNodeMap
  );

  const toTsNode = parser.esTreeNodeToTSNodeMap.get.bind(
    parser.esTreeNodeToTSNodeMap
  );

  return {
    checker: parser.program.getTypeChecker(),
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
    getLeadingTrivia(node): string {
      // May be undefined inside Vue <template>
      const tsNode = typedef<ts.Node | undefined>(this.toTsNode(node));

      return tsNode
        ? code.slice(
            node.range[0] - tsNode.getLeadingTriviaWidth(),
            node.range[0]
          )
        : code.slice(node.range[0], node.range[0]);
    },
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
    getRangeWithLeadingTrivia(node): TSESTree.Range {
      return [
        node.range[0] - this.getLeadingTrivia(node).length,
        node.range[1]
      ];
    },
    getText(node): string {
      return code.slice(...node.range);
    },
    getTextWithLeadingTrivia(node): string {
      return code.slice(
        node.range[0] - this.getLeadingTrivia(node).length,
        node.range[1]
      );
    },
    hasLeadingDocComment(node): boolean {
      return this.getLeadingTrivia(node).trim().startsWith("/**");
    },
    hasTrailingComment(node): boolean {
      return code.slice(node.range[1]).trim().startsWith("//");
    },
    id,
    locZero: {
      end: source.getLocFromIndex(0),
      start: source.getLocFromIndex(0)
    },
    missingDocComment(mixed): boolean {
      return mixed.getDocumentationComment(this.checker).length === 0;
    },
    options: getRuleOptions(ruleOptionsArray, options),
    package: getPackage(),
    path,
    report: context.report.bind(context),
    scope: context.getScope(),
    source,
    subOptionsArray: getSubOptionsArray(ruleOptionsArray, options, path),
    toEsNode,
    toTsNode,
    typeCheck: new TypeCheck(checker, toTsNode)
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
  const { isOptions } = {
    // eslint-disable-next-line no-type-assertion/no-type-assertion -- Ok
    isOptions: is.unknown as is.Guard<O>,
    ...options
  };

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
function shouldBeLinted1(options: unknown, path: string): boolean {
  assert.byGuard(options, isSharedOptions1, "Expecting valid rule options");

  const disallowByPath = evaluate((): boolean => {
    const matcher = createFileMatcher.disallowAllow(
      options.filesToSkip ?? [],
      options.filesToLint ?? [],
      false,
      { dot: true, matchBase: true }
    );

    return matcher(stripBase(s.path.canonicalize(path), "./"));
  });

  return !disallowByPath;
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

  const disallowByPath = evaluate((): boolean => {
    const matcher = createFileMatcher.disallowAllow(
      options.filesToSkip ?? [],
      options.filesToLint ?? [],
      false,
      { dot: true, matchBase: true }
    );

    return matcher(stripBase(s.path.canonicalize(path), "./"));
  });

  return !disallowByPath;
}
