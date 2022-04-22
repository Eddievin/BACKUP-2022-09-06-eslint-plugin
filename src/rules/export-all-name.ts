import { is } from "@skylib/functions";
import { AST_NODE_TYPES } from "@typescript-eslint/utils";
import * as utils from "./utils";

export const exportAllName = utils.createRule({
  create(context) {
    return {
      [AST_NODE_TYPES.ExportAllDeclaration](node): void {
        if (node.exported && node.source) {
          const expected = utils.getNameFromFilename(node.source.value);

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
