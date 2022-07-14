import * as utils from "./utils";
import type { RuleListener } from "@typescript-eslint/utils/dist/ts-eslint";

export enum MessageId {
  invalidName = "invalidName"
}

export const onlyExportName = utils.createRule({
  name: "only-export-name",
  messages: {
    [MessageId.invalidName]:
      "Only export should match file name: {{ expected }}"
  },
  create: (context): RuleListener =>
    utils.ruleTemplates.export.create(ctx => {
      if (ctx.onlyExport)
        for (const node of ctx.identifiers) {
          const expected = utils.getIdentifierFromPath(context.path, node.name);

          if (node.name === "default" || node.name === expected) {
            // Valid
          } else
            context.report({
              data: { expected },
              messageId: MessageId.invalidName,
              node
            });
        }
    })
});
