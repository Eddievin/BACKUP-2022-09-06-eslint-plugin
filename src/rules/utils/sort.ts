/* eslint-disable @skylib/custom/prefer-readonly-array -- Ok */

import { a, as, defineFn, is } from "@skylib/functions";
import type { Context } from "./types";
import { MessageId } from "./sort.internal";
import type { RuleFix } from "@typescript-eslint/utils/dist/ts-eslint";
import type { TSESTree } from "@typescript-eslint/utils";
import { compare } from "./compare";
import { nodeToString } from "./core";
import type { numberU } from "@skylib/functions";

export const sort = defineFn(
  /**
   * Sorts nodes.
   *
   * @param nodes - Nodes.
   * @param keyNode - Finds key node.
   * @param options - Options.
   * @param context - Context.
   */
  <T extends TSESTree.Node>(
    nodes: readonly T[],
    keyNode: (node: T) => TSESTree.Node,
    options: sort.Options,
    context: Context<MessageId, object, object>
  ): void => {
    const { customOrder, sendToBottom, sendToTop } = {
      customOrder: [],
      ...options
    } as const;

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
        key: wrapKey(nodeToString(keyNode(node), context)),
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

    if (fixes.length) {
      const loc = context.getLocFromRange([
        a.get(items, as.not.empty(min)).node.range[0],
        a.get(items, as.not.empty(max)).node.range[1]
      ]);

      if (is.not.empty(options._id))
        context.report({
          data: { _id: options._id },
          fix: () => fixes,
          loc,
          messageId: sort.MessageId.incorrectSortingOrderId
        });
      else
        context.report({
          fix: () => fixes,
          loc,
          messageId: sort.MessageId.incorrectSortingOrder
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
  },
  { MessageId }
);

// eslint-disable-next-line @typescript-eslint/no-redeclare -- Ok
export namespace sort {
  export type MessageId = import("./sort.internal").MessageId;

  export type Options = import("./sort.internal").Options;
}
