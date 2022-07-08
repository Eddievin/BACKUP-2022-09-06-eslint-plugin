import type {
  InvalidTestCase as BaseInvalidTestCase,
  ValidTestCase as BaseValidTestCase,
  RuleModule
} from "@typescript-eslint/utils/dist/ts-eslint";
import type { Rec, objects } from "@skylib/functions";
import { TSESLint } from "@typescript-eslint/utils";
import { base } from "./core";
import { s } from "@skylib/functions";

export interface InvalidTestCase<M extends string>
  extends BaseInvalidTestCase<M, readonly [object]> {
  readonly filename?: SourceFile;
  readonly name: string;
}

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
    // eslint-disable-next-line node/no-extraneous-require, unicorn/prefer-module -- Postponed
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
    // eslint-disable-next-line @skylib/custom/no-complex-type-in-function-return
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
    // eslint-disable-next-line @skylib/custom/no-complex-type-in-function-return
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
