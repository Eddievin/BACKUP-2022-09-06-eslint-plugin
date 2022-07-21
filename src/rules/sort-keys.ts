import * as _ from "@skylib/lodash-commonjs-es";
import * as utils from "./utils";
import type { Writable, strings } from "@skylib/functions";
import { a, is, o } from "@skylib/functions";
import { AST_NODE_TYPES } from "@typescript-eslint/utils";
import type { RuleListener } from "@typescript-eslint/utils/dist/ts-eslint";
import type { TSESTree } from "@typescript-eslint/utils";

export interface SubOptions {
  readonly _id: string;
  readonly customOrder?: strings;
  readonly selector: utils.Selector;
  readonly sendToBottom?: string;
  readonly sendToTop?: string;
}

export enum MessageId {
  expectingObject = "expectingObject"
}

export const sortKeys = utils.createRule({
  name: "sort-keys",
  fixable: utils.Fixable.code,
  vue: true,
  isSubOptions: is.object.factory<SubOptions>(
    { _id: is.string, selector: utils.isSelector },
    { customOrder: is.strings, sendToBottom: is.string, sendToTop: is.string }
  ),
  subOptionsKey: "overrides",
  messages: {
    [MessageId.expectingObject]: "Expecting object ({{ _id }})",
    [utils.sort.MessageId.incorrectSortingOrder]: "Incorrect sorting order",
    [utils.sort.MessageId.incorrectSortingOrderId]:
      "Incorrect sorting order ({{ _id }})"
  },
  create: (context, typeCheck): RuleListener => {
    const items: Writable<Items> = [];

    return {
      ...o.fromEntries(
        context.subOptionsArray.map(subOptions => [
          a.fromMixed(subOptions.selector).join(", "),
          (node: TSESTree.Node): void => {
            if (node.type === AST_NODE_TYPES.ObjectExpression)
              items.push({ node, options: { ...subOptions, keyNode } });
            else
              context.report({
                data: { _id: subOptions._id },
                messageId: MessageId.expectingObject,
                node
              });
          }
        ])
      ),
      "ObjectExpression": (node): void => {
        items.push({ node, options: { keyNode } });
      },
      "Program:exit": (): void => {
        const sortedItems = a.sort(items, (item1, item2) =>
          utils.compare(item2.options._id, item1.options._id)
        );

        const uniqItems = _.uniqBy(sortedItems, "node");

        for (const item of uniqItems)
          utils.sort(item.node.properties, context, typeCheck, item.options);
      }
    };

    function keyNode(node: ObjectMember): TSESTree.Node | undefined {
      return node.type === AST_NODE_TYPES.SpreadElement ? undefined : node.key;
    }
  }
});

interface Item {
  readonly node: TSESTree.ObjectExpression;
  readonly options: utils.sort.Options<ObjectMember>;
}

type Items = readonly Item[];

type ObjectMember =
  | TSESTree.MethodDefinition
  | TSESTree.Property
  | TSESTree.SpreadElement;
