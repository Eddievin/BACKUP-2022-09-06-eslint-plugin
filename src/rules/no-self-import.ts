import * as utils from "../utils";
import { ReadonlySet, is } from "@skylib/functions";
import path from "node:path";
import type { strings } from "@skylib/functions";

export interface Options {
  readonly extensions: strings;
}

export enum MessageId {
  // eslint-disable-next-line @typescript-eslint/no-shadow -- Wait for https://github.com/typescript-eslint/typescript-eslint/issues/5337
  noSelfImport = "noSelfImport"
}

export const noSelfImport = utils.createRule({
  name: "no-self-import",
  isOptions: is.object.factory<Options>({ extensions: is.strings }, {}),
  defaultOptions: { extensions: [".js", ".ts"] },
  messages: { [MessageId.noSelfImport]: "Self-import is not allowed" },
  create: context => {
    const basenames = new ReadonlySet(
      [undefined, ...context.options.extensions].map(extension =>
        path.basename(context.path, extension)
      )
    );

    return utils.ruleTemplates.source(ctx => {
      if (
        path.dirname(ctx.source) === "." &&
        basenames.has(path.basename(ctx.source))
      )
        context.report({ messageId: MessageId.noSelfImport, node: ctx.node });
    });
  }
});
