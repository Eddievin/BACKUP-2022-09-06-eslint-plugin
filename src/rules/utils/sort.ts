/* eslint-disable @skylib/no-restricted-syntax/prefer-readonly-array -- Ok */

import { a, as, cast, is } from "@skylib/functions";
import * as _ from "@skylib/lodash-commonjs-es";
import { AST_NODE_TYPES } from "@typescript-eslint/utils";
import type { Context, SortOptions } from "./types";
import type { numberU } from "@skylib/functions";
import type { TSESTree } from "@typescript-eslint/utils";
import type { RuleFix } from "@typescript-eslint/utils/dist/ts-eslint";

/**
 * Sorts nodes.
 *
 * @param nodes - Nodes.
 * @param options - Options.
 * @param context - Context.
 */
export function sort(
  nodes: readonly TSESTree.Node[],
  options: SortOptions,
  context: Context<"incorrectSortingOrder", object, object>
): void {
  const sendToBottom = is.not.empty(options.sendToBottom)
    ? // eslint-disable-next-line security/detect-non-literal-regexp -- Ok
      new RegExp(options.sendToBottom, "u")
    : undefined;

  const sendToTop = is.not.empty(options.sendToTop)
    ? // eslint-disable-next-line security/detect-non-literal-regexp -- Ok
      new RegExp(options.sendToTop, "u")
    : undefined;

  const items = nodes.map<Item>((node, index) => {
    switch (node.type) {
      case AST_NODE_TYPES.ObjectExpression: {
        return {
          index,
          key: wrapKey(
            node.properties
              .map(property => {
                switch (property.type) {
                  case AST_NODE_TYPES.Property:
                    return nodeToString(property.key, context) === options.key
                      ? nodeToString(property.value, context)
                      : undefined;

                  default:
                    return undefined;
                }
              })
              .find(is.string) ?? nodeToString(node, context)
          ),
          node
        };
      }

      default:
        return {
          index,
          key: wrapKey(nodeToString(node, context)),
          node
        };
    }
  });

  const sortedItems = _.sortBy(items, item => item.key);

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
    readonly key: unknown;
    readonly node: TSESTree.Node;
  }

  function wrapKey(key: string): string {
    if (sendToTop && sendToTop.test(key)) return `1:${key}`;

    if (sendToBottom && sendToBottom.test(key)) return `3:${key}`;

    return `2:${key}`;
  }
}

/**
 * Returns string representing node.
 *
 * @param node - Node.
 * @param context - Context.
 * @returns String representing node.
 */
function nodeToString(
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
