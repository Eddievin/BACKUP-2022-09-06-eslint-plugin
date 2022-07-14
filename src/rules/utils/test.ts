/* eslint-disable @skylib/custom/no-literal-union-type -- Ok */

import type {
  InvalidTestCase as BaseInvalidTestCase,
  ValidTestCase as BaseValidTestCase,
  RuleModule,
  TestCaseError
} from "@typescript-eslint/utils/dist/ts-eslint";
import { TSESLint } from "@typescript-eslint/utils";
import { base } from "./core";
import { s } from "@skylib/functions";

export interface InvalidTestCase<M extends string, O extends readonly unknown[]>
  extends BaseInvalidTestCase<M, O> {
  readonly errors: ReadonlyArray<TestCaseError<M>>;
  readonly filename?: SourceFile;
  readonly name: string;
}

export type SourceFile =
  | "camelCase.camelCase.ts"
  | "camelCase.ts"
  | "Component.vue"
  | "file.extras.ts"
  | "kebab-case.kebab-case.ts"
  | "kebab-case.ts"
  | "PascalCase.PascalCase.ts"
  | "PascalCase.ts"
  | "subfolder/index.ts"
  | "vue.d.ts";

export interface ValidTestCase<O extends readonly unknown[]>
  extends BaseValidTestCase<O> {
  readonly filename?: SourceFile;
  readonly name: string;
}

export type ValidTestCases<O extends readonly unknown[]> = ReadonlyArray<
  ValidTestCase<O>
>;

/**
 * Runs test.
 *
 * @param name - Name.
 * @param rule - Rule.
 * @param invalid - Invalid tests.
 * @param valid - Valid tests.
 */
export function testRule<
  K extends string,
  M extends string,
  O extends readonly unknown[]
>(
  name: K,
  rule: RuleModule<M, O>,
  invalid: ReadonlyArray<InvalidTestCase<M, O>>,
  valid: ValidTestCases<O> = []
): void {
  const tester = new TSESLint.RuleTester({
    parser: require.resolve("vue-eslint-parser"),
    parserOptions: {
      ecmaFeatures: { jsx: true },
      ecmaVersion: 2017,
      extraFileExtensions: [".vue"],
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment -- Postponed
      // @ts-expect-error
      parser: "@typescript-eslint/parser",
      project: "./tsconfig.json",
      sourceType: "module",
      tsconfigRootDir: `${base}fixtures`
    }
  });

  tester.run(name, rule, {
    invalid: invalid.map((invalidTest): BaseInvalidTestCase<M, O> => {
      const code = s.unpadMultiline(invalidTest.code);

      const output = s.unpadMultiline(invalidTest.output ?? invalidTest.code);

      const errors = invalidTest.errors.map(
        (error): TestCaseError<M> => ({ endLine: error.line ?? 1, ...error })
      );

      return {
        ...invalidTest,
        code,
        errors,
        filename: `${base}fixtures/${invalidTest.filename ?? "file.ts"}`,
        output
      };
    }),
    valid: valid.map((validTest): BaseValidTestCase<O> => {
      const code = s.unpadMultiline(validTest.code);

      return {
        ...validTest,
        code,
        filename: `${base}fixtures/${validTest.filename ?? "file.ts"}`
      };
    })
  });
}
