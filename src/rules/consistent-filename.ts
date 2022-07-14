import * as _ from "@skylib/lodash-commonjs-es";
import * as utils from "./utils";
import { is, o } from "@skylib/functions";
import type { RuleListener } from "@typescript-eslint/utils/dist/ts-eslint";
import type { TSESTree } from "@typescript-eslint/utils";
import path from "node:path";
import type { stringU } from "@skylib/functions";

export interface Options {
  readonly format: utils.casing.Format;
}

export interface SubOptions {
  readonly _id: string;
  readonly format?: utils.casing.Format;
  readonly match?: boolean;
  readonly selector: string;
}

export enum MessageId {
  invalidFilename = "invalidFilename",
  invalidFilenameId = "invalidFilenameId"
}

export const consistentFilename = utils.createRule({
  name: "consistent-filename",
  vue: true,
  isOptions: is.object.factory<Options>({ format: utils.casing.isFormat }, {}),
  defaultOptions: { format: utils.casing.Format.kebabCase },
  isSubOptions: is.object.factory<SubOptions>(
    { _id: is.string, selector: is.string },
    { format: utils.casing.isFormat, match: is.boolean }
  ),
  subOptionsKey: "overrides",
  messages: {
    [MessageId.invalidFilename]: "Expecting file name to be: {{ expected }}",
    [MessageId.invalidFilenameId]:
      "Expecting file name to be: {{ expected }} ({{ id }})"
  },
  create: (context): RuleListener => {
    let _id: stringU;

    let format = context.options.format;

    let name: stringU;

    return {
      ...o.fromEntries(
        context.subOptionsArray.map(subOptions => {
          const {
            _id: newId,
            format: newFormat,
            match,
            selector
          } = {
            format,
            match: false,
            ...subOptions
          };

          return [
            selector,
            (node: TSESTree.Node) => {
              _id = newId;
              format = newFormat;

              if (match) name = utils.nodeToString(node, context);
            }
          ];
        })
      ),
      "Program:exit": (): void => {
        const { base } = path.parse(context.path);

        const expected = base
          .split(".")
          .map((part, index) =>
            index === 0
              ? utils.casing.format(name ?? part, format)
              : _.kebabCase(part)
          )
          .join(".");

        if (base === expected) {
          // Valid
        } else
          context.report(
            is.not.empty(_id)
              ? {
                  data: { _id, expected },
                  loc: context.locZero,
                  messageId: MessageId.invalidFilenameId
                }
              : {
                  data: { expected },
                  loc: context.locZero,
                  messageId: MessageId.invalidFilename
                }
          );
      }
    };
  }
});
