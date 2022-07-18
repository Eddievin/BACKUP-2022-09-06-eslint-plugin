import * as _ from "@skylib/lodash-commonjs-es";
import * as utils from "./utils";
import { Accumulator, a, evaluate, is, o, s } from "@skylib/functions";
import type {
  RuleFix,
  RuleFunction,
  RuleListener
} from "@typescript-eslint/utils/dist/ts-eslint";
import type { TSESTree } from "@typescript-eslint/utils";
import type { Writable } from "@skylib/functions";

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
    const childNodes = new Accumulator<string, TSESTree.Node>();

    const prevItems: Writable<Items> = [];

    const nextItems: Writable<Items> = [];

    const listeners = new Accumulator<string, RuleFunction<TSESTree.Node>>();

    for (const [index, subOptions] of context.subOptionsArray.entries()) {
      listeners.push(subOptions.prev, (node: TSESTree.Node): void => {
        prevItems.push({
          index,
          node,
          subOptions
        });
      });

      listeners.push(subOptions.next, (node: TSESTree.Node): void => {
        nextItems.push({
          index,
          node,
          subOptions
        });
      });
    }

    return {
      "*": (node: TSESTree.Node) => {
        utils.buildChildNodesMap(node, childNodes);
      },
      "Program:exit": () => {
        prevItems.sort((item1, item2) => item2.index - item1.index);
        nextItems.sort((item1, item2) => item2.index - item1.index);

        const items = _.uniqBy(
          a.fromIterable(
            evaluate(function* (): Generator<Item> {
              for (const prevItem of prevItems)
                for (const nextItem of nextItems)
                  if (
                    prevItem.index === nextItem.index &&
                    utils.isAdjacentNodes(
                      prevItem.node,
                      nextItem.node,
                      childNodes
                    )
                  )
                    yield nextItem;
            })
          ),
          "node"
        );

        for (const item of items) {
          const emptyLine = item.subOptions.emptyLine;

          if (emptyLine === EmptyLine.any) {
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
                data: { _id: item.subOptions._id },
                fix: (): RuleFix => ({
                  range: [node.range[0] - got.length, node.range[0]],
                  text: expected
                }),
                messageId,
                node
              });
          }
        }
      },
      ...o.fromEntries(
        a.fromIterable(listeners).map(([name, callbacks]) => [
          name,
          (node: TSESTree.Node) => {
            for (const callback of callbacks) callback(node);
          }
        ])
      )
    };
  }
});

interface Item {
  readonly index: number;
  readonly node: TSESTree.Node;
  readonly subOptions: SubOptions;
}

type Items = readonly Item[];
