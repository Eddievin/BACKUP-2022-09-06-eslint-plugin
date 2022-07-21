import * as utils from "./utils";
import { ReadonlyMap, evaluate, is } from "@skylib/functions";
import { AST_NODE_TYPES } from "@typescript-eslint/utils";
import type { RuleListener } from "@typescript-eslint/utils/dist/ts-eslint";
import type { TSESTree } from "@typescript-eslint/utils";
import type { strings } from "@skylib/functions";

export interface Options {
  readonly sortingOrder: strings;
}

export const sortClassMembers = utils.createRule({
  name: "sort-class-members",
  fixable: utils.Fixable.code,
  isOptions: is.object.factory<Options>({ sortingOrder: is.strings }, {}),
  defaultOptions: { sortingOrder: [] },
  messages: {
    [utils.sort.MessageId.incorrectSortingOrder]: "Incorrect sorting order",
    [utils.sort.MessageId.incorrectSortingOrderId]:
      "Incorrect sorting order ({{ _id }})"
  },
  create: (context, typeCheck): RuleListener => {
    const sortingOrders = new ReadonlyMap(
      context.options.sortingOrder.map((name, index) => [name, index])
    );

    return {
      ClassBody: (node): void => {
        utils.sort(node.body, context, typeCheck, {
          sortingOrder: member => {
            const x = getMemberAccessibility(member);

            const y = getMemberDynamicStatic(member);

            const types = getMemberTypes(member);

            const sortingOrder =
              1000 +
              Math.min(
                ...types.map(z =>
                  Math.min(
                    ...[
                      1000,
                      sortingOrders.get(x),
                      sortingOrders.get(y),
                      sortingOrders.get(z),
                      sortingOrders.get(`${x}\u0001${y}`),
                      sortingOrders.get(`${x}\u0001${z}`),
                      sortingOrders.get(`${y}\u0001${x}`),
                      sortingOrders.get(`${y}\u0001${z}`),
                      sortingOrders.get(`${z}\u0001${x}`),
                      sortingOrders.get(`${z}\u0001${y}`),
                      sortingOrders.get(`${x}\u0001${y}\u0001${z}`),
                      sortingOrders.get(`${x}\u0001${z}\u0001${y}`),
                      sortingOrders.get(`${y}\u0001${x}\u0001${z}`),
                      sortingOrders.get(`${y}\u0001${z}\u0001${x}`),
                      sortingOrders.get(`${z}\u0001${x}\u0001${y}`),
                      sortingOrders.get(`${z}\u0001${y}\u0001${x}`)
                    ].filter(is.not.empty)
                  )
                )
              );

            const name = context.getMemberName(member);

            const accessorType = getMemberAccessorType(member);

            return `${sortingOrder}\u0001${name}\u0001${accessorType}`;
          }
        });
      }
    };
  }
});

enum DynamicStatic {
  dynamic = "dynamic",
  static = "static"
}

enum Type {
  accessor = "accessor",
  block = "block",
  // eslint-disable-next-line @typescript-eslint/no-shadow -- Wait for https://github.com/typescript-eslint/typescript-eslint/issues/5337
  constructor = "constructor",
  field = "field",
  get = "get",
  method = "method",
  set = "set",
  signature = "signature"
}

enum AccessorType {
  get = "get",
  none = "none",
  set = "set"
}

type Types = readonly Type[];

/**
 * Gets member accessibility.
 *
 * @param node - Node.
 * @returns Member accessibility.
 */
function getMemberAccessibility(
  node: TSESTree.ClassElement
): TSESTree.Accessibility {
  switch (node.type) {
    case AST_NODE_TYPES.MethodDefinition:
    case AST_NODE_TYPES.PropertyDefinition:
    case AST_NODE_TYPES.TSAbstractMethodDefinition:
    case AST_NODE_TYPES.TSAbstractPropertyDefinition:
    case AST_NODE_TYPES.TSIndexSignature:
      return node.accessibility ?? "public";

    case AST_NODE_TYPES.StaticBlock:
      return "public";
  }
}

/**
 * Gets member accessor type.
 *
 * @param node - Node.
 * @returns Member accessor type.
 */
function getMemberAccessorType(node: TSESTree.ClassElement): AccessorType {
  switch (node.type) {
    case AST_NODE_TYPES.MethodDefinition:
    case AST_NODE_TYPES.TSAbstractMethodDefinition:
      switch (node.kind) {
        case "get":
          return AccessorType.get;

        case "set":
          return AccessorType.set;

        default:
          return AccessorType.none;
      }

    default:
      return AccessorType.none;
  }
}

/**
 * Gets member dynamic/static state.
 *
 * @param node - Node.
 * @returns Member dynamic/static state.
 */
function getMemberDynamicStatic(node: TSESTree.ClassElement): DynamicStatic {
  switch (node.type) {
    case AST_NODE_TYPES.MethodDefinition:
    case AST_NODE_TYPES.PropertyDefinition:
    case AST_NODE_TYPES.TSAbstractMethodDefinition:
    case AST_NODE_TYPES.TSAbstractPropertyDefinition:
    case AST_NODE_TYPES.TSIndexSignature:
      return node.static ?? false
        ? DynamicStatic.static
        : DynamicStatic.dynamic;

    case AST_NODE_TYPES.StaticBlock:
      return DynamicStatic.static;
  }
}

/**
 * Gets member types.
 *
 * @param node - Node.
 * @returns Member types.
 */
function getMemberTypes(node: TSESTree.ClassElement): Types {
  switch (node.type) {
    case AST_NODE_TYPES.MethodDefinition:
    case AST_NODE_TYPES.TSAbstractMethodDefinition:
      return evaluate(() => {
        switch (node.kind) {
          case "constructor":
            return [Type.constructor];

          case "get":
            return [Type.accessor, Type.get];

          case "method":
            return [Type.method];

          case "set":
            return [Type.accessor, Type.set];
        }
      });

    case AST_NODE_TYPES.PropertyDefinition:
    case AST_NODE_TYPES.TSAbstractPropertyDefinition:
      return [Type.field];

    case AST_NODE_TYPES.TSIndexSignature:
      return [Type.signature];

    case AST_NODE_TYPES.StaticBlock:
      return [Type.block];
  }
}
