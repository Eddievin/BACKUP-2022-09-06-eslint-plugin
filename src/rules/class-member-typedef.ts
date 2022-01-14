import { AST_NODE_TYPES } from "@typescript-eslint/utils";

import * as is from "@skylib/functions/dist/guards";

import * as utils from "./utils";

const rule = utils.createRule({
  create(context) {
    return {
      [AST_NODE_TYPES.PropertyDefinition](node): void {
        if (node.typeAnnotation || node.value) {
          // Valid
        } else context.report({ messageId: "typedefRequired", node });
      }
    };
  },
  isRuleOptions: is.object,
  messages: {
    typedefRequired: "Type definition required"
  }
});

export = rule;
