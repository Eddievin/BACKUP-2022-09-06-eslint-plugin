import * as utils from "../../utils";
import { a, is } from "@skylib/functions";
import { AST_NODE_TYPES } from "@typescript-eslint/utils";
import type { RuleListener } from "@typescript-eslint/utils/dist/ts-eslint";
import type { TSESTree } from "@typescript-eslint/utils";
import type { strings } from "@skylib/functions";

export interface Options {
  readonly customOrder?: strings;
  readonly key?: string;
  readonly selector: utils.Selector;
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
    { selector: utils.isSelector },
    {
      customOrder: is.strings,
      key: is.string,
      sendToBottom: is.string,
      sendToTop: is.string
    }
  ),
  messages: {
    ...utils.sort.messages,
    [MessageId.expectingArray]: "Expecting array"
  },
  create: (context): RuleListener => {
    const { key, selector: mixed } = context.options;

    const selector = a.fromMixed(mixed).join(", ");

    return {
      [selector]: (node: TSESTree.Node) => {
        if (node.type === AST_NODE_TYPES.ArrayExpression)
          utils.sort(node.elements, context, { ...context.options, keyNode });
        else context.report({ messageId: MessageId.expectingArray, node });
      }
    };

    function keyNode(node: TSESTree.Node): TSESTree.Node | undefined {
      switch (node.type) {
        case AST_NODE_TYPES.ObjectExpression:
          if (is.not.empty(key))
            for (const property of node.properties)
              if (
                property.type === AST_NODE_TYPES.Property &&
                utils.nodeText(property.key, "?") === key
              )
                return property.value;

          return node;

        case AST_NODE_TYPES.SpreadElement:
          return undefined;

        default:
          return node;
      }
    }
  }
});
