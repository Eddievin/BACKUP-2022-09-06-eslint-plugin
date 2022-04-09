import * as _ from "lodash";
import type { TSESTree } from "@typescript-eslint/utils";
import { AST_NODE_TYPES } from "@typescript-eslint/utils";
import type { RuleFix } from "@typescript-eslint/utils/dist/ts-eslint";

import * as a from "@skylib/functions/dist/array";
import * as arrayMap from "@skylib/functions/dist/arrayMap";
import * as assert from "@skylib/functions/dist/assertions";
import * as fn from "@skylib/functions/dist/function";
import * as is from "@skylib/functions/dist/guards";
import { createValidationObject } from "@skylib/functions/dist/helpers";
import * as o from "@skylib/functions/dist/object";
import type { Rec, Writable } from "@skylib/functions/dist/types/core";

import * as utils from "./utils";

const NodeTypeVO = createValidationObject<NodeType>({
  ExportDeclaration: "ExportDeclaration",
  ExportDefaultDeclaration: "ExportDefaultDeclaration",
  ExportFunctionDeclaration: "ExportFunctionDeclaration",
  ExportTypeDeclaration: "ExportTypeDeclaration",
  ExportUnknown: "ExportUnknown",
  FunctionDeclaration: "FunctionDeclaration",
  ImportDeclaration: "ImportDeclaration",
  ModuleDeclaration: "ModuleDeclaration",
  TypeDeclaration: "TypeDeclaration",
  Unknown: "Unknown"
});

const isNodeType = is.factory(is.enumeration, NodeTypeVO);

const isNodeTypes = is.factory(is.array.of, isNodeType);

const isRuleOptions = is.object.factory<RuleOptions>(
  {
    blockOrder: isNodeTypes,
    moduleOrder: isNodeTypes,
    order: isNodeTypes,
    rootOrder: isNodeTypes
  },
  {}
);

const rule = utils.createRule({
  create(context) {
    const blockOrder: Rec<NodeType, number> = {
      ...defaultOrder,
      ...o.fromEntries(
        context.options.order.map((type, index) => [type, index])
      ),
      ...o.fromEntries(
        context.options.blockOrder.map((type, index) => [type, index])
      )
    };

    const moduleOrder: Rec<NodeType, number> = {
      ...defaultOrder,
      ...o.fromEntries(
        context.options.order.map((type, index) => [type, index])
      ),
      ...o.fromEntries(
        context.options.moduleOrder.map((type, index) => [type, index])
      )
    };

    const rootOrder: Rec<NodeType, number> = {
      ...defaultOrder,
      ...o.fromEntries(
        context.options.order.map((type, index) => [type, index])
      ),
      ...o.fromEntries(
        context.options.rootOrder.map((type, index) => [type, index])
      )
    };

    const itemsMap = new Map<string, Writable<Items>>();

    return {
      "*"(node: TSESTree.Node): void {
        if (node.parent) {
          const id = utils.getNodeId(node.parent);

          const index = arrayMap.get(id, itemsMap).length;

          const parentNode = node.parent;

          const order = fn.run(() => {
            switch (parentNode.type) {
              case "BlockStatement":
                return blockOrder;

              case "Program":
                return rootOrder;

              case "TSModuleBlock":
                return moduleOrder;

              default:
                return undefined;
            }
          });

          if (order)
            arrayMap.push(
              id,
              nodeInfo(node, parentNode, index, order, false),
              itemsMap
            );
        }
      },
      "Program:exit"(): void {
        for (const items of itemsMap.values()) {
          const sortedItems = _.sortBy(items, node => node.sortingOrder);

          const fixes: RuleFix[] = [];

          for (const [index, sortedItem] of sortedItems.entries())
            if (sortedItem.index !== index) {
              const item = a.get(items, index);

              fixes.push({
                range: context.getRangeWithLeadingTrivia(item.node),
                text: context.getTextWithLeadingTrivia(sortedItem.node)
              });
            }

          if (fixes.length)
            context.report({
              fix: () => fixes,
              messageId: "incorrectStatementsOrder",
              node: a.first(items).parentNode
            });
        }
      }
    };
  },
  defaultOptions: {
    blockOrder: [],
    moduleOrder: [],
    order: [],
    rootOrder: []
  },
  fixable: "code",
  isRuleOptions,
  messages: { incorrectStatementsOrder: "Incorrect statements order" }
});

