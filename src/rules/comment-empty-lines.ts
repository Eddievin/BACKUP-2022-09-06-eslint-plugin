import * as utils from "../utils";
import type {
  RuleFix,
  RuleListener
} from "@typescript-eslint/utils/dist/ts-eslint";
import type { TSESTree } from "@typescript-eslint/utils";
import { s } from "@skylib/functions";

export enum MessageId {
  addEmptyLineAfter = "addEmptyLineAfter",
  removeEmptyLineAfter = "removeEmptyLineAfter"
}

export const commentEmptyLines = utils.createRule({
  name: "comment-empty-lines",
  fixable: utils.Fixable.whitespace,
  messages: {
    [MessageId.addEmptyLineAfter]: "Add empty line after comment",
    [MessageId.removeEmptyLineAfter]: "Remove empty line after comment"
  },
  create: (context, typeCheck): RuleListener => ({
    ":statement, TSDeclareFunction, TSExportAssignment": (
      node: TSESTree.Node
    ): void => {
      for (const range of typeCheck.getComments(node)) {
        const multiline = isMultiline(context.code.slice(range[0], range[1]));

        const nextMultiline = isMultiline(context.code.slice(range[1]));

        const spread = multiline && !nextMultiline;

        const got = s.leadingSpaces(context.code.slice(range[1]));

        const expected =
          context.eol.repeat(spread ? 2 : 1) + s.trimLeadingEmptyLines(got);

        if (got === expected) {
          // Valid
        } else
          context.report({
            fix: (): RuleFix => ({
              range: [range[1], range[1] + got.length],
              text: expected
            }),
            loc: context.getLocFromRange(range),
            messageId: spread
              ? MessageId.addEmptyLineAfter
              : MessageId.removeEmptyLineAfter
          });
      }
    }
  })
});

/**
 * Checks if string is multiline comment.
 *
 * @param str - String.
 * @returns _True_ if string is multiline comment, _false_ otherwise.
 */
function isMultiline(str: string): boolean {
  str = str.trimStart();

  return str.startsWith("/*") && !str.startsWith("/**");
}
