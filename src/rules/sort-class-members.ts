import * as _ from "@skylib/lodash-commonjs-es";
import * as utils from "./utils";
import type {
  RuleFix,
  RuleListener
} from "@typescript-eslint/utils/dist/ts-eslint";
import type { Writable, strings } from "@skylib/functions";
import { a, is } from "@skylib/functions";
import { AST_NODE_TYPES } from "@typescript-eslint/utils";
import type { TSESTree } from "@typescript-eslint/utils";

export const sortClassMembers = utils.createRule({
  name: "sort-class-members",
  fixable: "code",
  isOptions: is.object.factory<RuleOptions>({ sortingOrder: is.strings }, {}),
  defaultOptions: { sortingOrder: [] },
  messages: { incorrectSortingOrder: "Incorrect sorting order" },
  create: (context): RuleListener => {
    const sortingOrders = new Map(
      context.options.sortingOrder.map((name, index) => [name, index])
    );

    return {
      [AST_NODE_TYPES.ClassBody]: (node): void => {
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

        const fixes: Writable<readonly RuleFix[]> = [];

        for (const [index, sortedMember] of sortedMembers.entries())
          if (sortedMember.index === index) {
            // Valid
          } else {
            const member = a.get(members, index);

            fixes.push({
              range: context.getRangeWithLeadingTrivia(member.node),
              text: context.getTextWithLeadingTrivia(sortedMember.node)
            });
          }

        if (fixes.length > 0)
          context.report({
            fix: () => fixes,
            messageId: "incorrectSortingOrder",
            node
          });
      }
    };
  }
});

type AccessorType = "get" | "none" | "set";

type DynamicStatic = "dynamic" | "static";

interface Member {
  readonly index: number;
  readonly node: TSESTree.ClassElement;
  readonly sortingOrder: string;
}

interface RuleOptions {
  readonly sortingOrder: strings;
}

type Type =
  | "accessor"
  | "block"
  | "constructor"
  | "field"
  | "get"
  | "method"
  | "set"
  | "signature";

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
        case "set":
          return node.kind;

        default:
          return "none";
      }

    default:
      return "none";
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
      return node.static ?? false ? "static" : "dynamic";

    case AST_NODE_TYPES.StaticBlock:
      return "static";
  }
}

/**
 * Gets member types.
 *
 * @param node - Node.
 * @returns Member types.
 */
function getMemberTypes(node: TSESTree.ClassElement): readonly Type[] {
  switch (node.type) {
    case AST_NODE_TYPES.MethodDefinition:
    case AST_NODE_TYPES.TSAbstractMethodDefinition:
      switch (node.kind) {
        case "get":
        case "set":
          return ["accessor", node.kind];

        default:
          return [node.kind];
      }

    case AST_NODE_TYPES.PropertyDefinition:
    case AST_NODE_TYPES.TSAbstractPropertyDefinition:
      return ["field"];

    case AST_NODE_TYPES.TSIndexSignature:
      return ["signature"];

    case AST_NODE_TYPES.StaticBlock:
      return ["block"];
  }
}
