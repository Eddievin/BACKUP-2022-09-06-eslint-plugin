import * as utils from "../../utils";
import type { RuleListener } from "@typescript-eslint/utils/dist/ts-eslint";

export enum MessageId {
  invalidName = "invalidName"
}

export const exportAllName = utils.createRule({
  name: "export-all-name",
  messages: { [MessageId.invalidName]: "Export name should match source" },
  create: (context): RuleListener => ({
    ExportAllDeclaration: node => {
      if (node.exported) {
        const got = node.exported.name;

        const expected = utils.getIdentifierFromPath(node.source.value, got);

        if (got === expected) {
          // Valid
        } else context.report({ messageId: MessageId.invalidName, node });
      }
    }
  })
});
