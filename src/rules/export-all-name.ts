import * as utils from "./utils";
import { AST_NODE_TYPES } from "@typescript-eslint/utils";
import type { RuleListener } from "@typescript-eslint/utils/dist/ts-eslint";
import { is } from "@skylib/functions";

export const exportAllName = utils.createRule({
  name: "export-all-name",
  isOptions: is.object,
  messages: { invalidName: "Export name should match file name" },
  create: (context): RuleListener => ({
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
  })
});
