import * as utils from "./utils";
import type { RuleListener } from "@typescript-eslint/utils/dist/ts-eslint";

export enum MessageId {
  invalidExport = "invalidExport"
}

export const primaryExportOnly = utils.createRule({
  name: "primary-export-only",
  messages: { [MessageId.invalidExport]: "Primary export should be only one" },
  create: (context): RuleListener =>
    utils.ruleTemplates.export.create(ctx => {
      const primary = ctx.identifiers.find(
        node =>
          node.name === utils.getIdentifierFromPath(context.path, node.name)
      );

      if (primary)
        if (ctx.onlyExport) {
          // Valid
        } else
          context.report({ messageId: MessageId.invalidExport, node: primary });
    })
});
