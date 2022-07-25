import * as utils from "../../utils";
import { a, is } from "@skylib/functions";
import fs from "node:fs";
import nodePath from "node:path";
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
  create: context => {
    const { exclusions } = context.options;

    const fileDir = nodePath.dirname(context.path);

    const fileBasename = nodePath.basename(context.path);

    return fileBasename.startsWith("index.")
      ? {}
      : utils.ruleTemplates.source(ctx => {
          const source = ctx.source.split("/");

          if (source.length === 2) {
            const sourceDir = a.first(source);

            const sourceBasename = a.second(source);

            const path = `${fileDir}/${sourceBasename}`;

            if (sourceDir === ".")
              if (exclusions.includes(sourceBasename)) {
                // Valid
              } else if (
                fs.existsSync(path) &&
                fs.statSync(path).isDirectory()
              ) {
                // Valid
              } else
                context.report({
                  messageId: MessageId.disallowedSource,
                  node: ctx.node
                });
          }
        });
  }
});
