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
import type { Rec, stringU, Writable } from "@skylib/functions/dist/types/core";

import * as utils from "./utils";

const NodeTypeVO = createValidationObject<NodeType>({
  ExportDeclaration: "ExportDeclaration",
  ExportDefaultDeclaration: "ExportDefaultDeclaration",
  ExportFunctionDeclaration: "ExportFunctionDeclaration",
  ExportModuleDeclaration: "ExportModuleDeclaration",
  ExportTypeDeclaration: "ExportTypeDeclaration",
  ExportUnknown: "ExportUnknown",
  FunctionDeclaration: "FunctionDeclaration",
  GlobalModuleDeclaration: "GlobalModuleDeclaration",
  ImportDeclaration: "ImportDeclaration",
  JestTest: "JestTest",
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
              nodeInfo(node, parentNode, index, order),
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
  messages: { incorrectStatementsOrder: "Incorrect statements order" },
  name: "statements-order"
});

export = rule;

const defaultOrder: Rec<NodeType, number> = {
  ExportDeclaration: 1003,
  ExportDefaultDeclaration: 1004,
  ExportFunctionDeclaration: 1007,
  ExportModuleDeclaration: 1008,
  ExportTypeDeclaration: 1006,
  ExportUnknown: 1005,
  FunctionDeclaration: 1011,
  GlobalModuleDeclaration: 1002,
  ImportDeclaration: 1001,
  JestTest: 1013,
  ModuleDeclaration: 1012,
  TypeDeclaration: 1010,
  Unknown: 1009
};

const sortable: Rec<NodeType, boolean> = {
  ExportDeclaration: true,
  ExportDefaultDeclaration: false,
  ExportFunctionDeclaration: true,
  ExportModuleDeclaration: false,
  ExportTypeDeclaration: true,
  ExportUnknown: false,
  FunctionDeclaration: true,
  GlobalModuleDeclaration: false,
  ImportDeclaration: false,
  JestTest: true,
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
  | "ExportModuleDeclaration"
  | "ExportTypeDeclaration"
  | "ExportUnknown"
  | "FunctionDeclaration"
  | "GlobalModuleDeclaration"
  | "ImportDeclaration"
  | "JestTest"
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
 * Returns Jest test name.
 *
 * @param node - Node.
 * @returns Jest test name if node is Jest test, _undefined_ otherwise.
 */
function getJestTestName(node: TSESTree.ExpressionStatement): stringU {
  if (node.expression.type === AST_NODE_TYPES.CallExpression) {
    const argument = node.expression.arguments[0];

    if (
      argument &&
      argument.type === AST_NODE_TYPES.Literal &&
      is.string(argument.value)
    ) {
      const callee = node.expression.callee;

      if (callee.type === AST_NODE_TYPES.Identifier && callee.name === "test")
        return argument.value;

      if (
        callee.type === AST_NODE_TYPES.CallExpression &&
        callee.callee.type === AST_NODE_TYPES.MemberExpression &&
        callee.callee.object.type === AST_NODE_TYPES.Identifier &&
        callee.callee.object.name === "test" &&
        callee.callee.property.type === AST_NODE_TYPES.Identifier &&
        callee.callee.property.name === "each"
      )
        return argument.value;
    }
  }

  return undefined;
}

/**
 * Returns node info.
 *
 * @param node - Node.
 * @param parentNode - Parent node.
 * @param index - Index.
 * @param order - Order.
 * @returns Node info.
 */
function nodeInfo(
  node: TSESTree.Node,
  parentNode: TSESTree.Node,
  index: number,
  order: Rec<NodeType, number>
): Item {
  switch (node.type) {
    case AST_NODE_TYPES.ExportDefaultDeclaration:
      return buildResult("ExportDefaultDeclaration");

    case AST_NODE_TYPES.ExportNamedDeclaration: {
      if (node.declaration)
        switch (node.declaration.type) {
          case AST_NODE_TYPES.FunctionDeclaration:
          case AST_NODE_TYPES.TSDeclareFunction:
            assert.not.empty(node.declaration.id);

            return buildResult(
              "ExportFunctionDeclaration",
              node.declaration.id.name
            );

          case AST_NODE_TYPES.TSInterfaceDeclaration:
          case AST_NODE_TYPES.TSTypeAliasDeclaration:
            return buildResult(
              "ExportTypeDeclaration",
              node.declaration.id.name
            );

          case AST_NODE_TYPES.TSModuleDeclaration:
            return buildResult("ExportModuleDeclaration");

          default:
            return buildResult("ExportUnknown");
        }

      return buildResult("ExportDeclaration");
    }

    case AST_NODE_TYPES.ExpressionStatement:
      {
        const id = getJestTestName(node);

        if (is.not.empty(id)) return buildResult("JestTest", id);
      }

      return buildResult("Unknown");

    case AST_NODE_TYPES.FunctionDeclaration:
    case AST_NODE_TYPES.TSDeclareFunction:
      assert.not.empty(node.id);

      return buildResult("FunctionDeclaration", node.id.name);

    case AST_NODE_TYPES.ImportDeclaration:
      return buildResult("ImportDeclaration");

    case AST_NODE_TYPES.TSInterfaceDeclaration:
    case AST_NODE_TYPES.TSTypeAliasDeclaration:
      return buildResult("TypeDeclaration", node.id.name);

    case AST_NODE_TYPES.TSModuleDeclaration:
      return node.global ?? false
        ? buildResult("GlobalModuleDeclaration")
        : buildResult("ModuleDeclaration");

    default:
      return buildResult("Unknown");
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
