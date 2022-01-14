import { AST_NODE_TYPES } from "@typescript-eslint/utils";
import type { RuleModule } from "@typescript-eslint/utils/dist/ts-eslint";

import * as a from "@skylib/functions/dist/array";
import * as is from "@skylib/functions/dist/guards";

import * as utils from ".";
import type { Readonliness } from "./readonliness";
import { Checker } from "./readonliness";

/**
 * Creates rule.
 *
 * @param isTypeToCheck - Guard.
 * @param readonliness - Readonliness that triggers error.
 * @param messageId - Message ID.
 * @param message - Message.
 * @returns Rule module.
 */
export function createRule<M extends string, T extends string>(
  isTypeToCheck: is.Guard<T>,
  readonliness: Readonliness,
  messageId: M,
  message: string
): RuleModule<M, readonly unknown[]> {
  interface RuleOptions {
    readonly ignoreClasses: boolean;
    readonly ignoreTypes: readonly string[];
  }

  const isRuleOptions: is.Guard<RuleOptions> = is.factory(
    is.object.of,
    {
      ignoreClasses: is.boolean,
      ignoreTypes: is.strings
    },
    {}
  );

  return utils.createRule({
    create(context) {
      const { ignoreClasses, ignoreTypes } = context.options;

      const checker = new Checker({
        context,
        ignoreClasses,
        ignoreTypes,
        readonliness
      });

      return {
        [AST_NODE_TYPES.TSTypeReference](node): void {
          const { typeArguments, typeName } = context.toTsNode(node);

          if (
            isTypeToCheck(typeName.getText()) &&
            typeArguments &&
            typeArguments.length === 1
          ) {
            const typeArgument = a.first(typeArguments);

            const type = context.checker.getTypeFromTypeNode(typeArgument);

            const result = checker.checkType(type);

            if ("passed" in result) context.report({ messageId, node });
          }
        }
      };
    },
    defaultOptions: {
      ignoreClasses: true,
      ignoreTypes: []
    },
    isRuleOptions,
    messages: {
      [messageId]: message
    }
  });
}
