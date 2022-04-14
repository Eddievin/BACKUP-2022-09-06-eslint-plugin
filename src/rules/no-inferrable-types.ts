import { is } from "@skylib/functions";
import { AST_NODE_TYPES } from "@typescript-eslint/utils";
import * as utils from "./utils";

export const noInferrableTypes = utils.createRule({
  create(context) {
    return {
      [AST_NODE_TYPES.VariableDeclarator](node): void {
        const { id, init } = node;

        if (
          id.typeAnnotation &&
          init &&
          init.type === AST_NODE_TYPES.TSAsExpression
        ) {
          const type1 = id.typeAnnotation.typeAnnotation;

          const type2 = init.typeAnnotation;

          const text1 = context.getText(type1);

          const text2 = context.getText(type2);

          if (text1 === text2)
            context.report({ messageId: "triviallyInferrableType", node });
        }
      }
    };
  },
  isRuleOptions: is.object,
  messages: {
    triviallyInferrableType: "Type can be trivially inferred from initializer"
  },
  name: "no-inferrable-types"
});
