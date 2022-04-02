import type { TSESTree } from "@typescript-eslint/utils";
import type { RuleListener } from "@typescript-eslint/utils/dist/ts-eslint";

import * as a from "@skylib/functions/dist/array";
import * as arrayMap from "@skylib/functions/dist/arrayMap";
import * as fn from "@skylib/functions/dist/function";
import * as is from "@skylib/functions/dist/guards";
import { createValidationObject } from "@skylib/functions/dist/helpers";
import * as s from "@skylib/functions/dist/string";

import * as utils from "./utils";

type EmptyLine = "always" | "any" | "never";

const EmptyLineVO = createValidationObject<EmptyLine>({
  always: "always",
  any: "any",
  never: "never"
});

const isEmptyLine = is.factory(is.enumeration, EmptyLineVO);

interface SubOptions {
  readonly emptyLine: EmptyLine;
  readonly next: string;
  readonly prev: string;
}

const isSubOptions = is.object.of.factory<SubOptions>(
  {
    emptyLine: isEmptyLine,
    next: is.string,
    prev: is.string
  },
  {}
);

const rule = utils.createRule({
  create(context) {
    const childNodesMap = new Map<string, TSESTree.Node[]>();

    const prevRuleIndexes = new Map<string, number[]>();

    const nextRuleIndexes = new Map<string, number[]>();

    const prevItems: Item[] = [];

    const nextItems: Item[] = [];

    const listener: RuleListener = {
      "*"(node: TSESTree.Node) {
        utils.buildChildNodesMap(node, childNodesMap);
      },
      "Program:exit"() {
        const items = new Map<string, Item>();

        prevItems.sort((item1, item2) => item1.ruleIndex - item2.ruleIndex);
        nextItems.sort((item1, item2) => item1.ruleIndex - item2.ruleIndex);

        for (const prevItem of prevItems)
          for (const nextItem of nextItems)
            if (
              prevItem.ruleIndex === nextItem.ruleIndex &&
              utils.isAdjacentNodes(prevItem.node, nextItem.node, childNodesMap)
            )
              items.set(utils.getNodeId(nextItem.node), nextItem);

        for (const item of items.values()) {
          const emptyLine = a.get(
            context.subOptionsArray,
            item.ruleIndex
          ).emptyLine;

          if (emptyLine !== "any") {
            const node = item.node;

            const spread = fn.run(() => {
              switch (emptyLine) {
                case "always":
                  return true;

                case "never":
                  return false;
              }
            });

            const count = spread ? 2 : 1;

            const messageId = spread
              ? "expectingEmptyLine"
              : "unexpectedEmptyLine";

            const got = context.getLeadingTrivia(node);

            const expected =
              context.eol.repeat(count) + s.trimLeadingEmptyLines(got);

            if (got !== expected)
              context.report({
                fix() {
                  return [
                    {
                      range: [node.range[0] - got.length, node.range[0]],
                      text: expected
                    }
                  ];
                },
                messageId,
                node
              });
          }
        }
      }
    };

    for (const [ruleIndex, subOptions] of context.subOptionsArray.entries()) {
      arrayMap.push(subOptions.prev, ruleIndex, prevRuleIndexes);
      arrayMap.push(subOptions.next, ruleIndex, nextRuleIndexes);
    }

    for (const subOptions of context.subOptionsArray)
      for (const selector of [subOptions.prev, subOptions.next])
        listener[selector] = (node: TSESTree.Node): void => {
          for (const ruleIndex of arrayMap.get(selector, prevRuleIndexes))
            prevItems.push({ node, ruleIndex });

          for (const ruleIndex of arrayMap.get(selector, nextRuleIndexes))
            nextItems.push({ node, ruleIndex });
        };

    return listener;
  },
  fixable: "whitespace",
  isRuleOptions: is.object,
  isSubOptions,
  messages: {
    expectingEmptyLine: "Expecting empty line before",
    unexpectedEmptyLine: "Unexpected empty line before"
  }
});

export = rule;

/*
|*******************************************************************************
|* Private
|*******************************************************************************
|*/

interface Item {
  readonly node: TSESTree.Node;
  readonly ruleIndex: number;
}
