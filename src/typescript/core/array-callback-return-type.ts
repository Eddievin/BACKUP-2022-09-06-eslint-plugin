import * as utils from "../../utils";
import { AST_NODE_TYPES } from "@typescript-eslint/utils";
import { ReadonlySet } from "@skylib/functions";
import type { RuleListener } from "@typescript-eslint/utils/dist/ts-eslint";

export enum MessageId {
  invalidType = "invalidType"
}

export const arrayCallbackReturnType = utils.createRule({
  name: "array-callback-return-type",
  vue: true,
  messages: { [MessageId.invalidType]: "Expecting boolean return type" },
  create: (context, typeCheck): RuleListener => ({
    CallExpression: node => {
      const callee = node.callee;

      if (
        callee.type === AST_NODE_TYPES.MemberExpression &&
        callee.property.type === AST_NODE_TYPES.Identifier &&
        arrayCallbacks.has(callee.property.name) &&
        typeCheck.isArray(callee.object)
      ) {
        const argument = node.arguments[0];

        if (argument) {
          const isBoolishReturnType = typeCheck
            .getCallSignatures(argument)
            // eslint-disable-next-line @typescript-eslint/unbound-method -- Wait for @skylib/functions update
            .map(typeCheck.getReturnType)
            .every(typeCheck.isBoolish);

          if (isBoolishReturnType) {
            // Valid
          } else
            context.report({
              messageId: MessageId.invalidType,
              node: argument
            });
        }
      }
    }
  })
});

const arrayCallbacks = new ReadonlySet(["some", "every"]);
