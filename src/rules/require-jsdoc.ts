import type * as ts from "typescript";
import * as tsutils from "tsutils";
import * as utils from "./utils";
import type { RuleListener } from "@typescript-eslint/utils/dist/ts-eslint";
import type { TSESTree } from "@typescript-eslint/utils";
import { is } from "@skylib/functions";
import type { strings } from "@skylib/functions";

export interface Options {
  readonly excludeSelectors: strings;
  readonly includeSelectors: strings;
  readonly interfaces: readonly InterfaceOption[];
  readonly noDefaultSelectors: boolean;
  readonly properties: readonly PropertyOption[];
}

export enum PropertyOption {
  function = "function",
  nonFunction = "nonFunction"
}

export const isPropertyOption = is.factory(is.enumeration, PropertyOption);

export const isPropertyOptions = is.factory(is.array.of, isPropertyOption);

export enum InterfaceOption {
  callSignatures = "callSignatures",
  constructSignatures = "constructSignatures",
  interface = "interface"
}

export const isInterfaceOption = is.factory(is.enumeration, InterfaceOption);

export const isInterfaceOptions = is.factory(is.array.of, isInterfaceOption);

export enum MessageId {
  undocumented = "undocumented",
  undocumentedCallSignature = "undocumentedCallSignature",
  undocumentedConstructSignature = "undocumentedConstructSignature"
}

export const requireJsdoc = utils.createRule({
  name: "require-jsdoc",
  isOptions: is.object.factory<Options>(
    {
      excludeSelectors: is.strings,
      includeSelectors: is.strings,
      interfaces: isInterfaceOptions,
      noDefaultSelectors: is.boolean,
      properties: isPropertyOptions
    },
    {}
  ),
  defaultOptions: {
    excludeSelectors: [],
    includeSelectors: [],
    interfaces: [
      InterfaceOption.callSignatures,
      InterfaceOption.constructSignatures,
      InterfaceOption.interface
    ],
    noDefaultSelectors: false,
    properties: [PropertyOption.function, PropertyOption.nonFunction]
  },
  messages: {
    [MessageId.undocumented]: "Missing documentation",
    [MessageId.undocumentedCallSignature]:
      "Missing documentation for call signature",
    [MessageId.undocumentedConstructSignature]:
      "Missing documentation for constructor signature"
  },
  create: (context): RuleListener => {
    const selectors = utils.getSelectors(context.options, defaultSelectors);

    return {
      [selectors]: (node: TSESTree.Node): void => {
        switch (node.type) {
          case "TSInterfaceDeclaration":
            lintInterface(node);

            break;

          case "MethodDefinition":
          case "TSMethodSignature":
            lintMethod(node);

            break;

          case "PropertyDefinition":
          case "TSPropertySignature":
            lintProperty(node);

            break;

          default:
            lintNodeByTypeSymbol(node);
        }
      }
    };

    function lintCallSignatures(node: TSESTree.Node, type: ts.Type): void {
      if (
        type
          .getCallSignatures()
          .some(signature => context.missingDocComment(signature))
      )
        context.report({
          messageId: MessageId.undocumentedCallSignature,
          node
        });
    }

    function lintConstructSignatures(node: TSESTree.Node, type: ts.Type): void {
      if (
        type
          .getConstructSignatures()
          .some(signature => context.missingDocComment(signature))
      )
        context.report({
          messageId: MessageId.undocumentedConstructSignature,
          node
        });
    }

    function lintInterface(node: TSESTree.TSInterfaceDeclaration): void {
      const { interfaces } = context.options;

      const tsNode = context.toTsNode(node);

      const type = context.checker.getTypeAtLocation(tsNode);

      if (interfaces.includes(InterfaceOption.interface))
        lintNodeByTypeSymbol(node);

      if (interfaces.includes(InterfaceOption.callSignatures))
        lintCallSignatures(node, type);

      if (interfaces.includes(InterfaceOption.constructSignatures))
        lintConstructSignatures(node, type);
    }

    function lintMethod(
      node: TSESTree.MethodDefinition | TSESTree.TSMethodSignature
    ): void {
      const tsNode = context.toTsNode(node);

      if (tsutils.isConstructorDeclaration(tsNode)) {
        const type = tsutils.getConstructorTypeOfClassLikeDeclaration(
          tsNode.parent,
          context.checker
        );

        lintConstructSignatures(node, type);
      } else lintNodeBySymbol(node.key);
    }

    /**
     * Lints node.
     *
     * @param node - Node.
     */
    function lintNodeBySymbol(node: TSESTree.Node): void {
      const tsNode = context.toTsNode(node);

      const symbol = context.checker.getSymbolAtLocation(tsNode);

      if (symbol && context.missingDocComment(symbol))
        context.report({ messageId: MessageId.undocumented, node });
    }

    /**
     * Lints node.
     *
     * @param node - Node.
     */
    function lintNodeByTypeSymbol(node: TSESTree.Node): void {
      const tsNode = context.toTsNode(node);

      const symbol = context.checker.getTypeAtLocation(tsNode).getSymbol();

      if (symbol && context.missingDocComment(symbol))
        context.report({ messageId: MessageId.undocumented, node });
    }

    /**
     * Lints property.
     *
     * @param node - Node.
     */
    function lintProperty(
      node: TSESTree.PropertyDefinition | TSESTree.TSPropertySignature
    ): void {
      const { properties } = context.options;

      const typeAnnotation = node.typeAnnotation;

      if (typeAnnotation) {
        const type = typeAnnotation.typeAnnotation.type;

        if (
          type === "TSFunctionType"
            ? properties.includes(PropertyOption.function)
            : properties.includes(PropertyOption.nonFunction)
        )
          lintNodeBySymbol(node.key);
      }
    }
  }
});

const defaultSelectors: strings = [
  "ClassDeclaration",
  "FunctionDeclaration",
  "MethodDefinition",
  "PropertyDefinition",
  "TSAbstractMethodDefinition",
  "TSCallSignatureDeclaration",
  "TSConstructSignatureDeclaration",
  "TSDeclareFunction",
  "TSInterfaceDeclaration",
  "TSMethodSignature",
  "TSPropertySignature"
];
