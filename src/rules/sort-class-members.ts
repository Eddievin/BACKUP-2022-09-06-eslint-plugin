import * as _ from "@skylib/lodash-commonjs-es";
import * as utils from "./utils";
import { ReadonlyMap, a, evaluate, is } from "@skylib/functions";
import type {
  RuleFix,
  RuleListener
} from "@typescript-eslint/utils/dist/ts-eslint";
import { AST_NODE_TYPES } from "@typescript-eslint/utils";
import type { TSESTree } from "@typescript-eslint/utils";
import type { strings } from "@skylib/functions";

export interface Options {
  readonly sortingOrder: strings;
}

export enum MessageId {
  incorrectSortingOrder = "incorrectSortingOrder"
}

export const sortClassMembers = utils.createRule({
  name: "sort-class-members",
  fixable: utils.Fixable.code,
  isOptions: is.object.factory<Options>({ sortingOrder: is.strings }, {}),
  defaultOptions: { sortingOrder: [] },
  messages: { [MessageId.incorrectSortingOrder]: "Incorrect sorting order" },
  create: (context): RuleListener => {
    const sortingOrders = new ReadonlyMap(
      context.options.sortingOrder.map((name, index) => [name, index])
    );

    return {
      ClassBody: (node): void => {
        const members = node.body.map((member, index): Member => {
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
                    sortingOrders.get(`${x}-${y}`),
                    sortingOrders.get(`${x}-${z}`),
                    sortingOrders.get(`${y}-${x}`),
                    sortingOrders.get(`${y}-${z}`),
                    sortingOrders.get(`${z}-${x}`),
                    sortingOrders.get(`${z}-${y}`),
                    sortingOrders.get(`${x}-${y}-${z}`),
                    sortingOrders.get(`${x}-${z}-${y}`),
                    sortingOrders.get(`${y}-${x}-${z}`),
                    sortingOrders.get(`${y}-${z}-${x}`),
                    sortingOrders.get(`${z}-${x}-${y}`),
                    sortingOrders.get(`${z}-${y}-${x}`)
                  ].filter(is.not.empty)
                )
              )
            );

          const name = context.getMemberName(member);

          const accessorType = getMemberAccessorType(member);

          return {
            index,
            node: member,
            sortingOrder: `${sortingOrder} ${name} ${accessorType}`
          };
        });

        const sortedMembers = _.sortBy(members, member => member.sortingOrder);

        const fixes = a
          .fromIterable(sortedMembers.entries())
          .filter(([index, sortedMember]) => sortedMember.index !== index)
          .map(([index, sortedMember]): RuleFix => {
            const member = a.get(members, index);

            return {
              range: context.getRangeWithLeadingTrivia(member.node),
              text: context.getTextWithLeadingTrivia(sortedMember.node)
            };
          });

        if (fixes.length)
          context.report({
            fix: () => fixes,
            messageId: MessageId.incorrectSortingOrder,
            node
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
  // eslint-disable-next-line @typescript-eslint/no-shadow -- Ok
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

interface Member {
  readonly index: number;
  readonly node: TSESTree.ClassElement;
  readonly sortingOrder: string;
}

type Types = readonly Type[];

/**
 * Gets member accessibility.
 *
 * @param node - Node.
 * @returns Member accessibility.
 */
function getMemberAccessibility(node: TSESTree.ClassElement): string {
  switch (node.type) {
    case AST_NODE_TYPES.MethodDefinition:
    case AST_NODE_TYPES.PropertyDefinition:
    case AST_NODE_TYPES.TSAbstractMethodDefinition:
    case AST_NODE_TYPES.TSAbstractPropertyDefinition:
    case AST_NODE_TYPES.TSIndexSignature:
      return node.accessibility ? node.accessibility.valueOf() : "public";

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
