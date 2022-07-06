import type { Rec, objects } from "@skylib/functions";
import type { InvalidTestCase as BaseInvalidTestCase, ValidTestCase as BaseValidTestCase, RuleModule } from "@typescript-eslint/utils/dist/ts-eslint";
export interface InvalidTestCase<M extends string> extends BaseInvalidTestCase<M, readonly [object]> {
    readonly filename?: SourceFile;
    readonly name: string;
}
export declare type SourceFile = "camelCase.camelCase.ts" | "camelCase.ts" | "file.extras.ts" | "kebab-case.kebab-case.ts" | "kebab-case.ts" | "PascalCase.PascalCase.ts" | "PascalCase.ts" | "subfolder/index.ts" | "vue.d.ts";
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
export declare function testRule<K extends string, M extends string>(name: K, rules: Rec<K, RuleModule<M, objects>>, invalid: ReadonlyArray<InvalidTestCase<M>>, valid?: readonly ValidTestCase[]): void;
//# sourceMappingURL=test.d.ts.map