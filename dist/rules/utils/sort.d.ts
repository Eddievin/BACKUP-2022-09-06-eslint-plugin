import type { Context } from "./types";
import type { strings } from "@skylib/functions";
import type { TSESTree } from "@typescript-eslint/utils";
export interface SortOptions {
    readonly customOrder?: strings;
    readonly sendToBottom?: string;
    readonly sendToTop?: string;
}
/**
 * Returns string representing node.
 *
 * @param node - Node.
 * @param context - Context.
 * @returns String representing node.
 */
export declare function nodeToString(node: TSESTree.Node, context: Context<never, object, object>): string;
/**
 * Sorts nodes.
 *
 * @param nodes - Nodes.
 * @param nodeToKey - Finds key node.
 * @param options - Options.
 * @param context - Context.
 */
export declare function sort<T extends TSESTree.Node>(nodes: readonly T[], nodeToKey: (node: T) => TSESTree.Node, options: SortOptions, context: Context<"incorrectSortingOrder", object, object>): void;
//# sourceMappingURL=sort.d.ts.map