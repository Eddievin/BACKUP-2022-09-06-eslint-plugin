import * as utils from "./utils";
import { is } from "@skylib/functions";
import { AST_NODE_TYPES } from "@typescript-eslint/utils";
import type { TSESTree } from "@typescript-eslint/utils";

export const sortArray = utils.createRule({
  create: context => {
    return {
      [context.options.selector]: (node: TSESTree.Node): void => {
        if (node.type === AST_NODE_TYPES.ArrayExpression)
          utils.sort(node.elements, context.options, context);
        else context.report({ messageId: "expectingArray", node });
      }
    };
  },
  fixable: "code",
  isRuleOptions: is.object.factory<RuleOptions>(
    { selector: is.string },
    {
      key: is.string,
      sendToBottom: is.string,
      sendToTop: is.string
    }
  ),
  messages: {
    expectingArray: "Expecting array",
    incorrectSortingOrder: "Incorrect sorting order"
  },
  name: "sort-array"
});

interface RuleOptions {
  readonly key?: string;
  readonly selector: string;
  readonly sendToBottom?: string;
  readonly sendToTop?: string;
}
