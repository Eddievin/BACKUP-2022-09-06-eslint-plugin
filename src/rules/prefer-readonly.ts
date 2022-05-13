import * as utils from "./utils";
import { is } from "@skylib/functions";
import { AST_NODE_TYPES } from "@typescript-eslint/utils";
import * as ts from "typescript";
import type { strings } from "@skylib/functions";
import type { TSESTree } from "@typescript-eslint/utils";

export const preferReadonly = utils.createRule({
  create: context => {
    const { ignoreInferredTypes } = context.options;

    const selectors = utils.getSelectors(context.options, defaultSelectors);

    return {
      [selectors]: (node: TSESTree.Node): void => {
        const tsNode = context.toTsNode(node);

        if (ts.isFunctionLike(tsNode))
          for (const param of tsNode.parameters)
            if (ignoreInferredTypes && is.empty(param.type)) {
              // Ignore infered types
            } else
              lintNode(context.toEsNode(param), param.name.getText(), context);
        else lintNode(node, tsNode.getText(), context);
      }
    };
  },
  defaultOptions: {
    excludeSelectors: [],
    ignoreClasses: false,
    ignoreIdentifiers: [],
    ignoreInferredTypes: false,
    ignoreInterfaces: false,
    ignoreTypes: [],
    includeSelectors: [],
    noDefaultSelectors: false
  },
  isRuleOptions: is.object.factory<RuleOptions>(
    {
      excludeSelectors: is.strings,
      ignoreClasses: is.boolean,
      ignoreIdentifiers: is.strings,
      ignoreInferredTypes: is.boolean,
      ignoreInterfaces: is.boolean,
      ignoreTypes: is.strings,
      includeSelectors: is.strings,
      noDefaultSelectors: is.boolean
    },
    {}
  ),
  messages: {
    shouldBeReadonly:
      "Parameter should be a readonly type. Failed type name: {{name}}. Failed type definition: {{definition}}"
  },
  name: "prefer-readonly"
});

const defaultSelectors: strings = [
  AST_NODE_TYPES.ArrowFunctionExpression,
  AST_NODE_TYPES.FunctionDeclaration,
  AST_NODE_TYPES.FunctionExpression,
  AST_NODE_TYPES.TSCallSignatureDeclaration,
  AST_NODE_TYPES.TSConstructSignatureDeclaration,
  AST_NODE_TYPES.TSConstructorType,
  AST_NODE_TYPES.TSDeclareFunction,
  AST_NODE_TYPES.TSEmptyBodyFunctionExpression,
  AST_NODE_TYPES.TSFunctionType,
  AST_NODE_TYPES.TSInterfaceDeclaration,
  AST_NODE_TYPES.TSMethodSignature,
  AST_NODE_TYPES.TSTypeAliasDeclaration
];

const restTypes: ReadonlySet<string> = new Set([
  AST_NODE_TYPES.ArrayPattern,
  AST_NODE_TYPES.RestElement
]);

type Context = utils.Context<MessageId, RuleOptions, object>;

type MessageId = utils.MessageId<typeof preferReadonly>;

interface RuleOptions {
  readonly excludeSelectors: strings;
  readonly ignoreClasses: boolean;
  readonly ignoreIdentifiers: strings;
  readonly ignoreInferredTypes: boolean;
  readonly ignoreInterfaces: boolean;
  readonly ignoreTypes: strings;
  readonly includeSelectors: strings;
  readonly noDefaultSelectors: boolean;
}

/**
 * Lints node.
 *
 * @param node - Node.
 * @param identifier - Identifier.
 * @param context - Context.
 */
function lintNode(
  node: TSESTree.Node,
  identifier: string,
  context: Context
): void {
  const { ignoreClasses, ignoreIdentifiers, ignoreInterfaces, ignoreTypes } =
    context.options;

  const ignoreIdentifiersMatcher = utils.createMatcher(ignoreIdentifiers);

  if (ignoreIdentifiersMatcher(identifier)) {
    // Ignore
  } else {
    const tsNode = context.toTsNode(node);

    const type = context.checker.getTypeAtLocation(tsNode);

    const checker = new utils.Checker({
      context,
      ignoreClasses,
      ignoreInterfaces,
      ignoreTypeParameters: true,
      ignoreTypes,
      readonliness: "allMaybeReadonly"
    });

    const result = checker.checkType(type, node, restTypes.has(node.type));

    if ("failed" in result)
      context.report({
        data: {
          definition: context.getTypeDefinitions(result.types),
          name: utils.getTypeNames(result.types)
        },
        messageId: "shouldBeReadonly",
        node
      });
  }
}
