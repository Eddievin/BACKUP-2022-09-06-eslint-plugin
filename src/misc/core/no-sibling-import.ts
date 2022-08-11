import * as utils from "../../utils";
import { a, evaluate, is } from "@skylib/functions";
import fs from "node:fs";
import nodePath from "node:path";
import type { strings } from "@skylib/functions";

export enum MessageId {
  disallowedSource = "disallowedSource"
}

export const isStringsArray = is.factory(is.array.of, is.strings);

export const isSubOptions = is.object.factory<SubOptions>(
  { allow: is.boolean, levels: isStringsArray },
  {}
);

export const noSiblingImport = utils.createRule({
  name: "no-sibling-import",
  isSubOptions: is.object.factory<SubOptions>(
    { allow: is.boolean, levels: isStringsArray },
    {}
  ),
  defaultSubOptions: { allow: false, levels: [] },
  subOptionsKey: "folders",
  messages: {
    [MessageId.disallowedSource]: "Import from this source is not allowed"
  },
  create: context => {
    const path = context.stripExtension(context.path);

    const dir = nodePath.dirname(path);

    const basename = nodePath.basename(path);

    if (basename === "index" || basename.startsWith("index.")) return {};

    const matcher = evaluate(() => {
      if (context.subOptionsArray.length) {
        const subOptions = a.last(context.subOptionsArray);

        if (subOptions.allow) return () => true;

        const index = subOptions.levels.findIndex(level =>
          utils.createFileMatcher(level, false, { dot: true })(`./${basename}`)
        );

        if (index > 0)
          return utils.createFileMatcher(
            subOptions.levels.slice(0, index).flat(),
            false,
            { dot: true }
          );
      }

      return () => false;
    });

    return utils.ruleTemplates.source(ctx => {
      const source = context.stripExtension(ctx.source);

      const parts = source.split("/");

      if (parts.length === 2) {
        const sourceDir = a.first(parts);

        const sourceBasename = a.second(parts);

        const sourcePath = `${dir}/${sourceBasename}`;

        if (sourceDir === ".")
          if (matcher(source) || sourceBasename.startsWith(`${basename}.`)) {
            // Valid
          } else if (
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
    });
  }
});

export interface SubOptions {
  readonly allow: boolean;
  readonly levels: stringsArray;
}

export type stringsArray = readonly strings[];
