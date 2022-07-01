import { assert, cast, evaluate, fn, is, json, o, s } from "@skylib/functions";
import * as _ from "@skylib/lodash-commonjs-es";
import {
  AST_NODE_TYPES,
  ESLintUtils,
  TSESLint
} from "@typescript-eslint/utils";
import minimatch from "minimatch";
import fs from "node:fs";
import nodePath from "node:path";
import * as tsutils from "tsutils";
import type {
  Accumulator,
  Rec,
  objects,
  strings,
  unknowns
} from "@skylib/functions";
import type { ParserServices, TSESTree } from "@typescript-eslint/utils";
import type {
  InvalidTestCase as BaseInvalidTestCase,
  ValidTestCase as BaseValidTestCase,
  ReportDescriptor,
  RuleContext,
  RuleListener,
  RuleModule,
  SourceCode
} from "@typescript-eslint/utils/dist/ts-eslint";
import type * as estree from "estree";
import type * as ts from "typescript";

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

/**
 * Creates file matcher.
 *
 * @param patterns - Patterns.
 * @param defVal - Default value.
 * @param options - Minimatch options.
 * @returns Matcher.
 */
export const createFileMatcher = o.extend(
  (
    patterns: strings,
    defVal: boolean,
    options: Readonly<minimatch.IOptions>
  ): Matcher => {
    if (patterns.length > 0) {
      const matchers = patterns.map(
        pattern =>
          (str: string): boolean =>
            minimatch(str, pattern, options)
      );

      return (str): boolean => matchers.some(matcher => matcher(str));
    }

    return (): boolean => defVal;
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
      if (disallow.length > 0 || allow.length > 0) {
        const disallowMatcher = createFileMatcher(disallow, true, options);

        const allowMatcher = createFileMatcher(allow, false, options);

        return (str): boolean => disallowMatcher(str) && !allowMatcher(str);
      }

      return (): boolean => defVal;
    }
  }
);

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
   * Checks if node has leading comment.
   *
   * @param node - Node.
   * @returns _True_ if node has leading comment, _false_ otherwise.
   */
  readonly hasLeadingComment: (node: TSESTree.Node) => boolean;
  /**
   * Checks if node has leading doc comment.
   *
   * @param node - Node.
   * @returns _True_ if node has leading doc comment, _false_ otherwise.
   */
  readonly hasLeadingDocComment: (node: TSESTree.Node) => boolean;
  /**
   * Checks if node has trailing comment.
   *
   * @param node - Node.
   * @returns _True_ if node has trailing comment, _false_ otherwise.
   */
  readonly hasTrailingComment: (node: TSESTree.Node) => boolean;
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
  readonly scope: ReturnType<RuleContext<M, unknowns>["getScope"]>;
  readonly source: SourceCode;
  readonly subOptionsArray: readonly S[];
  readonly toEsNode: ParserServices["tsNodeToESTreeNodeMap"]["get"];
  readonly toTsNode: ParserServices["esTreeNodeToTSNodeMap"]["get"];
}

export interface CreateRuleOptions<
  M extends string,
  O extends object,
  S extends object
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

