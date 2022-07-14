import * as utils from "./utils";
import { is, o } from "@skylib/functions";
import { AST_NODE_TYPES } from "@typescript-eslint/utils";
import type { RuleListener } from "@typescript-eslint/utils/dist/ts-eslint";
import type { TSESTree } from "@typescript-eslint/utils";
import type { strings } from "@skylib/functions";

export interface Options {
  readonly customOrder?: strings;
  readonly key?: string;
  readonly selector: string;
  readonly sendToBottom?: string;
  readonly sendToTop?: string;
}

export enum MessageId {
  expectingArray = "expectingArray"
}

export const sortArray = utils.createRule({
  name: "sort-array",
  fixable: utils.Fixable.code,
  vue: true,
  isOptions: is.object.factory<Options>(
    { selector: is.string },
    {
      customOrder: is.strings,
      key: is.string,
      sendToBottom: is.string,
      sendToTop: is.string
    }
  ),
  messages: {
    [MessageId.expectingArray]: "Expecting array expression",
    [utils.sort.MessageId.incorrectSortingOrder]: "Incorrect sorting order",
    [utils.sort.MessageId.incorrectSortingOrderId]:
      "Incorrect sorting order ({{ _id }})"
  },
  create: (context): RuleListener => {
    const { customOrder, key, selector, sendToBottom, sendToTop } =
      context.options;

    return {
      [selector]: (node: TSESTree.Node): void => {
        if (node.type === AST_NODE_TYPES.ArrayExpression)
          utils.sort(
            node.elements,
            keyNode,
            o.removeUndefinedKeys({
              customOrder,
              sendToBottom,
              sendToTop
            }),
            context
          );
        else context.report({ messageId: MessageId.expectingArray, node });
      }
    };

    function keyNode(node: TSESTree.Node): TSESTree.Node {
      if (is.not.empty(key) && node.type === AST_NODE_TYPES.ObjectExpression)
        for (const property of node.properties)
          if (
            property.type === AST_NODE_TYPES.Property &&
            utils.nodeToString(property.key, context) === key
          )
            return property.value;

      return node;
    }
  }
});
