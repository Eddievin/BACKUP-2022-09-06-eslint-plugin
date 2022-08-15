import * as ruleTemplates from "../../rule-templates";
import * as utils from "../../utils";

export enum MessageId {
  invalidName = "invalidName"
}

export const onlyExportName = utils.createRule({
  name: "only-export-name",
  messages: {
    [MessageId.invalidName]: "Only export should match file name: {{expected}}"
  },
  create: context =>
    ruleTemplates.export(ctx => {
      if (ctx.onlyExport)
        for (const node of ctx.identifiers) {
          const expected = context.identifierFromPath(
            context.filename,
            node.name
          );

          if ([expected, "default"].includes(node.name)) {
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
