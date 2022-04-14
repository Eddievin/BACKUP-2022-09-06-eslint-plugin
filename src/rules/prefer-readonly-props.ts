import { fn, is } from "@skylib/functions";
import type { strings } from "@skylib/functions";
import type { Accessibility } from "@typescript-eslint/types/dist/generated/ast-spec";
import type { TSESTree } from "@typescript-eslint/utils";
import { AST_NODE_TYPES } from "@typescript-eslint/utils";
import type { RuleListener } from "@typescript-eslint/utils/dist/ts-eslint";
import * as utils from "./utils";

export const preferReadonlyProps = utils.createRule({
  create(context) {
    const {
      ignoreClasses,
      ignoreIdentifiers,
      ignoreInterfaces,
      ignorePrivateProperties,
      ignoreProtectedProperties,
      ignorePublicProperties,
      ignoreSelectedClasses,
      ignoreSelectedInterfaces
    } = context.options;

    const ignoreAccessebilities = fn.run(() => {
      const result = new Set<Accessibility | undefined>();

      if (ignorePrivateProperties) result.add("private");

      if (ignoreProtectedProperties) result.add("protected");

      if (ignorePublicProperties) result.add("public");

      return result;
    });

    const ignoreIdentifiersMatcher = utils.createMatcher(ignoreIdentifiers);

    const ignoreSelectedClassesMatcher = utils.createMatcher(
      ignoreSelectedClasses
    );

    const ignoreSelectedInterfacesMatcher = utils.createMatcher(
      ignoreSelectedInterfaces
    );

    const listener: RuleListener = {};

    if (ignoreClasses) {
      // Skip
    } else
      listener[AST_NODE_TYPES.ClassDeclaration] = (node): void => {
        if (node.id && ignoreSelectedClassesMatcher(node.id.name)) {
          // Ignore
        } else
          for (const element of node.body.body)
            if (element.type === AST_NODE_TYPES.PropertyDefinition)
              lintNode(element);
      };

    if (ignoreInterfaces) {
      // Skip
    } else
      listener[AST_NODE_TYPES.TSInterfaceDeclaration] = (node): void => {
        if (ignoreSelectedInterfacesMatcher(node.id.name)) {
          // Ignore
        } else
          for (const element of node.body.body)
            if (element.type === AST_NODE_TYPES.TSPropertySignature)
              lintNode(element);
      };

    return listener;

    function lintNode(
      node: TSESTree.PropertyDefinition | TSESTree.TSPropertySignature
    ): void {
      if (node.readonly ?? false) {
        // Valid
      } else if (ignoreAccessebilities.has(node.accessibility)) {
        // Ignore based on accessibility
      } else if (
        node.key.type === AST_NODE_TYPES.Identifier &&
        ignoreIdentifiersMatcher(node.key.name)
      ) {
        // Ignore based on property name
      } else if (
        node.key.type === AST_NODE_TYPES.Literal &&
        is.string(node.key.value) &&
        ignoreIdentifiersMatcher(node.key.value)
      ) {
        // Ignore based on property name
      } else context.report({ messageId: "expectingReadonlyProperty", node });
    }
  },
  defaultOptions: {
    ignoreClasses: false,
    ignoreIdentifiers: [],
    ignoreInterfaces: false,
    ignorePrivateProperties: false,
    ignoreProtectedProperties: false,
    ignorePublicProperties: false,
    ignoreSelectedClasses: [],
    ignoreSelectedInterfaces: []
  },
  isRuleOptions: is.object.factory<RuleOptions>(
    {
      ignoreClasses: is.boolean,
      ignoreIdentifiers: is.strings,
      ignoreInterfaces: is.boolean,
      ignorePrivateProperties: is.boolean,
      ignoreProtectedProperties: is.boolean,
      ignorePublicProperties: is.boolean,
      ignoreSelectedClasses: is.strings,
      ignoreSelectedInterfaces: is.strings
    },
    {}
  ),
  messages: { expectingReadonlyProperty: "Property should be readonly" },
  name: "prefer-readonly-props"
});

interface RuleOptions {
  readonly ignoreClasses: boolean;
  readonly ignoreIdentifiers: strings;
  readonly ignoreInterfaces: boolean;
  readonly ignorePrivateProperties: boolean;
  readonly ignoreProtectedProperties: boolean;
  readonly ignorePublicProperties: boolean;
  readonly ignoreSelectedClasses: strings;
  readonly ignoreSelectedInterfaces: strings;
}
