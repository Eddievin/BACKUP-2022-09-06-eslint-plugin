import * as utils from "./utils";
import { Accumulator, Accumulator2, a, is, num, s } from "@skylib/functions";
import type { Writable } from "@skylib/functions";
import type { TSESTree } from "@typescript-eslint/utils";
import type { RuleListener } from "@typescript-eslint/utils/dist/ts-eslint";

export const consistentGroupEmptyLines = utils.createRule({
  create: context => {
    const childNodesMap = new Accumulator<string, TSESTree.Node>();

    const nodesMap2 = new Accumulator2<string, string, TSESTree.Node>();

    const listener: RuleListener = {
      "*": (node: TSESTree.Node) => {
        utils.buildChildNodesMap(node, childNodesMap);
      },
      "Program:exit": () => {
        for (const subOptions of context.subOptionsArray) {
          const nodesMap = nodesMap2.get(subOptions.selector);

          for (const nodes of nodesMap.values()) {
            const group: Writable<readonly TSESTree.Node[]> = [];

            for (const node of nodes)
              if (group.length > 0)
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
        const { selector } = subOptions;

        const id = utils.getNodeId(node.parent);

        nodesMap2.push(selector, id, node);
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
  isSubOptions: is.object.factory<SubOptions>(
    {
      _id: is.string,
      averageLinesGte: is.number,
      everyLinesGte: is.number,
      selector: is.string,
      someHasDocComment: is.boolean,
      someLinesGte: is.number
    },
    {}
  ),
  messages: {
    expectingEmptyLine: "Expecting empty line before ({{ _id }})",
    unexpectedEmptyLine: "Unexpected empty line before ({{ _id }})"
  },
  name: "consistent-group-empty-lines"
});

type Context = utils.Context<MessageId, object, SubOptions>;

type MessageId = utils.MessageId<typeof consistentGroupEmptyLines>;

interface SubOptions {
  readonly _id: string;
  readonly averageLinesGte: number;
  readonly everyLinesGte: number;
  readonly selector: string;
  readonly someHasDocComment: boolean;
  readonly someLinesGte: number;
}

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

        if (got === expected) {
          // Valid
        } else
          context.report({
            data: { _id: subOptions._id },
            fix: () => [
              {
                range: [node.range[0] - got.length, node.range[0]],
                text: expected
              }
            ],
            messageId,
            node
          });
      }
    }
  }
}
