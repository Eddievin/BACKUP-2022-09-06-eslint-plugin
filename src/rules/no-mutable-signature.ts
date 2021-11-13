import type { TSESTree } from "@typescript-eslint/experimental-utils";
import { AST_NODE_TYPES } from "@typescript-eslint/experimental-utils";

import * as is from "@skylib/functions/dist/guards";

import * as utils from "./utils";
import type { Readonliness } from "./utils/readonliness";
import { Checker } from "./utils/readonliness";

interface RuleOptions {
  readonly ignoreClasses: boolean;
  readonly ignoreIdentifiers: readonly string[];
  readonly ignoreNumberSignature: boolean;
  readonly ignoreStringSignature: boolean;
  readonly ignoreTypes: readonly string[];
}

const isRuleOptions: is.Guard<RuleOptions> = is.factory(
  is.object.of,
  {
    ignoreClasses: is.boolean,
    ignoreIdentifiers: is.strings,
    ignoreNumberSignature: is.boolean,
    ignoreStringSignature: is.boolean,
    ignoreTypes: is.strings
  },
  {}
);

const rule = utils.createRule({
  create(context) {
    const {
      ignoreClasses,
      ignoreIdentifiers,
      ignoreNumberSignature,
      ignoreStringSignature,
      ignoreTypes
    } = context.options;

    const ignoreIdentifiersMatcher = utils.createMatcher(ignoreIdentifiers);

    const signatures: Signature[] = [
      {
        ignore: ignoreNumberSignature,
        messageId: "noMutableNumberSignature",
        readonliness: "numberSignatureReadonly"
      },
      {
        ignore: ignoreStringSignature,
        messageId: "noMutableStringSignature",
        readonliness: "stringSignatureReadonly"
      }
    ];

    const annotations: TSESTree.TSTypeAnnotation[] = [];

    const ignoreAnnotations: TSESTree.TSTypeAnnotation[] = [];

    const restAnnotations: TSESTree.TSTypeAnnotation[] = [];

    return {
      [AST_NODE_TYPES.Identifier](node): void {
        if (node.typeAnnotation && ignoreIdentifiersMatcher(node.name))
          ignoreAnnotations.push(node.typeAnnotation);
      },
      [AST_NODE_TYPES.RestElement](node): void {
        if (node.typeAnnotation) restAnnotations.push(node.typeAnnotation);
      },
      [AST_NODE_TYPES.TSTypeAnnotation](node): void {
        annotations.push(node);
      },
      "Program:exit"(): void {
        const ignoreAnnotationsSet = new Set(ignoreAnnotations);

        const restAnnotationsSet = new Set(restAnnotations);

        for (const { ignore, messageId, readonliness } of signatures)
          if (ignore) {
            // Ignore
          } else {
            const checker = new Checker({
              context,
              ignoreClasses,
              ignoreTypeParameters: true,
              ignoreTypes,
              readonliness
            });

            for (const node of annotations)
              if (ignoreAnnotationsSet.has(node)) {
                // Ignore
              } else {
                const tsNode = context.toTsNode(node.typeAnnotation);

                const type = context.checker.getTypeAtLocation(tsNode);

                const result = checker.checkType(
                  type,
                  restAnnotationsSet.has(node)
                );

                if ("failed" in result)
                  context.report({
                    data: {
                      definition: context.getTypeDefinitions(result.types),
                      name: utils.getTypeNames(result.types)
                    },
                    messageId,
                    node
                  });
              }
          }
      }
    };
  },
  defaultOptions: {
    ignoreClasses: true,
    ignoreIdentifiers: [],
    ignoreNumberSignature: true,
    ignoreStringSignature: false,
    ignoreTypes: []
  },
  isRuleOptions,
  messages: {
    noMutableNumberSignature:
      "Number signature should be immutable. Failed type name: {{name}}. Failed type definition: {{definition}}",
    noMutableStringSignature:
      "String signature should be immutable. Failed type name: {{name}}. Failed type definition: {{definition}}"
  }
});

export = rule;

/*
|*******************************************************************************
|* Private
|*******************************************************************************
|*/

type MessageId = utils.MessageId<typeof rule>;

interface Signature {
  readonly ignore: boolean;
  readonly messageId: MessageId;
  readonly readonliness: Readonliness;
}