export = rule;

const defaultOrder: Rec<NodeType, number> = {
  ExportDeclaration: 1003,
  ExportDefaultDeclaration: 1002,
  ExportFunctionDeclaration: 1006,
  ExportTypeDeclaration: 1005,
  ExportUnknown: 1004,
  FunctionDeclaration: 1009,
  ImportDeclaration: 1000,
  ModuleDeclaration: 1001,
  TypeDeclaration: 1008,
  Unknown: 1007
};

const sortable: Rec<NodeType, boolean> = {
  ExportDeclaration: true,
  ExportDefaultDeclaration: false,
  ExportFunctionDeclaration: true,
  ExportTypeDeclaration: true,
  ExportUnknown: false,
  FunctionDeclaration: true,
  ImportDeclaration: false,
  ModuleDeclaration: false,
  TypeDeclaration: true,
  Unknown: false
};

interface Item {
  readonly id: string;
  readonly index: number;
  readonly node: TSESTree.Node;
  readonly order: Rec<NodeType, number>;
  readonly parentNode: TSESTree.Node;
  readonly sortingOrder: string;
  readonly type: NodeType;
}

type Items = readonly Item[];

type NodeType =
  | "ExportDeclaration"
  | "ExportDefaultDeclaration"
  | "ExportFunctionDeclaration"
  | "ExportTypeDeclaration"
  | "ExportUnknown"
  | "FunctionDeclaration"
  | "ImportDeclaration"
  | "ModuleDeclaration"
  | "TypeDeclaration"
  | "Unknown";

type NodeTypes = readonly NodeType[];

interface RuleOptions {
  readonly blockOrder: NodeTypes;
  readonly moduleOrder: NodeTypes;
  readonly order: NodeTypes;
  readonly rootOrder: NodeTypes;
}

/**
 * Returns node info.
 *
 * @param node - Node.
 * @param parentNode - Parent node.
 * @param index - Index.
 * @param order - Order.
 * @param exportDeclaration - Inside export declaration.
 * @returns Node info.
 */
function nodeInfo(
  node: TSESTree.Node,
  parentNode: TSESTree.Node,
  index: number,
  order: Rec<NodeType, number>,
  exportDeclaration: boolean
): Item {
  switch (node.type) {
    case AST_NODE_TYPES.ExportNamedDeclaration: {
      if (node.declaration) {
        const info = nodeInfo(node.declaration, parentNode, index, order, true);

        return buildResult(info.type, info.id);
      }

      return buildResult("ExportDeclaration");
    }

    case AST_NODE_TYPES.ExportDefaultDeclaration:
      return buildResult("ExportDefaultDeclaration");

    case AST_NODE_TYPES.FunctionDeclaration:
    case AST_NODE_TYPES.TSDeclareFunction:
      assert.not.empty(node.id);

      return buildResult(
        exportDeclaration ? "ExportFunctionDeclaration" : "FunctionDeclaration",
        node.id.name
      );

    case AST_NODE_TYPES.ImportDeclaration:
      return buildResult("ImportDeclaration");

    case AST_NODE_TYPES.TSInterfaceDeclaration:
    case AST_NODE_TYPES.TSTypeAliasDeclaration:
      return buildResult(
        exportDeclaration ? "ExportTypeDeclaration" : "TypeDeclaration",
        node.id.name
      );

    case AST_NODE_TYPES.TSModuleDeclaration:
      return buildResult("ModuleDeclaration");

    default:
      return buildResult(exportDeclaration ? "ExportUnknown" : "Unknown");
  }

  function buildResult(type: NodeType, id = "~"): Item {
    const order1 = order[type];

    const order2 = sortable[type] ? id : "~";

    const order3 = 1_000_000 + node.range[0];

    return {
      id,
      index,
      node,
      order,
      parentNode,
      sortingOrder: `${order1} ${order2} ${order3}`,
      type
    };
  }
}
