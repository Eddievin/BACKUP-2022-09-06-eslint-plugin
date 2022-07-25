/* eslint-disable @skylib/custom/prefer-readonly-array -- Postponed */

import type { Writable, numberU, stringU, strings } from "@skylib/functions";
import { a, as, defineFn, fn, is } from "@skylib/functions";
import type { Context } from "./types";
import { MessageId } from "./sort.internal";
import type { RuleFix } from "@typescript-eslint/utils/dist/ts-eslint";
import type { TSESTree } from "@typescript-eslint/utils";
import { compare } from "./compare";
import { nodeText } from "./core";

export const sort = defineFn(
  /**
   * Sorts nodes.
   *
   * @param nodes - Nodes.
   * @param context - Context.
   * @param options - Options.
   */
  <T extends TSESTree.Node = TSESTree.Node>(
    nodes: readonly T[],
    context: Context<MessageId, object, object>,
    options: sort.Options<T>
  ): void => {
    const { customOrder, keyNode, sendToBottom, sendToTop, sortingOrder } = {
      customOrder: [],
      // eslint-disable-next-line no-warning-comments -- Wait for @skylib/functions update
      // fixme -- Use fn.never
      keyNode: fn.noop as (node: T) => TSESTree.Node,
      sortingOrder: (node: T): stringU => {
        const node2 = keyNode(node);

        if (node2) {
          const key = nodeText(node2, () => `\u0001${context.getText(node2)}`);

          const index = customOrder.indexOf(key);

          if (index >= 0) return `${1000 + index}:${key}`;

          if (sendToTopRe && sendToTopRe.test(key)) return `2001:${key}`;

          if (sendToBottomRe && sendToBottomRe.test(key)) return `2003:${key}`;

          return `2002:${key}`;
        }

        return undefined;
      },
      ...options
    } as const;

    const sendToTopRe = is.not.empty(sendToTop)
      ? // eslint-disable-next-line security/detect-non-literal-regexp -- Postponed
        new RegExp(sendToTop, "u")
      : undefined;

    const sendToBottomRe = is.not.empty(sendToBottom)
      ? // eslint-disable-next-line security/detect-non-literal-regexp -- Postponed
        new RegExp(sendToBottom, "u")
      : undefined;

    const items: Writable<Items> = [];

    for (const node of nodes) {
      const key = sortingOrder(node);

      if (is.not.empty(key)) items.push({ index: 0, key, node });
      else {
        sortGroup(items, options, context);
        a.truncate(items);
      }
    }

    sortGroup(items, options, context);
  },
  {
    MessageId,
    messages: {
      [MessageId.incorrectSortingOrder]: "Incorrect sorting order",
      [MessageId.incorrectSortingOrderId]: "Incorrect sorting order ({{_id}})"
    }
  }
);

// eslint-disable-next-line @typescript-eslint/no-redeclare -- Postponed
export namespace sort {
  export type MessageId = import("./sort.internal").MessageId;

  export interface Options<T extends TSESTree.Node = TSESTree.Node> {
    readonly _id?: string;
    readonly customOrder?: strings;
    // eslint-disable-next-line @skylib/require-jsdoc -- Postponed
    readonly keyNode?: (node: T) => TSESTree.Node | undefined;
    readonly sendToBottom?: string;
    readonly sendToTop?: string;
    // eslint-disable-next-line @skylib/require-jsdoc -- Postponed
    readonly sortingOrder?: (node: T) => stringU;
  }
}

interface Item {
  readonly index: number;
  readonly key: string;
  readonly node: TSESTree.Node;
}

type Items = readonly Item[];

// eslint-disable-next-line @skylib/require-jsdoc -- Ppstponed
function sortGroup<T extends TSESTree.Node = TSESTree.Node>(
  items: Items,
  options: sort.Options<T>,
  context: Context<MessageId, object, object>
): void {
  if (items.length >= 2) {
    items = items.map((item, index): Item => ({ ...item, index }));

    const { _id } = options;

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
          range: context.getFullRange(item.node),
          text: context.getFullText(sortedItem.node)
        });
      }

    if (fixes.length) {
      const loc = context.getLoc([
        a.get(items, as.not.empty(min)).node.range[0],
        a.get(items, as.not.empty(max)).node.range[1]
      ]);

      if (is.not.empty(_id))
        context.report({
          data: { _id },
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
  }
}
