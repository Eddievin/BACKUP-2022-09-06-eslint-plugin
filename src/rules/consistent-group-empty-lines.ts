import * as utils from "./utils";
import { Accumulator, Accumulator2, a, is, num, s } from "@skylib/functions";
import type {
  RuleFix,
  RuleListener
} from "@typescript-eslint/utils/dist/ts-eslint";
import type { TSESTree } from "@typescript-eslint/utils";

export interface SubOptions {
  readonly _id: string;
  readonly averageLinesGte: number;
  readonly everyLinesGte: number;
  readonly selector: utils.Selector;
  readonly someHasDocComment: boolean;
  readonly someLinesGte: number;
}

export enum MessageId {
  expectingEmptyLine = "expectingEmptyLine",
  unexpectedEmptyLine = "unexpectedEmptyLine"
}

export const consistentGroupEmptyLines = utils.createRule({
  name: "consistent-group-empty-lines",
  fixable: utils.Fixable.whitespace,
  isSubOptions: is.object.factory<SubOptions>(
    {
      _id: is.string,
      averageLinesGte: is.number,
      everyLinesGte: is.number,
      selector: utils.isSelector,
      someHasDocComment: is.boolean,
      someLinesGte: is.number
    },
    {}
  ),
  defaultSubOptions: {
    averageLinesGte: 1_000_000,
    everyLinesGte: 1_000_000,
    someHasDocComment: false,
    someLinesGte: 1_000_000
  },
  subOptionsKey: "rules",
  messages: {
    [MessageId.expectingEmptyLine]: "Expecting empty line before ({{_id}})",
    [MessageId.unexpectedEmptyLine]: "Unexpected empty line before ({{_id}})"
  },
  create: (context, typeCheck): RuleListener => {
    const childNodesMap = new Accumulator<string, TSESTree.Node>();

    const nodesMap2 = new Accumulator2<string, string, TSESTree.Node>();

    const listener: RuleListener = {
      "*": (node: TSESTree.Node) => {
        utils.buildChildNodesMap(node, childNodesMap);
      },
      "Program:exit": () => {
        for (const subOptions of context.subOptionsArray) {
          const nodesMap = nodesMap2.get(
            a.fromMixed(subOptions.selector).join(", ")
          );

          for (const nodes of nodesMap.values()) {
            // eslint-disable-next-line @skylib/custom/prefer-readonly-array -- Postponed
            const group: TSESTree.Node[] = [];

            for (const node of nodes)
              if (group.length)
                if (utils.isAdjacentNodes(a.last(group), node, childNodesMap))
                  group.push(node);
                else {
                  lintGroup(group, subOptions);
                  a.truncate(group);
                  group.push(node);
                }
              else group.push(node);

            lintGroup(group, subOptions);
          }
        }
      }
    };

    for (const subOptions of context.subOptionsArray)
      listener[a.fromMixed(subOptions.selector).join(", ")] = function (
        node: TSESTree.Node
      ): void {
        const { selector } = subOptions;

        const id = utils.nodeId(node.parent);

        nodesMap2.push(a.fromMixed(selector).join(", "), id, node);
      };

    return listener;

    function lintGroup(
      group: readonly TSESTree.Node[],
      subOptions: SubOptions
    ): void {
      if (group.length > 1) {
        const hasDocComment = subOptions.someHasDocComment
          ? group.some(node => typeCheck.hasLeadingDocComment(node))
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

        const messageId = spread
          ? MessageId.expectingEmptyLine
          : MessageId.unexpectedEmptyLine;

        for (const node of group.slice(1)) {
          const got = typeCheck.getLeadingTrivia(node);

          if (got.includes("\n")) {
            const expected =
              context.eol.repeat(count) + s.trimLeadingEmptyLines(got);

            if (got === expected) {
              // Valid
            } else
              context.report({
                data: { _id: subOptions._id },
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
    }
  }
});
