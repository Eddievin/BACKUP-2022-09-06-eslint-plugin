import * as tsutils from "tsutils";
import type * as ts from "typescript";
import type { TSESTree } from "@typescript-eslint/utils";
import { AST_NODE_TYPES } from "@typescript-eslint/utils";

import * as is from "@skylib/functions/dist/guards";
import { createValidationObject } from "@skylib/functions/dist/types/core";

import * as utils from "./utils";

type InterfaceOption = "callSignatures" | "constructSignatures" | "interface";

const InterfaceOptionVO = createValidationObject<InterfaceOption>({
  callSignatures: "callSignatures",
  constructSignatures: "constructSignatures",
  interface: "interface"
});

const isInterfaceOption = is.factory(is.enumeration, InterfaceOptionVO);

const isInterfaceOptions = is.factory(is.array.of, isInterfaceOption);

type PropertyOption = "function" | "nonFunction";

const PropertyOptionVO = createValidationObject<PropertyOption>({
  function: "function",
  nonFunction: "nonFunction"
});

const isPropertyOption = is.factory(is.enumeration, PropertyOptionVO);

const isPropertyOptions = is.factory(is.array.of, isPropertyOption);

interface RuleOptions {
  readonly excludeSelectors: readonly string[];
  readonly includeSelectors: readonly string[];
  readonly interfaceOptions: readonly InterfaceOption[];
  readonly noDefaultSelectors: boolean;
  readonly propertyOptions: readonly PropertyOption[];
}

const isRuleOptions: is.Guard<RuleOptions> = is.factory(
  is.object.of,
  {
    excludeSelectors: is.strings,
    includeSelectors: is.strings,
    interfaceOptions: isInterfaceOptions,
    noDefaultSelectors: is.boolean,
    propertyOptions: isPropertyOptions
  },
  {}
);

const rule = utils.createRule({
  create(context) {
    const selectors = utils.getSelectors(context.options, defaultSelectors);

    return {
      [selectors](node: TSESTree.Node): void {
        switch (node.type) {
          case AST_NODE_TYPES.TSInterfaceDeclaration:
            lintInterface(node, context);

            break;

          case AST_NODE_TYPES.MethodDefinition:
          case AST_NODE_TYPES.TSMethodSignature:
            lintMethod(node, context);

            break;

          case AST_NODE_TYPES.PropertyDefinition:
          case AST_NODE_TYPES.TSPropertySignature:
            lintProperty(node, context);

            break;

          default:
            lintNodeByTypeSymbol(node, context);
        }
      }
    };
  },
  defaultOptions: {
    excludeSelectors: [],
    includeSelectors: [],
    interfaceOptions: ["callSignatures", "constructSignatures", "interface"],
    noDefaultSelectors: false,
    propertyOptions: ["function", "nonFunction"]
  },
  isRuleOptions,
  messages: {
    undocumented: "Missing documentation",
    undocumentedCallSignature: "Missing documentation for call signature",
    undocumentedConstructSignature:
      "Missing documentation for constructor signature"
  }
});

export = rule;

/*
|*******************************************************************************
|* Private
|*******************************************************************************
|*/

type Context = utils.Context<MessageId, RuleOptions, object>;

type MessageId = utils.MessageId<typeof rule>;

const defaultSelectors: readonly string[] = [
  AST_NODE_TYPES.ClassDeclaration,
  AST_NODE_TYPES.FunctionDeclaration,
  AST_NODE_TYPES.MethodDefinition,
  AST_NODE_TYPES.PropertyDefinition,
  AST_NODE_TYPES.TSCallSignatureDeclaration,
  AST_NODE_TYPES.TSConstructSignatureDeclaration,
  AST_NODE_TYPES.TSDeclareFunction,
  AST_NODE_TYPES.TSInterfaceDeclaration,
  AST_NODE_TYPES.TSMethodSignature,
  AST_NODE_TYPES.TSPropertySignature
];

/**
 * Lints interface.
 *
 * @param node - Node.
 * @param context - Context.
 */
function lintInterface(
  node: TSESTree.TSInterfaceDeclaration,
  context: Context
): void {
  const { interfaceOptions } = context.options;

  const tsNode = context.toTsNode(node);

  const type = context.checker.getTypeAtLocation(tsNode);

  if (interfaceOptions.includes("interface"))
    lintNodeByTypeSymbol(node, context);

  if (interfaceOptions.includes("callSignatures"))
    lintCallSignatures(node, type, context);

  if (interfaceOptions.includes("constructSignatures"))
    lintConstructSignatures(node, type, context);
}

/**
 * Lints method.
 *
 * @param node - Node.
 * @param context - Context.
 */
function lintMethod(
  node: TSESTree.MethodDefinition | TSESTree.TSMethodSignature,
  context: Context
): void {
  const tsNode = context.toTsNode(node);

  if (tsutils.isConstructorDeclaration(tsNode)) {
    const type = tsutils.getConstructorTypeOfClassLikeDeclaration(
      tsNode.parent,
      context.checker
    );

    lintConstructSignatures(node, type, context);
  } else lintNodeBySymbol(node.key, context);
}

/**
 * Lints property.
 *
 * @param node - Node.
 * @param context - Context.
 */
function lintProperty(
  node: TSESTree.PropertyDefinition | TSESTree.TSPropertySignature,
  context: Context
): void {
  const { propertyOptions } = context.options;

  const typeAnnotation = node.typeAnnotation;

  if (typeAnnotation) {
    const type = typeAnnotation.typeAnnotation.type;

    if (
      type === AST_NODE_TYPES.TSFunctionType
        ? propertyOptions.includes("function")
        : propertyOptions.includes("nonFunction")
    )
      lintNodeBySymbol(node.key, context);
  }
}

/**
 * Lints node.
 *
 * @param node - Node.
 * @param context - Context.
 */
function lintNodeBySymbol(node: TSESTree.Node, context: Context): void {
  const tsNode = context.toTsNode(node);

  const symbol = context.checker.getSymbolAtLocation(tsNode);

  if (symbol && context.missingDocComment(symbol))
    context.report({
      messageId: "undocumented",
      node
    });
}

/**
 * Lints node.
 *
 * @param node - Node.
 * @param context - Context.
 */
function lintNodeByTypeSymbol(node: TSESTree.Node, context: Context): void {
  const tsNode = context.toTsNode(node);

  const symbol = context.checker.getTypeAtLocation(tsNode).getSymbol();

  if (symbol && context.missingDocComment(symbol))
    context.report({
      messageId: "undocumented",
      node
    });
}

/**
 * Lints call signatures.
 *
 * @param node - Node.
 * @param type - Type.
 * @param context - Context.
 */
function lintCallSignatures(
  node: TSESTree.Node,
  type: ts.Type,
  context: Context
): void {
  if (
    type
      .getCallSignatures()
      .some(signature => context.missingDocComment(signature))
  )
    context.report({
      messageId: "undocumentedCallSignature",
      node
    });
}

/**
 * Lints constructor signatures.
 *
 * @param node - Node.
 * @param type - Type.
 * @param context - Context.
 */
function lintConstructSignatures(
  node: TSESTree.Node,
  type: ts.Type,
  context: Context
): void {
  if (
    type
      .getConstructSignatures()
      .some(signature => context.missingDocComment(signature))
  )
    context.report({
      messageId: "undocumentedConstructSignature",
      node
    });
}
