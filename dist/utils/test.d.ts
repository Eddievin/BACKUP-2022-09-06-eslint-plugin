import type { InvalidTestCase as BaseInvalidTestCase, TestCaseError as BaseTestCaseError, ValidTestCase as BaseValidTestCase, RuleModule } from "@typescript-eslint/utils/dist/ts-eslint";
import type { Rec, unknowns } from "@skylib/functions";
export interface InvalidTestCase<M extends string, O extends readonly unknown[]> extends BaseInvalidTestCase<M, O> {
    readonly errors: ReadonlyArray<TestCaseError<M>>;
    readonly filename?: SourceFile;
    readonly name: string;
}
export declare type SourceFile = "camelCase.camelCase.ts" | "camelCase.ts" | "Component.vue" | "file.extras.ts" | "kebab-case.kebab-case.ts" | "kebab-case.ts" | "PascalCase.PascalCase.ts" | "PascalCase.ts" | "subfolder/index.ts" | "vue.d.ts";
export interface TestCaseError<T extends string> extends BaseTestCaseError<T> {
    readonly line: number;
}
export interface ValidTestCase<O extends readonly unknown[]> extends BaseValidTestCase<O> {
    readonly filename?: SourceFile;
    readonly name: string;
}
export declare type ValidTestCases<O extends readonly unknown[]> = ReadonlyArray<ValidTestCase<O>>;
/**
 * Gets MessageId enum from rule.
 *
 * @param rule - Rule.
 * @returns MessageId enum.
 */
export declare function getMessageId<T extends string>(rule: RuleModule<T, unknowns>): Rec<T, T>;
/**
 * Runs test.
 *
 * @param name - Name.
 * @param rule - Rule.
 * @param invalid - Invalid tests.
 * @param valid - Valid tests.
 */
export declare function testRule<K extends string, M extends string, O extends readonly unknown[]>(name: K, rule: RuleModule<M, O>, invalid: ReadonlyArray<InvalidTestCase<M, O>>, valid?: ValidTestCases<O>): void;
//# sourceMappingURL=test.d.ts.map