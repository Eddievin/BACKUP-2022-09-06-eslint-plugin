import * as utils from "../utils";
import fs from "node:fs";
import { is } from "@skylib/functions";
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
  create: context =>
    utils.ruleTemplates.source(ctx => {
      if (nodePath.dirname(ctx.source) === ".") {
        const { exclusions } = context.options;

        const basename = nodePath.basename(ctx.source);

        const path = `${nodePath.dirname(context.path)}/${basename}`;

        if (exclusions.includes(basename)) {
          // Valid
        } else if (fs.existsSync(path) && fs.statSync(path).isDirectory()) {
          // Valid
        } else
          context.report({
            messageId: MessageId.disallowedSource,
            node: ctx.node
          });
      }
    })
});
