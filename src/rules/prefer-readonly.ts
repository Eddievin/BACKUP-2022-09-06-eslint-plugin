import * as ts from "typescript";
import type { TSESTree } from "@typescript-eslint/utils";
import { AST_NODE_TYPES } from "@typescript-eslint/utils";

import * as is from "@skylib/functions/dist/guards";

import * as utils from "./utils";
import { Checker } from "./utils/readonliness";

interface RuleOptions {
  readonly excludeSelectors: readonly string[];
  readonly ignoreClasses: boolean;
  readonly ignoreIdentifiers: readonly string[];
  readonly ignoreTypes: readonly string[];
  readonly includeSelectors: readonly string[];
  readonly noDefaultSelectors: boolean;
}

const isRuleOptions: is.Guard<RuleOptions> = is.factory(
  is.object.of,
  {
    excludeSelectors: is.strings,
    ignoreClasses: is.boolean,
    ignoreIdentifiers: is.strings,
    ignoreTypes: is.strings,
    includeSelectors: is.strings,
    noDefaultSelectors: is.boolean
  },
  {}
);

const rule = utils.createRule({
  create(context) {
    const selectors = utils.getSelectors(context.options, defaultSelectors);

    return {
      [selectors](node: TSESTree.Node): void {
        const tsNode = context.toTsNode(node);

        if (ts.isFunctionLike(tsNode))
          for (const param of tsNode.parameters)
            lintNode(context.toEsNode(param), param.name.getText(), context);
        else lintNode(node, tsNode.getText(), context);
      }
    };
  },
  defaultOptions: {
    excludeSelectors: [],
    ignoreClasses: true,
    ignoreIdentifiers: [],
    ignoreTypes: [],
    includeSelectors: [],
    noDefaultSelectors: false
  },
  isRuleOptions,
  messages: {
    shouldBeReadonly:
      "Parameter should be a readonly type. Failed type name: {{name}}. Failed type definition: {{definition}}"
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
  const { ignoreClasses, ignoreIdentifiers, ignoreTypes } = context.options;

  const ignoreIdentifiersMatcher = utils.createMatcher(ignoreIdentifiers);

  if (ignoreIdentifiersMatcher(identifier)) {
    // Ignore
  } else {
    const tsNode = context.toTsNode(node);

    const type = context.checker.getTypeAtLocation(tsNode);

    const checker = new Checker({
      context,
      ignoreClasses,
      ignoreTypeParameters: true,
      ignoreTypes,
      readonliness: "allReadonly"
    });

    const result = checker.checkType(type, restTypes.has(node.type));

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
