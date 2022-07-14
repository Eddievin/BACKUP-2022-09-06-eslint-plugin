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
    {
      customOrder: is.strings,
      sendToBottom: is.string,
      sendToTop: is.string
    }
  ),
  subOptionsKey: "overrides",
  messages: {
    [MessageId.expectingObject]: "Expecting object ({{ _id }})",
    [utils.sort.MessageId.incorrectSortingOrder]: "Incorrect sorting order",
    [utils.sort.MessageId.incorrectSortingOrderId]:
      "Incorrect sorting order ({{ _id }})"
  },
  create: (context): RuleListener => {
    const objectExpressions = new Map<string, ObjectExpression>();

    const objectMembers: Writable<ObjectMembers> = [];

    return {
      "ObjectExpression": (node): void => {
        objectExpressions.set(utils.getNodeId(node), { node, options: {} });
      },
      "Program:exit": (): void => {
        for (const objectExpression of objectExpressions.values()) {
          for (const property of objectExpression.node.properties)
            if (property.type === AST_NODE_TYPES.SpreadElement)
              lintNodes(objectExpression.options);
            else objectMembers.push(property);

          lintNodes(objectExpression.options);
        }
      },
      ...o.fromEntries(
        context.subOptionsArray.map(subOptions => [
          a.fromMixed(subOptions.selector).join(", "),
          (node: TSESTree.Node): void => {
            if (node.type === AST_NODE_TYPES.ObjectExpression)
              objectExpressions.set(utils.getNodeId(node), {
                node,
                options: subOptions
              });
            else
              context.report({
                data: { _id: subOptions._id },
                messageId: MessageId.expectingObject,
                node
              });
          }
        ])
      )
    };

    function keyNode(node: ObjectMember): TSESTree.Node {
      return node.key;
    }

    function lintNodes(options: utils.sort.Options): void {
      utils.sort(objectMembers, keyNode, options, context);
      a.truncate(objectMembers);
    }
  }
});

interface ObjectExpression {
  readonly node: TSESTree.ObjectExpression;
  readonly options: utils.sort.Options;
}

type ObjectMember = TSESTree.MethodDefinition | TSESTree.Property;

type ObjectMembers = readonly ObjectMember[];
