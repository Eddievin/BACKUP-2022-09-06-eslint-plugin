import type { TSESTree } from "@typescript-eslint/utils";
import type { RuleListener } from "@typescript-eslint/utils/dist/ts-eslint";

import * as a from "@skylib/functions/dist/array";
import * as arrayMap from "@skylib/functions/dist/arrayMap";
import * as is from "@skylib/functions/dist/guards";
import * as num from "@skylib/functions/dist/number";
import * as s from "@skylib/functions/dist/string";

import * as utils from "./utils";

interface SubOptions {
  readonly averageLinesGte: number;
  readonly everyLinesGte: number;
  readonly selector: string;
  readonly someHasDocComment: boolean;
  readonly someLinesGte: number;
}

const isSubOptions = is.object.of.factory<SubOptions>(
  {
    averageLinesGte: is.number,
    everyLinesGte: is.number,
    selector: is.string,
    someHasDocComment: is.boolean,
    someLinesGte: is.number
  },
  {}
);

const rule = utils.createRule({
  create(context) {
    const childNodesMap = new Map<string, TSESTree.Node[]>();

    const nodesMap2 = new Map<string, Map<string, TSESTree.Node[]>>();

    const listener: RuleListener = {
      "*"(node: TSESTree.Node) {
        utils.buildChildNodesMap(node, childNodesMap);
      },
      "Program:exit"() {
        for (const subOptions of context.subOptionsArray) {
          const nodesMap = nodesMap2.get(subOptions.selector);

          if (nodesMap)
            for (const nodes of nodesMap.values()) {
              const group: TSESTree.Node[] = [];

              for (const node of nodes)
                if (group.length)
                  if (utils.isAdjacentNodes(a.last(group), node, childNodesMap))
                    group.push(node);
                  else {
                    lintGroup(group, subOptions, context);
                    a.truncate(group);
                    group.push(node);
                  }
                else group.push(node);

              lintGroup(group, subOptions, context);
            }
        }
      }
    };

    for (const subOptions of context.subOptionsArray)
      listener[subOptions.selector] = function (node: TSESTree.Node): void {
        const selector = subOptions.selector;

        const id = utils.getNodeId(node.parent);

        arrayMap.push2(selector, id, node, nodesMap2);
      };

    return listener;
  },
  defaultSubOptions: {
    averageLinesGte: 1_000_000,
    everyLinesGte: 1_000_000,
    someHasDocComment: false,
    someLinesGte: 1_000_000
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

type Context = utils.Context<MessageId, object, SubOptions>;

type MessageId = utils.MessageId<typeof rule>;

/**
 * Lints group.
 *
 * @param group - Nodes.
 * @param subOptions - Suboptions.
 * @param context - Context.
 */
function lintGroup(
  group: readonly TSESTree.Node[],
  subOptions: SubOptions,
  context: Context
): void {
  if (group.length > 1) {
    const hasDocComment = subOptions.someHasDocComment
      ? group.some(node => context.hasLeadingDocComment(node))
      : false;

    const linesPerNode = group
      .map(node => context.getText(node))
      .map(text => s.lines(text).length);

    const averageLines = num.average(...linesPerNode);

    const minLines = Math.min(...linesPerNode);

    const maxLines = Math.max(...linesPerNode);

    const spread =
      hasDocComment ||
      averageLines >= subOptions.averageLinesGte ||
      minLines >= subOptions.everyLinesGte ||
      maxLines >= subOptions.someLinesGte;

    const count = spread ? 2 : 1;

    const messageId = spread ? "expectingEmptyLine" : "unexpectedEmptyLine";

    for (const node of group.slice(1)) {
      const got = context.getLeadingTrivia(node);

      if (got.includes("\n")) {
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
}
