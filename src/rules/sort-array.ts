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
            utils.sort(
              node.elements,
              subOptions.key,
              subOptions.subOptionsId,
              context
            );
          else throw new Error(`Invalid selector: ${subOptions.selector}`);
        }
      ])
    ),
  fixable: "code",
  isRuleOptions: is.object,
  isSubOptions: is.object.factory<SubOptions>(
    { selector: is.string },
    { key: is.string, subOptionsId: is.string }
  ),
  messages: {
    incorrectSortingOrder: "Incorrect sorting order ({{ subOptionsId }})"
  },
  name: "sort-array"
});

interface SubOptions {
  readonly key?: string;
  readonly selector: string;
  readonly subOptionsId?: string;
}
