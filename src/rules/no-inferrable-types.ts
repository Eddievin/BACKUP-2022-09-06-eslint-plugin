import * as utils from "./utils";
import type { RuleListener } from "@typescript-eslint/utils/dist/ts-eslint";

export enum MessageId {
  triviallyInferrableType = "triviallyInferrableType"
}

export const noInferrableTypes = utils.createRule({
  name: "no-inferrable-types",
  messages: {
    [MessageId.triviallyInferrableType]:
      "Type can be trivially inferred from initializer"
  },
  create: (context): RuleListener => ({
    VariableDeclarator: (node): void => {
      const { id, init } = node;

      if (id.typeAnnotation && init && init.type === "TSAsExpression") {
        const type1 = id.typeAnnotation.typeAnnotation;

        const type2 = init.typeAnnotation;

        const text1 = context.getText(type1);

        const text2 = context.getText(type2);

        if (text1 === text2)
          context.report({
            messageId: MessageId.triviallyInferrableType,
            node
          });
      }
    }
  })
});
