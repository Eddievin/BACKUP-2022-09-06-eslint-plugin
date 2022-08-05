/* eslint-disable @skylib/custom/prefer-readonly-array -- Ok */

import * as _ from "@skylib/lodash-commonjs-es";
import { AST_NODE_TYPES, ESLintUtils } from "@typescript-eslint/utils";
import {
  Accumulator,
  ProxyHandlerAction,
  a,
  as,
  assert,
  cast,
  fn,
  is,
  json,
  o,
  reflect,
  s,
  wrapProxyHandler
} from "@skylib/functions";
import type {
  ReportDescriptor as BaseReportDescriptor,
  RuleContext,
  RuleFunction,
  RuleListener,
  RuleModule
} from "@typescript-eslint/utils/dist/ts-eslint";
import type {
  Context,
  DefineTemplateBodyVisitor,
  Package,
  PrefixKeys
} from "./types";
import type { Entry, Rec, strings, types } from "@skylib/functions";
import type { TSESTree } from "@typescript-eslint/utils";
import { TypeCheck } from "./TypeCheck";
import { createBetterContext } from "./create-context";
import fs from "node:fs";
import minimatch from "minimatch";
import nodePath from "node:path";

export enum MatcherType {
  allowDisallow = "allowDisallow",
  disallowAllow = "disallowAllow"
}

export const isMatcherType = is.factory(is.enumeration, MatcherType);

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

export const isPattern: is.Guard<Pattern> = is.or.factory(
  is.string,
  is.strings
);

export const isSelector = is.or.factory(is.string, is.strings);

export const selectors = {
  arrayType: "TSArrayType, TSTupleType",
  block: "BlockStatement, Program, SwitchCase, TSModuleBlock",
  documentedBlock: "ExportNamedDeclaration, Program, TSModuleBlock",
  function: ":function, TSDeclareFunction, TSFunctionType, TSMethodSignature",
  functionExpression: "ArrowFunctionExpression, FunctionExpression",
  method: "MethodDefinition, TSAbstractMethodDefinition",
  property: "PropertyDefinition, TSPropertySignature",
  statement: ":statement, TSDeclareFunction, TSExportAssignment"
} as const;

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
   * @param typeCheck - Type check.
   * @returns Rule listener.
   */
  readonly create: (
    context: Context<M, O, S>,
    typeCheck: TypeCheck
  ) => RuleListener;
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

export type ReportDescriptor<T extends string = string> =
  BaseReportDescriptor<T>;

export type ReportDescriptors<T extends string = string> = ReadonlyArray<
  ReportDescriptor<T>
>;

export type RuleListeners = readonly RuleListener[];

export type Selector = strings | string;

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
export function createFileMatcher(
  patterns: strings | { readonly allow: strings; readonly disallow: strings },
  defVal: boolean,
  options: Readonly<minimatch.IOptions>
): Matcher {
  if (is.strings(patterns)) {
    const matchers = patterns.map(
      pattern =>
        (str: string): boolean =>
          minimatch(str, pattern, options)
    );

    return matchers.length
      ? (str): boolean => matchers.some(matcher => matcher(str))
      : (): boolean => defVal;
  }

  const { allow, disallow } = patterns;

  const disallowMatcher = createFileMatcher(disallow, true, options);

  const allowMatcher = createFileMatcher(allow, false, options);

  return disallow.length || allow.length
    ? (str): boolean => disallowMatcher(str) && !allowMatcher(str)
    : (): boolean => defVal;
}

/**
 * Creates matcher.
 *
 * @param pattern - RegExp pattern(s).
 * @param defVal - Default value.
 * @returns Matcher.
 */
