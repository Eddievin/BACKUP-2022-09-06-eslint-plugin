import * as utils from "./utils";
import { ReadonlySet } from "@skylib/functions";
import type { RuleListener } from "@typescript-eslint/utils/dist/ts-eslint";

export enum MessageId {
  invalidType = "invalidType"
}

export const arrayCallbackReturnType = utils.createRule({
  name: "array-callback-return-type",
  vue: true,
  messages: { [MessageId.invalidType]: "Expecting boolean return type" },
  create: (context): RuleListener => {
    const arrayCallbacks = new ReadonlySet(["some", "every"]);

    return {
      CallExpression: (node): void => {
        const callee = node.callee;

        if (
          callee.type === "MemberExpression" &&
          callee.property.type === "Identifier" &&
          arrayCallbacks.has(callee.property.name) &&
          context.typeCheck.isArray(callee.object)
        ) {
          const argument = node.arguments[0];

          if (
            argument &&
            !context.typeCheck
              .getCallSignatures(argument)
              .every(signature =>
                context.typeCheck.isBoolish(
                  context.checker.getReturnTypeOfSignature(signature)
                )
              )
          )
            context.report({
              messageId: MessageId.invalidType,
              node: argument
            });
        }
      }
    };
  }
});
