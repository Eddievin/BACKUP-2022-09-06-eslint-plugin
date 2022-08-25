import * as ruleTemplates from "../../rule-templates";
import * as utils from "../../utils";
import path from "node:path";

export enum MessageId {
  noSelfImport = "noSelfImport"
}

export const noSelfImport = utils.createRule({
  name: "no-self-import",
  messages: { [MessageId.noSelfImport]: "Self-import is not allowed" },
  create: context => {
    const basename = context.stripExtension(path.basename(context.filename));

    return ruleTemplates.source(ctx => {
      const { node, source } = ctx;

      if (
        path.dirname(source) === "." &&
        context.stripExtension(path.basename(source)) === basename
      )
        context.report({ messageId: MessageId.noSelfImport, node });
    });
  }
});
