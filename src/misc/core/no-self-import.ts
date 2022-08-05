import * as utils from "../../utils";
import path from "node:path";

export enum MessageId {
  // eslint-disable-next-line @typescript-eslint/no-shadow -- Wait for https://github.com/typescript-eslint/typescript-eslint/issues/5337
  noSelfImport = "noSelfImport"
}

export const noSelfImport = utils.createRule({
  name: "no-self-import",
  messages: { [MessageId.noSelfImport]: "Self-import is not allowed" },
  create: context => {
    const basename = context.stripExtension(path.basename(context.path));

    return utils.ruleTemplates.source(ctx => {
      if (
        path.dirname(ctx.source) === "." &&
        context.stripExtension(path.basename(ctx.source)) === basename
      )
        context.report({ messageId: MessageId.noSelfImport, node: ctx.node });
    });
  }
});
