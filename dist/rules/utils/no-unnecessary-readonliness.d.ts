import type { RuleModule } from "@typescript-eslint/experimental-utils/dist/ts-eslint";
import * as is from "@typerock/functions/dist/guards";
import type { Readonliness } from "./readonliness";
/**
 * Creates rule.
 *
 * @param isTypeToCheck - Guard.
 * @param readonliness - Readonliness that triggers error.
 * @param messageId - Message ID.
 * @param message - Message.
 * @returns Rule module.
 */
export declare function createRule<M extends string, T extends string>(isTypeToCheck: is.Guard<T>, readonliness: Readonliness, messageId: M, message: string): RuleModule<M, readonly unknown[]>;
//# sourceMappingURL=no-unnecessary-readonliness.d.ts.map