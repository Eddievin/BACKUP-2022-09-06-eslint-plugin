import * as utils from "./utils";
import { is } from "@skylib/functions";
import { AST_NODE_TYPES } from "@typescript-eslint/utils";
import type { RuleListener } from "@typescript-eslint/utils/dist/ts-eslint";

export const exportAllName = utils.createRule({
  create: (context): RuleListener => {
    return {
      [AST_NODE_TYPES.ExportAllDeclaration]: (node): void => {
        if (node.exported) {
          const expected = utils.getNameFromFilename(
            node.source.value,
            node.exported.name
          );

          if (node.exported.name === expected) {
            // Valid
          } else context.report({ messageId: "invalidName", node });
        }
      }
    };
  },
  isRuleOptions: is.object,
  messages: { invalidName: "Export name should match file name" },
  name: "export-all-name"
});
