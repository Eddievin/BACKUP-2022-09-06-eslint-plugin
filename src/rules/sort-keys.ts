import * as utils from "./utils";
import type { Writable, strings } from "@skylib/functions";
import { a, is, o } from "@skylib/functions";
import { AST_NODE_TYPES } from "@typescript-eslint/utils";
import type { RuleListener } from "@typescript-eslint/utils/dist/ts-eslint";
import type { TSESTree } from "@typescript-eslint/utils";

export const sortKeys = utils.createRule({
  create: (context): RuleListener => {
    const items = new Map<string, Item>();

    const nodes: Writable<Nodes> = [];

    const listener: RuleListener = {
      [AST_NODE_TYPES.ObjectExpression]: (node): void => {
        items.set(utils.getNodeId(node), { node, options: { _id: "__main" } });
      },
      "Program:exit": (): void => {
        for (const item of items.values()) {
          for (const property of item.node.properties)
            if (property.type === AST_NODE_TYPES.SpreadElement)
              flush(item.options);
            else nodes.push(property);

          flush(item.options);
        }
      },
      ...o.fromEntries(
        context.subOptionsArray.map(subOptions => [
          a.fromMixed(subOptions.selector).join(", "),
          (node: TSESTree.Node): void => {
            if (node.type === AST_NODE_TYPES.ObjectExpression)
              items.set(utils.getNodeId(node), { node, options: subOptions });
            else
              context.report({
                data: { _id: subOptions._id },
                messageId: "expectingObject",
                node
              });
          }
        ])
      )
    };

    // eslint-disable-next-line @typescript-eslint/no-unsafe-return -- Postponed
    return context.defineTemplateBodyVisitor(listener, listener);

    function flush(options: utils.SortOptions): void {
      utils.sort(nodes, nodeToKey, options, context);
      a.truncate(nodes);
    }

    function nodeToKey(node: Node): TSESTree.Node {
      return node.key;
    }
  },
  fixable: "code",
  isRuleOptions: is.object,
  isSubOptions: is.object.factory<SubOptions>(
    { _id: is.string, selector: is.or.factory(is.string, is.strings) },
    {
      customOrder: is.strings,
      sendToBottom: is.string,
      sendToTop: is.string
    }
  ),
  messages: {
    expectingObject: "Expecting object ({{ _id }})",
    incorrectSortingOrder: "Incorrect sorting order"
  },
  name: "sort-keys",
  subOptionsKey: "overrides"
});

interface Item {
  readonly node: TSESTree.ObjectExpression;
  readonly options: Omit<SubOptions, "selector">;
}

type Node = TSESTree.MethodDefinition | TSESTree.Property;

type Nodes = readonly Node[];

interface SubOptions {
  readonly _id: string;
  readonly customOrder?: strings;
  readonly selector: strings | string;
  readonly sendToBottom?: string;
  readonly sendToTop?: string;
}
