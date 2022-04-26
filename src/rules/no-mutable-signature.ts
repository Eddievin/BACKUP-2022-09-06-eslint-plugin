import * as utils from "./utils";
import { is } from "@skylib/functions";
import { AST_NODE_TYPES } from "@typescript-eslint/utils";
import type { strings } from "@skylib/functions";
import type { TSESTree } from "@typescript-eslint/utils";

export const noMutableSignature = utils.createRule({
  create(context) {
    const {
      ignoreClasses,
      ignoreIdentifiers,
      ignoreInterfaces,
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
            const checker = new utils.Checker({
              context,
              ignoreClasses,
              ignoreInterfaces,
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
                  node,
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
    ignoreClasses: false,
    ignoreIdentifiers: [],
    ignoreInterfaces: false,
    ignoreNumberSignature: false,
    ignoreStringSignature: false,
    ignoreTypes: []
  },
  isRuleOptions: is.object.factory<RuleOptions>(
    {
      ignoreClasses: is.boolean,
      ignoreIdentifiers: is.strings,
      ignoreInterfaces: is.boolean,
      ignoreNumberSignature: is.boolean,
      ignoreStringSignature: is.boolean,
      ignoreTypes: is.strings
    },
    {}
  ),
  messages: {
    noMutableNumberSignature:
      "Number signature should be immutable. Failed type name: {{name}}. Failed type definition: {{definition}}",
    noMutableStringSignature:
      "String signature should be immutable. Failed type name: {{name}}. Failed type definition: {{definition}}"
  },
  name: "no-mutable-signature"
});

type MessageId = utils.MessageId<typeof noMutableSignature>;

interface RuleOptions {
  readonly ignoreClasses: boolean;
  readonly ignoreIdentifiers: strings;
  readonly ignoreInterfaces: boolean;
  readonly ignoreNumberSignature: boolean;
  readonly ignoreStringSignature: boolean;
  readonly ignoreTypes: strings;
}

interface Signature {
  readonly ignore: boolean;
  readonly messageId: MessageId;
  readonly readonliness: utils.Checker.Readonliness;
}
