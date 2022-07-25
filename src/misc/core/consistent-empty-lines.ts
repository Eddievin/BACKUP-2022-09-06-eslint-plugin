import * as _ from "@skylib/lodash-commonjs-es";
import * as utils from "../../utils";
import type {
  RuleFix,
  RuleListener
} from "@typescript-eslint/utils/dist/ts-eslint";
import { a, evaluate, is, s } from "@skylib/functions";
import type { TSESTree } from "@typescript-eslint/utils";
import type { Writable } from "@skylib/functions";

export interface SubOptions {
  readonly _id: string;
  readonly emptyLine: EmptyLine;
  readonly next: utils.Selector;
  readonly prev: utils.Selector;
}

export enum EmptyLine {
  always = "always",
  any = "any",
  never = "never"
}

export const isEmptyLine = is.factory(is.enumeration, EmptyLine);

export enum MessageId {
  addEmptyLine = "addEmptyLine",
  removeEmptyLine = "removeEmptyLine"
}

export const consistentEmptyLines = utils.createRule({
  name: "consistent-empty-lines",
  fixable: utils.Fixable.whitespace,
  isSubOptions: is.object.factory<SubOptions>(
    {
      _id: is.string,
      emptyLine: isEmptyLine,
      next: utils.isSelector,
      prev: utils.isSelector
    },
    {}
  ),
  subOptionsKey: "rules",
  messages: {
    [MessageId.addEmptyLine]: "Add empty line before ({{_id}})",
    [MessageId.removeEmptyLine]: "Remove empty line before ({{_id}})"
  },
  create: (context): RuleListener => {
    const prevItems: Writable<Items> = [];

    const nextItems: Writable<Items> = [];

    return utils.mergeListenters(
      ...context.subOptionsArray.flatMap(
        (subOptions): readonly RuleListener[] => {
          const prev = a.fromMixed(subOptions.prev).join(", ");

          const next = a.fromMixed(subOptions.next).join(", ");

          return [
            {
              [prev]: (node: TSESTree.Node) => {
                prevItems.push({ node, subOptions });
              }
            },
            {
              [next]: (node: TSESTree.Node) => {
                nextItems.push({ node, subOptions });
              }
            }
          ];
        }
      ),
      {
        "Program:exit": () => {
          prevItems.sort(reverseCompare);
          nextItems.sort(reverseCompare);

          const items = _.uniqBy(
            a.fromIterable(
              evaluate(function* (): Generator<Item> {
                for (const prevItem of prevItems)
                  for (const nextItem of nextItems)
                    if (
                      prevItem.subOptions._id === nextItem.subOptions._id &&
                      context.isAdjacentNodes(prevItem.node, nextItem.node)
                    )
                      yield nextItem;
              })
            ),
            "node"
          );

          for (const item of items) {
            const { _id, emptyLine } = item.subOptions;

            if (emptyLine === EmptyLine.any) {
              // Skip check
            } else {
              const { node } = item;

              const spread = evaluate(() => {
                switch (emptyLine) {
                  case EmptyLine.always:
                    return true;

                  case EmptyLine.never:
                    return false;
                }
              });

              const messageId = spread
                ? MessageId.addEmptyLine
                : MessageId.removeEmptyLine;

              const range = context.getLeadingSpaces(node);

              const got = context.getText(range);

              if (got.includes("\n")) {
                const expected =
                  context.eol.repeat(spread ? 2 : 1) +
                  s.trimLeadingEmptyLines(got);

                if (got === expected) {
                  // Valid
                } else
                  context.report({
                    data: { _id },
                    fix: (): RuleFix => ({ range, text: expected }),
                    messageId,
                    node
                  });
              }
            }
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

/**
 * Compares items.
 *
 * @param item1 - First item.
 * @param item2 - Second item.
 * @returns - Comparison result.
 */
function reverseCompare(item1: Item, item2: Item): -1 | 0 | 1 {
  return utils.compare(item2.subOptions._id, item1.subOptions._id);
}
