import * as _ from "@skylib/lodash-commonjs-es";
import * as utils from "./utils";
import { Accumulator, a, evaluate, is, s } from "@skylib/functions";
import type {
  RuleFix,
  RuleListener
} from "@typescript-eslint/utils/dist/ts-eslint";
import type { Writable, stringU } from "@skylib/functions";
import type { TSESTree } from "@typescript-eslint/utils";

export interface SubOptions {
  readonly _id: string;
  readonly emptyLine: EmptyLine;
  readonly next: string;
  readonly prev: string;
}

export enum EmptyLine {
  always = "always",
  any = "any",
  never = "never"
}

export const isEmptyLine = is.factory(is.enumeration, EmptyLine);

export enum MessageId {
  expectingEmptyLine = "expectingEmptyLine",
  unexpectedEmptyLine = "unexpectedEmptyLine"
}

export const consistentEmptyLines = utils.createRule({
  name: "consistent-empty-lines",
  fixable: utils.Fixable.whitespace,
  isSubOptions: is.object.factory<SubOptions>(
    {
      _id: is.string,
      emptyLine: isEmptyLine,
      next: is.string,
      prev: is.string
    },
    {}
  ),
  subOptionsKey: "rules",
  messages: {
    [MessageId.expectingEmptyLine]: "Expecting empty line before ({{ _id }})",
    [MessageId.unexpectedEmptyLine]: "Unexpected empty line before ({{ _id }})"
  },
  create: (context): RuleListener => {
    const childNodesMap = new Accumulator<string, TSESTree.Node>();

    const prevRuleIndexes = new Accumulator<string, number>();

    const nextRuleIndexes = new Accumulator<string, number>();

    const prevItems: Writable<Items> = [];

    const nextItems: Writable<Items> = [];

    const listener: RuleListener = {
      "*": (node: TSESTree.Node) => {
        utils.buildChildNodesMap(node, childNodesMap);
      },
      "Program:exit": () => {
        prevItems.sort((item1, item2) => item1.ruleIndex - item2.ruleIndex);
        nextItems.sort((item1, item2) => item1.ruleIndex - item2.ruleIndex);

        const items = _.uniq(
          a.fromIterable(
            evaluate(function* (): Generator<Item> {
              for (const prevItem of prevItems)
                for (const nextItem of nextItems)
                  if (
                    prevItem.ruleIndex === nextItem.ruleIndex &&
                    utils.isAdjacentNodes(
                      prevItem.node,
                      nextItem.node,
                      childNodesMap
                    )
                  )
                    yield nextItem;
            })
          )
        );

        for (const item of items) {
          const emptyLine = a.get(
            context.subOptionsArray,
            item.ruleIndex
          ).emptyLine;

          if (emptyLine === "any") {
            // Skip check
          } else {
            const node = item.node;

            const spread = evaluate(() => {
              switch (emptyLine) {
                case EmptyLine.always:
                  return true;

                case EmptyLine.never:
                  return false;
              }
            });

            const count = spread ? 2 : 1;

            const messageId = spread
              ? MessageId.expectingEmptyLine
              : MessageId.unexpectedEmptyLine;

            const got = context.getLeadingTrivia(node);

            const expected =
              context.eol.repeat(count) + s.trimLeadingEmptyLines(got);

            if (got === expected) {
              // Valid
            } else
              context.report({
                data: { _id: item._id },
                fix: (): RuleFix => ({
                  range: [node.range[0] - got.length, node.range[0]],
                  text: expected
                }),
                messageId,
                node
              });
          }
        }
      }
    };

    for (const [ruleIndex, subOptions] of context.subOptionsArray.entries()) {
      prevRuleIndexes.push(subOptions.prev, ruleIndex);
      nextRuleIndexes.push(subOptions.next, ruleIndex);
    }

    for (const subOptions of context.subOptionsArray)
      for (const selector of [subOptions.prev, subOptions.next])
        listener[selector] = (node: TSESTree.Node): void => {
          for (const ruleIndex of prevRuleIndexes.get(selector))
            prevItems.push({
              _id: subOptions._id,
              node,
              ruleIndex
            });

          for (const ruleIndex of nextRuleIndexes.get(selector))
            nextItems.push({
              _id: subOptions._id,
              node,
              ruleIndex
            });
        };

    return listener;

    interface Item {
      // eslint-disable-next-line @skylib/optional-property-style -- Temp
      readonly _id: stringU;
      readonly node: TSESTree.Node;
      readonly ruleIndex: number;
    }

    type Items = readonly Item[];
  }
});
