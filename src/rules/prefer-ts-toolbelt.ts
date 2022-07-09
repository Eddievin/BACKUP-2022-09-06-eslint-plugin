import * as utils from "./utils";
import { AST_NODE_TYPES } from "@typescript-eslint/utils";
import type { RuleListener } from "@typescript-eslint/utils/dist/ts-eslint";
import { is } from "@skylib/functions";

export const preferTsToolbelt = utils.createRule({
  name: "prefer-ts-toolbelt",
  isOptions: is.object,
  messages: {
    preferExtends: 'Use "Extends" type from "ts-toolbelt" package instead'
  },
  create: (context): RuleListener => ({
    [AST_NODE_TYPES.TSConditionalType]: (node): void => {
      if (/\binfer\b/u.test(context.getText(node))) {
        // Do not report
      } else context.report({ messageId: "preferExtends", node });
    }
  })
});
