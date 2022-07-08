import * as _ from "@skylib/lodash-commonjs-es";
import * as utils from "./utils";
import {
  Accumulator,
  a,
  assert,
  createValidationObject,
  evaluate,
  is,
  o
} from "@skylib/functions";
import type { Rec, Writable, stringU, strings } from "@skylib/functions";
import type {
  RuleFix,
  RuleListener
} from "@typescript-eslint/utils/dist/ts-eslint";
import { AST_NODE_TYPES } from "@typescript-eslint/utils";
import type { TSESTree } from "@typescript-eslint/utils";

export const statementsOrder = utils.createRule({
  create: (context): RuleListener => {
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

    const itemsMap = new Accumulator<string, Item>();

    return {
      "*": (node: TSESTree.Node): void => {
        if (node.parent) {
          const id = utils.getNodeId(node.parent);

          const index = itemsMap.get(id).length;

          const parentNode = node.parent;

          const order = evaluate(() => {
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
            itemsMap.push(id, nodeInfo(node, parentNode, index, order));
        }
      },
      "Program:exit": (): void => {
        for (const items of itemsMap.values()) {
          const sortedItems = _.sortBy(items, node => node.sortingOrder);

          const fixes: Writable<readonly RuleFix[]> = [];

          for (const [index, sortedItem] of sortedItems.entries())
            if (sortedItem.index === index) {
              // Valid
            } else {
              const item = a.get(items, index);

              fixes.push({
                range: context.getRangeWithLeadingTrivia(item.node),
                text: context.getTextWithLeadingTrivia(sortedItem.node)
              });
            }

          if (fixes.length > 0)
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
  isRuleOptions: evaluate(() => {
    const NodeTypeVO = createValidationObject<NodeType>({
      ExportAllDeclaration: "ExportAllDeclaration",
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

    return is.object.factory<RuleOptions>(
      {
        blockOrder: isNodeTypes,
        moduleOrder: isNodeTypes,
        order: isNodeTypes,
        rootOrder: isNodeTypes
      },
      {}
    );
  }),
  messages: { incorrectStatementsOrder: "Incorrect statements order" },
  name: "statements-order"
});

const defaultOrder: Rec<NodeType, number> = {
  ExportAllDeclaration: 1003,
  ExportDeclaration: 1004,
  ExportDefaultDeclaration: 1005,
  ExportFunctionDeclaration: 1008,
  ExportModuleDeclaration: 1009,
  ExportTypeDeclaration: 1007,
  ExportUnknown: 1006,
  FunctionDeclaration: 1012,
  GlobalModuleDeclaration: 1002,
  ImportDeclaration: 1001,
  JestTest: 1014,
  ModuleDeclaration: 1013,
  TypeDeclaration: 1011,
  Unknown: 1010
};

const sortable: Rec<NodeType, boolean> = {
  ExportAllDeclaration: true,
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

type NodeType =
  | "ExportAllDeclaration"
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
      const { callee } = node.expression;

      if (callee.type === AST_NODE_TYPES.Identifier && callee.name === "test")
        return argument.value;

      if (
        callee.type === AST_NODE_TYPES.MemberExpression &&
        isIdentifier(callee.object, "test") &&
        isIdentifier(callee.property, "only", "skip")
      )
        return argument.value;

      if (
        callee.type === AST_NODE_TYPES.CallExpression &&
        callee.callee.type === AST_NODE_TYPES.MemberExpression &&
        isIdentifier(callee.callee.object, "test") &&
        isIdentifier(callee.callee.property, "each")
      )
        return argument.value;

      if (
        callee.type === AST_NODE_TYPES.CallExpression &&
        callee.callee.type === AST_NODE_TYPES.MemberExpression &&
        callee.callee.object.type === AST_NODE_TYPES.MemberExpression &&
        isIdentifier(callee.callee.object.object, "test") &&
        isIdentifier(callee.callee.object.property, "only", "skip") &&
        isIdentifier(callee.callee.property, "each")
      )
        return argument.value;
    }
  }

  return undefined;
}

/**
 * Checks if node is an identifier.
 *
 * @param node - Node.
 * @param names - Allowed names.
 * @returns _True_ if node is an identifier, _false_ otherwise.
 */
function isIdentifier(node: TSESTree.Node, ...names: strings): boolean {
  return node.type === AST_NODE_TYPES.Identifier && names.includes(node.name);
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
    case AST_NODE_TYPES.ExportAllDeclaration:
      return buildResult(
        "ExportAllDeclaration",
        `${node.source.value} ${node.exportKind}`
      );

    case AST_NODE_TYPES.ExportDefaultDeclaration:
      return buildResult("ExportDefaultDeclaration");

    case AST_NODE_TYPES.ExportNamedDeclaration:
      if (node.declaration)
        switch (node.declaration.type) {
          case AST_NODE_TYPES.FunctionDeclaration:
          case AST_NODE_TYPES.TSDeclareFunction:
            assert.not.empty(node.declaration.id, "Expecting declaration ID");

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

      return buildResult(
        "ExportDeclaration",
        node.source ? `${node.source.value} ${node.exportKind}` : "~"
      );

    case AST_NODE_TYPES.ExpressionStatement:
      {
        const id = getJestTestName(node);

        if (is.not.empty(id)) return buildResult("JestTest", id);
      }

      return buildResult("Unknown");

    case AST_NODE_TYPES.FunctionDeclaration:
    case AST_NODE_TYPES.TSDeclareFunction:
      assert.not.empty(node.id, "Expecting node ID");

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

  function buildResult(type: NodeType, id = ""): Item {
    const order1 = 1_000_000 + order[type];

    const order2 = sortable[type] ? id : "";

    const order3 = 1_000_000 + node.range[0];

    return {
      id,
      index,
      node,
      order,
      parentNode,
      sortingOrder: `${order1}\u0000${order2}\u0000${order3}`,
      type
    };
  }
}
