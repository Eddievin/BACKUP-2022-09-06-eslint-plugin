import * as utils from "./utils";
import { is } from "@skylib/functions";
import { AST_NODE_TYPES } from "@typescript-eslint/utils";
import type { RuleListener } from "@typescript-eslint/utils/dist/ts-eslint";

export const preferTsToolbelt = utils.createRule({
  create: (context): RuleListener => ({
    [AST_NODE_TYPES.TSConditionalType]: (node): void => {
      if (/\binfer\b/u.test(context.getText(node))) {
        // Do not report
      } else context.report({ messageId: "preferExtends", node });
    }
  }),
  isRuleOptions: is.object,
  messages: {
    preferExtends: 'Use "Extends" type from "ts-toolbelt" package instead'
  },
  name: "prefer-ts-toolbelt"
});
