import type {
  ReportDescriptor as BaseReportDescriptor,
  RuleFix,
  RuleListener
} from "@typescript-eslint/utils/dist/ts-eslint";
import type { AllowDisallowPattern } from "./misc.internal";
import type { strings } from "@skylib/functions";

export enum Casing {
  camelCase = "camelCase",
  // eslint-disable-next-line @skylib/consistent-enum-members -- Ok
  kebabCase = "kebab-case",
  // eslint-disable-next-line @skylib/consistent-enum-members -- Ok
  pascalCase = "PascalCase"
}

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
  // eslint-disable-next-line @typescript-eslint/no-shadow -- Wait for @skylib/config update
  undefined = "undefined",
  unknown = "unknown"
}

// eslint-disable-next-line no-warning-comments -- Wait for @skylib/functions update
// fixme
export type FilePattern = AllowDisallowPattern | strings | string;

export interface Matcher {
  /**
   * Checks if string matches condition.
   *
   * @param str - String.
   * @returns _True_ if string matches condition, _false_ otherwise.
   */
  (str: string): boolean;
}

export type Options<
  O extends object,
  S extends object,
  K extends string = never
> = O & { readonly [L in K]: SuboptionsArray<S> };

// eslint-disable-next-line no-warning-comments -- Wait for @skylib/functions update
// fixme
export type RegexpPattern = strings | string;

export type ReportDescriptor<T extends string = string> =
  BaseReportDescriptor<T>;

export type ReportDescriptors<T extends string = string> = ReadonlyArray<
  ReportDescriptor<T>
>;

export type RuleFixes = readonly RuleFix[];

export type RuleListeners = readonly RuleListener[];

// eslint-disable-next-line no-warning-comments -- Wait for @skylib/functions update
// fixme
export type Selector = strings | string;

export interface SharedSuboptions {
  readonly filesToLint?: strings;
  readonly filesToSkip?: strings;
}

export type Suboptions<T extends object> = SharedSuboptions & T;

export type SuboptionsArray<T extends object> = ReadonlyArray<Suboptions<T>>;

export type TypeGroups = readonly TypeGroup[];

export type esRange = readonly [number, number];

export type esRanges = readonly esRange[];
