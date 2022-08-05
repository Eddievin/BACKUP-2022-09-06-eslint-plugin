import * as _ from "@skylib/lodash-commonjs-es";
import * as utils from "../../utils";
import { a, is } from "@skylib/functions";
import type { RuleListener } from "@typescript-eslint/utils/dist/ts-eslint";
import type { TSESTree } from "@typescript-eslint/utils";
import type { Writable } from "@skylib/functions";
import path from "node:path";

export interface Options {
  readonly format: utils.casing.Format;
}

export interface SubOptions {
  readonly _id: string;
  readonly format?: utils.casing.Format;
  readonly match: boolean;
  readonly selector: utils.Selector;
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
    { _id: is.string, match: is.boolean, selector: utils.isSelector },
    { format: utils.casing.isFormat }
  ),
  defaultSubOptions: { match: false },
  subOptionsKey: "overrides",
  messages: {
    [MessageId.invalidFilename]: "Expecting file name to be: {{expected}}",
    [MessageId.invalidFilenameId]:
      "Expecting file name to be: {{expected}} ({{_id}})"
  },
  create: (context): RuleListener => {
    const items: Writable<Items> = [];

    return utils.mergeListenters(
      ...context.subOptionsArray.map((subOptions): RuleListener => {
        const selector = a.fromMixed(subOptions.selector).join(", ");

        return {
          [selector]: (node: TSESTree.Node) => {
            items.push({ node, subOptions });
          }
        };
      }),
      {
        "Program:exit": () => {
          const { base: got } = path.parse(context.path);

          if (items.length) {
            const item = a.last(items);

            const { _id, format, match } = {
              format: context.options.format,
              ...item.subOptions
            };

            const expected = got
              .split(".")
              .map((part, index) =>
                index === 0
                  ? utils.casing.format(
                      match ? utils.nodeText(item.node, part) : part,
                      format
                    )
                  : _.kebabCase(part)
              )
              .join(".");

            if (got === expected) {
              // Valid
            } else
              context.report({
                data: { _id, expected },
                loc: context.locZero,
                messageId: MessageId.invalidFilenameId
              });
          } else {
            const { format } = context.options;

            const expected = got
              .split(".")
              .map((part, index) =>
                index === 0
                  ? utils.casing.format(part, format)
                  : _.kebabCase(part)
              )
              .join(".");

            if (got === expected) {
              // Valid
            } else
              context.report({
                data: { expected },
                loc: context.locZero,
                messageId: MessageId.invalidFilename
              });
          }
        }
      }
    );
  }
});

interface Item {
  readonly node: TSESTree.Node;
  readonly subOptions: SubOptions;
}

type Items = readonly Item[];
