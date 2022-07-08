/* eslint-disable @skylib/primary-export-only */

/* eslint-disable @skylib/custom/prefer-readonly-array -- Ok */

import { a, as, cast, is } from "@skylib/functions";
import type { numberU, strings } from "@skylib/functions";
import { AST_NODE_TYPES } from "@typescript-eslint/utils";
import type { Context } from "./types";
import type { RuleFix } from "@typescript-eslint/utils/dist/ts-eslint";
import type { TSESTree } from "@typescript-eslint/utils";
import { compare } from "./compare";

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
export function nodeToString(
  node: TSESTree.Node,
  context: Context<never, object, object>
): string {
  switch (node.type) {
    case AST_NODE_TYPES.Identifier:
      return node.name;

    case AST_NODE_TYPES.Literal:
      return cast.string(node.value);

    default:
      return `\u0000${context.getText(node)}`;
  }
}

/**
 * Sorts nodes.
 *
 * @param nodes - Nodes.
 * @param nodeToKey - Finds key node.
 * @param options - Options.
 * @param context - Context.
 */
export function sort<T extends TSESTree.Node>(
  nodes: readonly T[],
  nodeToKey: (node: T) => TSESTree.Node,
  options: SortOptions,
  context: Context<"incorrectSortingOrder", object, object>
): void {
  // eslint-disable-next-line @skylib/custom/prefer-const-object -- Wait for @skylib/config update
  const { customOrder, sendToBottom, sendToTop } = {
    customOrder: [],
    ...options
  };

  const sendToTopRe = is.not.empty(sendToTop)
    ? // eslint-disable-next-line security/detect-non-literal-regexp -- Ok
      new RegExp(sendToTop, "u")
    : undefined;

  const sendToBottomRe = is.not.empty(sendToBottom)
    ? // eslint-disable-next-line security/detect-non-literal-regexp -- Ok
      new RegExp(sendToBottom, "u")
    : undefined;

  const items = nodes.map(
    (node, index): Item => ({
      index,
      key: wrapKey(nodeToString(nodeToKey(node), context)),
      node
    })
  );

  const sortedItems = a.sort(items, (item1, item2) =>
    compare(item1.key, item2.key)
  );

  const fixes: RuleFix[] = [];

  let min: numberU;

  let max: numberU;

  for (const [index, sortedItem] of sortedItems.entries())
    if (sortedItem.index === index) {
      // Valid
    } else {
      const item = a.get(items, index);

      min = is.not.empty(min) ? Math.min(min, index) : index;
      max = is.not.empty(max) ? Math.max(max, index) : index;
      fixes.push({
        range: context.getRangeWithLeadingTrivia(item.node),
        text: context.getTextWithLeadingTrivia(sortedItem.node)
      });
    }

  if (fixes.length > 0) {
    const loc = context.getLocFromRange([
      a.get(items, as.not.empty(min)).node.range[0],
      a.get(items, as.not.empty(max)).node.range[1]
    ]);

    context.report({
      fix: () => fixes,
      loc,
      messageId: "incorrectSortingOrder"
    });
  }

  interface Item {
    readonly index: number;
    readonly key: string;
    readonly node: TSESTree.Node;
  }

  function wrapKey(key: string): string {
    const index = customOrder.indexOf(key);

    if (index >= 0) return `${1000 + index}:${key}`;

    if (sendToTopRe && sendToTopRe.test(key)) return `2001:${key}`;

    if (sendToBottomRe && sendToBottomRe.test(key)) return `2003:${key}`;

    return `2002:${key}`;
  }
}
