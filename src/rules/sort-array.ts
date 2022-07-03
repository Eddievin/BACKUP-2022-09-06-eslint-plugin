import * as utils from "./utils";
import { is, o } from "@skylib/functions";
import { AST_NODE_TYPES } from "@typescript-eslint/utils";
import type { TSESTree } from "@typescript-eslint/utils";

export const sortArray = utils.createRule({
  create: context =>
    o.fromEntries(
      context.subOptionsArray.map(subOptions => [
        subOptions.selector,
        (node: TSESTree.Node): void => {
          if (node.type === AST_NODE_TYPES.ArrayExpression)
            utils.sort(node.elements, subOptions, context);
          else
            context.report({
              data: { _id: subOptions._id },
              messageId: "expectingArray",
              node
            });
        }
      ])
    ),
  fixable: "code",
  isRuleOptions: is.object,
  isSubOptions: is.object.factory<SubOptions>(
    { _id: is.string, selector: is.string },
    {
      key: is.string,
      sendToBottom: is.string,
      sendToTop: is.string
    }
  ),
  messages: {
    expectingArray: "Expecting array ({{ _id }})",
    incorrectSortingOrder: "Incorrect sorting order ({{ _id }})"
  },
  name: "sort-array"
});

interface SubOptions {
  readonly _id: string;
  readonly key?: string;
  readonly selector: string;
  readonly sendToBottom?: string;
  readonly sendToTop?: string;
}
