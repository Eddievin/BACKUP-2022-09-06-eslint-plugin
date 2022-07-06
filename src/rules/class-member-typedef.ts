import * as utils from "./utils";
import { is } from "@skylib/functions";
import { AST_NODE_TYPES } from "@typescript-eslint/utils";
import type { RuleListener } from "@typescript-eslint/utils/dist/ts-eslint";

export const classMemberTypedef = utils.createRule({
  create: (context): RuleListener => {
    return {
      [AST_NODE_TYPES.PropertyDefinition]: (node): void => {
        if (node.typeAnnotation || node.value) {
          // Valid
        } else context.report({ messageId: "typedefRequired", node });
      }
    };
  },
  isRuleOptions: is.object,
  messages: { typedefRequired: "Type definition required" },
  name: "class-member-typedef"
});