export function createRegexpMatcher(
  pattern: Pattern,
  defVal: boolean
): Matcher {
  if (is.string(pattern)) return createRegexpMatcher([pattern], defVal);

  const matchers = pattern
    // eslint-disable-next-line security/detect-non-literal-regexp -- Ok
    .map(pt => new RegExp(pt, "u"))
    .map(re => (str: string) => re.test(str));

  return matchers.length
    ? str => matchers.some(matcher => matcher(str))
    : () => defVal;
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
    Partial<O> & {
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

      const typeCheck = new Proxy(
        new TypeCheck(context),
        wrapProxyHandler("classToInterface", ProxyHandlerAction.doDefault, {
          get: (target, key) => {
            // eslint-disable-next-line @skylib/custom/functions/no-reflect-get -- Postponed
            const result2 = reflect.get(target, key);

            assert.callable<types.fn.Callable>(result2, "Expecting function");

            // eslint-disable-next-line no-warning-comments -- Wait for @skylib/functions update
            // fixme
            return result2.bind(target);
          }
        })
      );

      const result = create(betterContext, typeCheck);

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
 * Gets name from filename.
 *
 * @param path - Path.
 * @param expected - Expected name.
 * @returns Name.
 */
export function getIdentifierFromPath(path: string, expected?: string): string {
  // eslint-disable-next-line @typescript-eslint/no-shadow -- Postponed
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

  const selectors2 = noDefaultSelectors
    ? includeSelectors
    : _.difference(
        [...defaultSelectors, ...includeSelectors],
        excludeSelectors
      );

  assert.toBeTrue(selectors2.length > 0, "Expecting at least one selector");

  return selectors2.join(", ");
}

// eslint-disable-next-line @skylib/require-jsdoc -- Postponed
export function mergeListenters(...listenters: RuleListeners): RuleListener {
  const visitorsMap = new Accumulator(
    listenters.flatMap(visitors =>
      o
        .entries(visitors)
        .map(
          ([selector, visitor]): Entry1 => [
            selector,
            [as.callable<Visitor>(visitor)]
          ]
        )
    )
  );

  const entries = a.fromIterable(visitorsMap).map(
    ([name, visitors]): Entry2 => [
      name,
      node => {
        for (const visitor of visitors) visitor(node);
      }
    ]
  );

  const result: RuleListener = {};

  for (const [selector, visitor] of entries) result[selector] = visitor;

  return result;

  type Entry1 = Accumulator.Entry<string, Visitor>;

  type Entry2 = Entry<string, Visitor>;

  type Visitor = RuleFunction<TSESTree.Node>;
}

/**
 * Returns string representing node.
 *
 * @param node - Node.
 * @param defVal - Default value.
 * @returns String representing node.
 */
export function nodeText(
  node: TSESTree.Node,
  defVal: string | (() => string)
): string {
  switch (node.type) {
    case AST_NODE_TYPES.Identifier:
      return node.name;

    case AST_NODE_TYPES.Literal:
      return cast.string(node.value);

    default:
      return as.callable<() => string>(defVal)();
  }
}

// eslint-disable-next-line @skylib/require-jsdoc -- Ok
export function prefixKeys<T, P extends string>(
  obj: T,
  prefix: P
): PrefixKeys<T, P> {
  return o.fromEntries(
    o.entries(obj).map(([key, value]) => [`${prefix}${key}`, value])
  ) as PrefixKeys<T, P>;
}

// eslint-disable-next-line @skylib/require-jsdoc -- Postponed
export function prepareForComparison(str: string, priority: string): string {
  const keys = a.fromString(priority);

  const values = a.sort(a.fromString(priority));

  const map = o.fromEntries(
    keys.map((key, index) => [key, a.get(values, index)])
  );

  // eslint-disable-next-line security/detect-non-literal-regexp -- Ok
  const re = new RegExp(`[${s.escapeRegExpSpecialChars(priority)}]`, "gu");

  return str.replace(re, callback);

  function callback(char: string): string {
    return map[char] as string;
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

// eslint-disable-next-line @skylib/require-jsdoc -- Postpone
export function wrapRule<M extends string, O extends readonly unknown[]>(
  rule: RuleModule<M, O>,
  options: O
): RuleModule<M, O> {
  return {
    ...rule,
    create: context => {
      const combined = options.map((option, index) => {
        const override = context.options[index];

        return is.object(option) && is.object(override)
          ? { ...option, ...override }
          : option;
      });

      return rule.create(
        new Proxy(
          {} as Readonly<RuleContext<never, never>>,
          wrapProxyHandler("wrap-rule", ProxyHandlerAction.throw, {
            get: (_target, key) =>
              // eslint-disable-next-line @skylib/custom/functions/no-reflect-get -- Postponed
              key === "options" ? combined : reflect.get(context, key)
          })
        )
      );
    }
  };
}
