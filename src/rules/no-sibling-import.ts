import * as utils from "./utils";
import fs from "node:fs";
import { is } from "@skylib/functions";
import path from "node:path";
import type { strings } from "@skylib/functions";

export interface Options {
  readonly exclusions: strings;
}

export enum MessageId {
  disallowedSource = "disallowedSource"
}

export const noSiblingImport = utils.createRule({
  name: "no-sibling-import",
  isOptions: is.object.factory<Options>({ exclusions: is.strings }, {}),
  defaultOptions: { exclusions: [] },
  messages: {
    [MessageId.disallowedSource]: "Import from this source is not allowed"
  },
  create: context =>
    utils.ruleTemplates.source(ctx => {
      if (path.dirname(ctx.source) === ".") {
        const basename = path.basename(ctx.source);

        if (context.options.exclusions.includes(basename)) {
          // Valid
        } else {
          const sourcePath = `${path.dirname(context.path)}/${basename}`;

          if (
            fs.existsSync(sourcePath) &&
            fs.statSync(sourcePath).isDirectory()
          ) {
            // Valid
          } else
            context.report({
              messageId: MessageId.disallowedSource,
              node: ctx.node
            });
        }
      }
    })
});
