import { Checker } from "./Checker";
import { is } from "@skylib/functions";
import type { unknowns } from "@skylib/functions";
import type { RuleModule } from "@typescript-eslint/utils/dist/ts-eslint";
/**
 * Creates rule.
 *
 * @param name - Name.
 * @param isTypeToCheck - Guard.
 * @param readonliness - Readonliness that triggers error.
 * @param messageId - Message ID.
 * @param message - Message.
 * @returns Rule module.
 */
export declare function createRule<M extends string, T extends string>(name: string, isTypeToCheck: is.Guard<T>, readonliness: Checker.Readonliness, messageId: M, message: string): RuleModule<M, unknowns>;
//# sourceMappingURL=no-unnecessary-readonliness.d.ts.map