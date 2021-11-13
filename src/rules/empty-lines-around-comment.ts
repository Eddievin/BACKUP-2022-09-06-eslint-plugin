import type { TSESTree } from "@typescript-eslint/experimental-utils";
import { AST_NODE_TYPES } from "@typescript-eslint/experimental-utils";

import * as a from "@skylib/functions/dist/array";
import * as is from "@skylib/functions/dist/guards";
import * as s from "@skylib/functions/dist/string";

import * as utils from "./utils";

const rule = utils.createRule({
  create(context) {
    const nodes: TSESTree.Node[] = [];

    return {
      "*"(node: TSESTree.Node): void {
        nodes.push(node);
      },
      "Program:exit"(program: TSESTree.Program): void {
        const eol = context.eol;

        for (const comment of utils.getComments(program)) {
          const {
            inBlockLike,
            multilineComment,
            onSeparateLine,
            prefix,
            suffix
          } = explodeComment(comment, program, nodes, context);

          if (onSeparateLine) {
            if (prefix.programStart) {
              // Should be checked by prettier
            } else {
              const got = prefix.spaces.length > 2;

              const expected =
                inBlockLike && multilineComment && !prefix.blockStart;

              if (expected && !got)
                context.report({
                  fix() {
                    return {
                      range: a.clone(prefix.range),
                      text: `${eol}${eol}${a.last(prefix.spaces)}`
                    };
                  },
                  messageId: "missingEmptyLineBefore",
                  node: comment
                });
            }

            if (suffix.programEnd || suffix.startsWithComment) {
              // Should be checked by prettier or by next comment
            } else {
              const got = suffix.spaces.length > 2;

              const expected =
                inBlockLike && multilineComment && !suffix.blockEnd;

              if (expected && !got)
                context.report({
                  fix() {
                    return {
                      range: a.clone(suffix.range),
                      text: `${eol}${eol}${a.last(suffix.spaces)}`
                    };
                  },
                  messageId: "missingEmptyLineAfter",
                  node: comment
                });

              if (got && !expected)
                context.report({
                  fix() {
                    return {
                      range: a.clone(suffix.range),
                      text: `${context.eol}${a.last(suffix.spaces)}`
                    };
                  },
                  messageId: "unexpectedEmptyLineAfter",
                  node: comment
                });
            }
          }
        }
      }
    };
  },
  fixable: "whitespace",
  isRuleOptions: is.object,
  messages: {
    missingEmptyLineAfter: "Missing empty line after comment",
    missingEmptyLineBefore: "Missing empty line before comment",
    unexpectedEmptyLineAfter: "Unexpected empty line after comment"
  }
});

export = rule;

/*
|*******************************************************************************
|* Private
|*******************************************************************************
|*/

interface CommentInfo {
  readonly inBlockLike: boolean;
  readonly multilineComment: boolean;
  readonly onSeparateLine: boolean;
  readonly prefix: {
    readonly blockStart: boolean;
    readonly programStart: boolean;
    readonly range: utils.ReadonlyRange;
    readonly spaces: readonly string[];
  };
  readonly suffix: {
    readonly blockEnd: boolean;
    readonly programEnd: boolean;
    readonly range: utils.ReadonlyRange;
    readonly spaces: readonly string[];
    readonly startsWithComment: boolean;
  };
}

type Context = utils.Context<MessageId, object, object>;

type MessageId = utils.MessageId<typeof rule>;

const blockLikeTypes: ReadonlySet<string> = new Set([
  AST_NODE_TYPES.BlockStatement,
  AST_NODE_TYPES.ClassBody,
  AST_NODE_TYPES.Program
]);

/**
 * Explodes comment.
 *
 * @param comment - Comment.
 * @param program - Program node.
 * @param programNodes - All nodes.
 * @param context - Context.
 * @returns Comment info.
 */
function explodeComment(
  comment: TSESTree.Comment,
  program: TSESTree.Program,
  programNodes: readonly TSESTree.Node[],
  context: Context
): CommentInfo {
  const range = comment.range;

  const programRange = context.getRangeWithLeadingTrivia(program);

  const node = getNodeContainingRange(range, programNodes);

  const nodeType = node ? node.type : AST_NODE_TYPES.Program;

  const text = context.getText(comment);

  const prefix = context.code.slice(programRange[0], range[0]);

  const prefixSpaces = s.trailingSpaces(prefix);

  const prefixText = prefix.trimEnd();

  const suffix = context.code.slice(range[1], programRange[1]);

  const suffixSpaces = s.leadingSpaces(suffix);

  const suffixText = suffix.trimStart();

  return {
    inBlockLike: blockLikeTypes.has(nodeType),
    multilineComment: text.startsWith("/*") && !text.startsWith("/**"),
    onSeparateLine: prefixSpaces.includes("\n") || prefixText === "",
    prefix: {
      blockStart: prefixText.endsWith("{"),
      programStart: prefixText === "",
      range: [range[0] - prefixSpaces.length, range[0]],
      spaces: s.lines(prefixSpaces)
    },
    suffix: {
      blockEnd: suffixText.startsWith("}"),
      programEnd: suffixText === "",
      range: [range[1], range[1] + suffixSpaces.length],
      spaces: s.lines(suffixSpaces),
      startsWithComment:
        suffixText.startsWith("/*") || suffixText.startsWith("//")
    }
  };
}

/**
 * Gets node containing range.
 *
 * @param range - Range.
 * @param programNodes - All nodes.
 * @returns Node containing range if found, _undefined_ otherwise.
 */
function getNodeContainingRange(
  range: utils.ReadonlyRange,
  programNodes: readonly TSESTree.Node[]
): TSESTree.Node | undefined {
  const nodes = programNodes
    .filter(node => node.range[0] <= range[0] && node.range[1] >= range[1])
    .sort((node1, node2) => {
      const length1 = node1.range[1] - node1.range[0];

      const length2 = node2.range[1] - node2.range[0];

      return Math.sign(length1 - length2);
    });

  return nodes[0];
}
