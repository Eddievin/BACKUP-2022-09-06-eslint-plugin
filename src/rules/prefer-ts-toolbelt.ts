import { AST_NODE_TYPES } from "@typescript-eslint/utils";

import * as is from "@skylib/functions/dist/guards";

import * as utils from "./utils";

const rule = utils.createRule({
  create(context) {
    return {
      [AST_NODE_TYPES.TSConditionalType](node): void {
        if (/\binfer\b/u.test(context.getText(node))) {
          // Do not report
        } else context.report({ messageId: "preferExtends", node });
      }
    };
  },
  isRuleOptions: is.object,
  messages: {
    preferExtends: 'Use "Extends" type from "ts-toolbelt" package instead'
  },
  name: "prefer-ts-toolbelt"
});

export = rule;
