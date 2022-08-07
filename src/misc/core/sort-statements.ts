import * as _ from "@skylib/lodash-commonjs-es";
import * as utils from "../../utils";
import type { Rec, stringU, strings } from "@skylib/functions";
import { assert, is } from "@skylib/functions";
import { AST_NODE_TYPES } from "@typescript-eslint/utils";
import type { RuleListener } from "@typescript-eslint/utils/dist/ts-eslint";
import type { TSESTree } from "@typescript-eslint/utils";

export interface Options {
  readonly blockOrder: NodeTypes;
  readonly moduleOrder: NodeTypes;
  readonly order: NodeTypes;
  readonly programOrder: NodeTypes;
}

export enum NodeType {
  ExportAllDeclaration = "ExportAllDeclaration",
  ExportDeclaration = "ExportDeclaration",
  ExportFunctionDeclaration = "ExportFunctionDeclaration",
  ExportTypeDeclaration = "ExportTypeDeclaration",
  FunctionDeclaration = "FunctionDeclaration",
  ImportDeclaration = "ImportDeclaration",
  JestTest = "JestTest",
  TypeDeclaration = "TypeDeclaration",
  Unknown = "Unknown"
}

export const isNodeType = is.factory(is.enumeration, NodeType);

export const isNodeTypes = is.factory(is.array.of, isNodeType);

export const sortStatements = utils.createRule({
  name: "sort-statements",
  fixable: utils.Fixable.code,
  isOptions: is.object.factory<Options>(
    {
      blockOrder: isNodeTypes,
      moduleOrder: isNodeTypes,
      order: isNodeTypes,
      programOrder: isNodeTypes
    },
    {}
  ),
  defaultOptions: {
    blockOrder: [],
    moduleOrder: [],
    order: [],
    programOrder: []
  },
  messages: utils.sort.messages,
  create: (context): RuleListener => {
    const { blockOrder, moduleOrder, order, programOrder } = context.options;

    return {
      BlockStatement: node => {
        utils.sort(node.body, context, {
          sortingOrder: sortingOrder(
            _.uniq([...blockOrder, ...order, ...defaultOrder])
          )
        });
      },
      Program: node => {
        utils.sort(node.body, context, {
          sortingOrder: sortingOrder(
            _.uniq([...programOrder, ...order, ...defaultOrder])
          )
        });
      },
      TSModuleBlock: node => {
        utils.sort(node.body, context, {
          sortingOrder: sortingOrder(
            _.uniq([...moduleOrder, ...order, ...defaultOrder])
          )
        });
      }
    };
  }
});

const defaultOrder: NodeTypes = [
  NodeType.ImportDeclaration,
  NodeType.ExportAllDeclaration,
  NodeType.ExportDeclaration,
  NodeType.Unknown,
  NodeType.ExportTypeDeclaration,
  NodeType.ExportFunctionDeclaration,
  NodeType.TypeDeclaration,
  NodeType.FunctionDeclaration,
  NodeType.JestTest
];

const sortable: Rec<NodeType, boolean> = {
  [NodeType.ExportAllDeclaration]: true,
  [NodeType.ExportDeclaration]: true,
  [NodeType.ExportFunctionDeclaration]: true,
  [NodeType.ExportTypeDeclaration]: true,
  [NodeType.FunctionDeclaration]: true,
  [NodeType.ImportDeclaration]: false,
  [NodeType.JestTest]: true,
  [NodeType.TypeDeclaration]: true,
  [NodeType.Unknown]: false
};

type NodeTypes = readonly NodeType[];

/**
 * Returns Jest test name.
 *
 * @param node - Node.
 * @returns Test name if node contains Jest test, _undefined_ otherwise.
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

      if (
        (callee.type === AST_NODE_TYPES.Identifier && callee.name === "test") ||
        (callee.type === AST_NODE_TYPES.MemberExpression &&
          isIdentifier(callee.object, "test") &&
          isIdentifier(callee.property, "only", "skip")) ||
        (callee.type === AST_NODE_TYPES.CallExpression &&
          callee.callee.type === AST_NODE_TYPES.MemberExpression &&
          isIdentifier(callee.callee.object, "test") &&
          isIdentifier(callee.callee.property, "each")) ||
        (callee.type === AST_NODE_TYPES.CallExpression &&
          callee.callee.type === AST_NODE_TYPES.MemberExpression &&
          callee.callee.object.type === AST_NODE_TYPES.MemberExpression &&
          isIdentifier(callee.callee.object.object, "test") &&
          isIdentifier(callee.callee.object.property, "only", "skip") &&
          isIdentifier(callee.callee.property, "each"))
      )
        return utils.prepareForComparison(argument.value, ":,.");
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
 * Creates sorting order function.
 *
 * @param order - Order by node type.
 * @returns Sorting order function.
 */
function sortingOrder(order: NodeTypes) {
  return (node: TSESTree.Node): string => {
    switch (node.type) {
      case AST_NODE_TYPES.ExportAllDeclaration:
        return buildResult(
          NodeType.ExportAllDeclaration,
          `${node.source.value}\u0002${node.exportKind}`
        );

      case AST_NODE_TYPES.ExportNamedDeclaration:
        if (node.declaration)
          switch (node.declaration.type) {
            case AST_NODE_TYPES.FunctionDeclaration:
            case AST_NODE_TYPES.TSDeclareFunction:
              assert.not.empty(node.declaration.id, "Expecting node ID");

              return buildResult(
                NodeType.ExportFunctionDeclaration,
                node.declaration.id.name
              );

            case AST_NODE_TYPES.TSInterfaceDeclaration:
            case AST_NODE_TYPES.TSTypeAliasDeclaration:
              return buildResult(
                NodeType.ExportTypeDeclaration,
                node.declaration.id.name
              );

            default:
              return buildResult(NodeType.Unknown);
          }

        return buildResult(
          NodeType.ExportDeclaration,
          node.source ? `${node.source.value}\u0002${node.exportKind}` : ""
        );

      case AST_NODE_TYPES.ExpressionStatement: {
        const id = getJestTestName(node);

        return is.not.empty(id)
          ? buildResult(NodeType.JestTest, id)
          : buildResult(NodeType.Unknown);
      }

      case AST_NODE_TYPES.FunctionDeclaration:
      case AST_NODE_TYPES.TSDeclareFunction:
        assert.not.empty(node.id, "Expecting node ID");

        return buildResult(NodeType.FunctionDeclaration, node.id.name);

      case AST_NODE_TYPES.ImportDeclaration:
        return buildResult(NodeType.ImportDeclaration);

      case AST_NODE_TYPES.TSInterfaceDeclaration:
      case AST_NODE_TYPES.TSTypeAliasDeclaration:
        return buildResult(NodeType.TypeDeclaration, node.id.name);

      default:
        return buildResult(NodeType.Unknown);
    }

    function buildResult(type: NodeType, id = ""): string {
      const order1 = 1_000_000 + order.indexOf(type);

      const order2 = sortable[type] ? id : "";

      const order3 = 1_000_000 + node.range[0];

      return `${order1}\u0001${order2}\u0001${order3}`;
    }
  };
}
