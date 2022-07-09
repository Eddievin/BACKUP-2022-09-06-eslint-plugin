import * as utils from "./utils";
import { AST_NODE_TYPES } from "@typescript-eslint/utils";
import type { RuleListener } from "@typescript-eslint/utils/dist/ts-eslint";
import type { TSESTree } from "@typescript-eslint/utils";
import { is } from "@skylib/functions";
import type { strings } from "@skylib/functions";

export const sortArray = utils.createRule({
  name: "sort-array",
  fixable: "code",
  isOptions: is.object.factory<RuleOptions>(
    { selector: is.string },
    {
      customOrder: is.strings,
      key: is.string,
      sendToBottom: is.string,
      sendToTop: is.string
    }
  ),
  messages: {
    expectingArray: "Expecting array",
    incorrectSortingOrder: "Incorrect sorting order"
  },
  create: (context): RuleListener => {
    const { key, selector } = context.options;

    return {
      [selector]: (node: TSESTree.Node): void => {
        if (node.type === AST_NODE_TYPES.ArrayExpression)
          utils.sort(node.elements, nodeToKey, context.options, context);
        else context.report({ messageId: "expectingArray", node });
      }
    };

    function nodeToKey(node: TSESTree.Node): TSESTree.Node {
      if (is.not.empty(key) && node.type === AST_NODE_TYPES.ObjectExpression) {
        const result = node.properties
          .map(property =>
            property.type === AST_NODE_TYPES.Property &&
            utils.nodeToString(property.key, context) === key
              ? property.value
              : undefined
          )
          .find(is.not.empty);

        if (result) return result;
      }

      return node;
    }
  }
});

interface RuleOptions {
  readonly customOrder?: strings;
  readonly key?: string;
  readonly selector: string;
  readonly sendToBottom?: string;
  readonly sendToTop?: string;
}
