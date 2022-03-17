import * as _ from "lodash";
import type { TSESTree } from "@typescript-eslint/utils";
import { AST_NODE_TYPES } from "@typescript-eslint/utils";
import type { RuleFix } from "@typescript-eslint/utils/dist/ts-eslint";

import * as a from "@skylib/functions/dist/array";
import * as cast from "@skylib/functions/dist/converters";
import * as is from "@skylib/functions/dist/guards";
import type { strings } from "@skylib/functions/dist/types/core";

import * as utils from "./utils";

interface RuleOptions {
  readonly sortingOrder: strings;
}

const isRuleOptions: is.Guard<RuleOptions> = is.factory(
  is.object.of,
  { sortingOrder: is.strings },
  {}
);

const rule = utils.createRule({
  create(context) {
    const sortingOrders = new Map(
      context.options.sortingOrder.map((name, index) => [name, index])
    );

    return {
      [AST_NODE_TYPES.ClassBody](node): void {
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

          const name = getMemberName(member, context);

          const accessorType = getMemberAccessorType(member);

          return {
            index,
            node: member,
            sortingOrder: `${sortingOrder}-${name}-${accessorType}`
          };
        });

        const sortedMembers = _.sortBy(members, member => member.sortingOrder);

        const fixes: RuleFix[] = [];

        for (const [index, sortedMember] of sortedMembers.entries())
          if (sortedMember.index !== index) {
            const member = a.get(members, index);

            fixes.push({
              range: context.getRangeWithLeadingTrivia(member.node),
              text: context.getTextWithLeadingTrivia(sortedMember.node)
            });
          }

        if (fixes.length)
          context.report({
            fix: () => fixes,
            messageId: "incorrectSortingOrder",
            node
          });
      }
    };
  },
  defaultOptions: {
    sortingOrder: []
  },
  fixable: "code",
  isRuleOptions,
  messages: {
    incorrectSortingOrder: "Incorrect sorting order"
  }
});

export = rule;

/*
|*******************************************************************************
|* Private
|*******************************************************************************
|*/

type AccessorType = "get" | "none" | "set";

type Context = utils.Context<MessageId, RuleOptions, object>;

type DynamicStatic = "dynamic" | "static";

interface Member {
  readonly index: number;
  readonly node: TSESTree.ClassElement;
  readonly sortingOrder: string;
}

type MessageId = utils.MessageId<typeof rule>;

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
 * Gets member name.
 *
 * @param node - Node.
 * @param context - Context.
 * @returns Member name.
 */
function getMemberName(node: TSESTree.ClassElement, context: Context): string {
  switch (node.type) {
    case AST_NODE_TYPES.MethodDefinition:
    case AST_NODE_TYPES.PropertyDefinition:
    case AST_NODE_TYPES.TSAbstractMethodDefinition:
    case AST_NODE_TYPES.TSAbstractPropertyDefinition:
      switch (node.key.type) {
        case AST_NODE_TYPES.Identifier:
          return node.key.name;

        case AST_NODE_TYPES.Literal:
          return cast.string(node.key.value);

        default:
          return context.getText(node.key);
      }

    case AST_NODE_TYPES.StaticBlock:
    case AST_NODE_TYPES.TSIndexSignature:
      return "";
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
