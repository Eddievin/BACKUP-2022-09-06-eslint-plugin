import type { CreateRuleOptions } from "./core";
import type { Context } from "./types";
import type { RuleContext } from "@typescript-eslint/utils/dist/ts-eslint";
import type { unknowns } from "@skylib/functions";
/**
 * Creates better context.
 *
 * @param context - Context.
 * @param ruleOptionsArray - Raw rule options array.
 * @param options - Options.
 * @returns Better context.
 */
export declare function createBetterContext<M extends string, O extends object, S extends object, K extends string = never>(context: RuleContext<M, unknowns>, ruleOptionsArray: unknowns, options: CreateRuleOptions<M, O, S, K>): Context<M, O, S>;
//# sourceMappingURL=create-context.d.ts.map