export interface InvalidTestCase<M extends string>
  extends BaseInvalidTestCase<M, readonly [object]> {
  readonly filename?: SourceFile;
  readonly name: string;
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

export type MessageId<T> = T extends RuleModule<infer I, infer _O> ? I : never;

export interface Package {
  readonly name?: string;
}

export type ReadonlyRange = readonly [number, number];

export type SourceFile =
  | "camelCase.camelCase.ts"
  | "camelCase.ts"
  | "file.extras.ts"
  | "kebab-case.kebab-case.ts"
  | "kebab-case.ts"
  | "PascalCase.PascalCase.ts"
  | "PascalCase.ts"
  | "subfolder/index.ts"
  | "vue.d.ts";

export interface ValidTestCase extends BaseValidTestCase<readonly [object]> {
  readonly filename?: SourceFile;
  readonly name: string;
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
 * @param patterns - RegExp patterns.
 * @returns Matcher.
 */
export function createMatcher(patterns: strings): Matcher {
  const matchers = patterns
    // eslint-disable-next-line security/detect-non-literal-regexp
    .map(pattern => new RegExp(pattern, "u"))
    .map(
      re =>
        (str: string): boolean =>
          re.test(str)
    );

  return (str): boolean => matchers.some(matcher => matcher(str));
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
  S extends object
>(options: CreateRuleOptions<M, O, S>): RuleModule<M, objects> {
  const { create, defaultOptions, fixable, messages } = options;

  const ruleCreator = ESLintUtils.RuleCreator(
    (name: string) => `https://ilyub.github.io/eslint-plugin/${name}.html`
  );

  return ruleCreator({
    create: (context: RuleContext<M, [object]>, rawOptions) => {
      const betterContext = createBetterContext(context, rawOptions, options);

      return shouldBeLinted(
        betterContext.options,
        betterContext.id,
        betterContext.path,
        betterContext.code
      )
        ? create(betterContext)
        : {};
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
export function getNameFromFilename(path: string, expected?: string): string {
  // eslint-disable-next-line @typescript-eslint/no-shadow -- Ok
  const { base, dir, name } = nodePath.parse(path);

  return is.not.empty(expected) &&
    base.split(".").some(part => getName(part) === expected)
    ? expected
    : getName(name === "index" ? nodePath.parse(dir).name : name);

  function getName(x: string): string {
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
  return node ? node.range.join("-") : ".";
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
 * Gets type name.
 *
 * @param type - Type.
 * @returns Type name.
 */
export function getTypeName(type: ts.Type): string {
  const symbol = type.getSymbol();

  return symbol ? symbol.name : "?";
}

/**
 * Gets type names as a string.
 *
 * @param types - Types.
 * @returns Type names as a string.
 */
export function getTypeNames(types: readonly ts.Type[]): string {
  return types.map(type => getTypeName(type)).join(" > ");
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

    assert.not.empty(siblings, "Expecting siblings");

    const index1 = siblings.indexOf(node1);

    const index2 = siblings.indexOf(node2);

    return index1 !== -1 && index2 !== -1 && index2 - index1 === 1;
  }

  return false;
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

/**
 * Runs test.
 *
 * @param name - Rule name.
 * @param rules - Rules.
 * @param invalid - Invalid tests.
 * @param valid - Valid tests.
 */
export function testRule<K extends string, M extends string>(
  name: K,
  rules: Rec<K, RuleModule<M, objects>>,
  invalid: ReadonlyArray<InvalidTestCase<M>>,
  valid: readonly ValidTestCase[] = []
): void {
  const rule = rules[name];

  const tester = new TSESLint.RuleTester({
    // eslint-disable-next-line unicorn/prefer-module -- Postponed
    parser: require.resolve("@typescript-eslint/parser"),
    parserOptions: {
      ecmaVersion: 2017,
      project: "./tsconfig.json",
      sourceType: "module",
      tsconfigRootDir: `${base}fixtures`
    }
  });

  tester.run(name, rule, {
    invalid: invalid.map(invalidTest => {
      const code = s.unpadMultiline(invalidTest.code);

      const output = s.unpadMultiline(invalidTest.output ?? invalidTest.code);

      return {
        ...invalidTest,
        code,
        filename: `${base}fixtures/${invalidTest.filename ?? "file.ts"}`,
        output
      };
    }),
    valid: valid.map(validTest => {
      const code = s.unpadMultiline(validTest.code);

      return {
        ...validTest,
        code,
        filename: `${base}fixtures/${validTest.filename ?? "file.ts"}`
      };
    })
  });
}

const isSharedOptions: is.Guard<SharedOptions> = is.factory(
  is.object.of,
  {},
  {
    filesToLint: is.strings,
    filesToSkip: is.strings,
    subOptionsId: is.string
  }
);

interface SharedOptions {
  readonly filesToLint?: strings;
  readonly filesToSkip?: strings;
  readonly subOptionsId?: string;
}

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
  S extends object
>(
  context: RuleContext<M, unknowns>,
  ruleOptionsArray: unknowns,
  options: CreateRuleOptions<M, O, S>
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

  return {
    checker: parser.program.getTypeChecker(),
    code,
    eol: s.detectEol(code),
    getLeadingTrivia(node): string {
      const tsNode = this.toTsNode(node);

      return code.slice(
        node.range[0] - tsNode.getLeadingTriviaWidth(),
        node.range[0]
      );
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
    getTypeDefinitions(types): string {
      return types.map(type => this.checker.typeToString(type)).join(" > ");
    },
    hasLeadingComment(node): boolean {
      return (
        this.getLeadingTrivia(node).trim().startsWith("/*") ||
        this.getLeadingTrivia(node).trim().startsWith("//")
      );
    },
    hasLeadingDocComment(node): boolean {
      return this.getLeadingTrivia(node).trim().startsWith("/**");
    },
    hasTrailingComment(node): boolean {
      return code.slice(node.range[1]).trim().startsWith("//");
    },
    id,
    locZero: source.getLocFromIndex(0),
    missingDocComment(mixed): boolean {
      return mixed.getDocumentationComment(this.checker).length === 0;
    },
    options: getRuleOptions(ruleOptionsArray, options),
    package: getPackage(),
    path,
    report: context.report.bind(context),
    scope: context.getScope(),
    source,
    subOptionsArray: getSubOptionsArray(
      ruleOptionsArray,
      options,
      id,
      path,
      code
    ),
    toEsNode: parser.tsNodeToESTreeNodeMap.get.bind(
      parser.tsNodeToESTreeNodeMap
    ),
    toTsNode: parser.esTreeNodeToTSNodeMap.get.bind(
      parser.esTreeNodeToTSNodeMap
    )
  };
}

/**
 * Gets rule options.
 *
 * @param ruleOptionsArray - Raw rule options array.
 * @param options - Options.
 * @returns Rule options.
 */
function getRuleOptions<M extends string, O extends object, S extends object>(
  ruleOptionsArray: unknowns,
  options: CreateRuleOptions<M, O, S>
): O {
  const { isRuleOptions } = options;

  const ruleOptions = ruleOptionsArray[0];

  assert.byGuard(ruleOptions, isRuleOptions, "Expecting valid rule options");

  return ruleOptions;
}

/**
 * Gets suboptions array.
 *
 * @param ruleOptionsArray - Raw rule options array.
 * @param options - Options.
 * @param ruleId - Rule id.
 * @param path - Path.
 * @param code - Code.
 * @returns Suboptions array.
 */
function getSubOptionsArray<
  M extends string,
  O extends object,
  S extends object
>(
  ruleOptionsArray: unknowns,
  options: CreateRuleOptions<M, O, S>,
  ruleId: string,
  path: string,
  code: string
): readonly S[] {
  const { defaultSubOptions, isSubOptions, subOptionsKey } = options;

  if (isSubOptions) {
    const ruleOptions = getRuleOptions(ruleOptionsArray, options);

    const raw = o.get(ruleOptions, subOptionsKey ?? "rules") ?? [];

    assert.array.of(raw, is.object, "Expecting valid rule options");

    const result = raw
      .map(subOptions => {
        return { ...defaultSubOptions, ...subOptions };
      })
      .filter(subOptions => shouldBeLinted(subOptions, ruleId, path, code));

    assert.array.of(result, isSubOptions, "Expecting valid rule options");

    return result;
  }

  return [];
}

/**
 * Determines if file should be linted.
 *
 * @param options - Options.
 * @param ruleId - Rule id.
 * @param path - Path.
 * @param code - Code.
 * @returns _True_ if file should be linted, _false_ otherwise.
 */
function shouldBeLinted(
  options: unknown,
  ruleId: string,
  path: string,
  code: string
): boolean {
  assert.byGuard(options, isSharedOptions, "Expecting valid rule options");

  const disallowById =
    is.not.empty(options.subOptionsId) &&
    code.includes(
      `/* skylib/eslint-plugin disable ${ruleId}[${options.subOptionsId}] */`
    );

  const disallowByPath = evaluate<boolean>(() => {
    const matcher = createFileMatcher.disallowAllow(
      options.filesToSkip ?? [],
      options.filesToLint ?? [],
      false,
      { dot: true, matchBase: true }
    );

    return matcher(stripBase(s.path.canonicalize(path), "./"));
  });

  return !disallowByPath && !disallowById;
}
