import * as a from "@skylib/functions/dist/array";
import * as is from "@skylib/functions/dist/guards";
import { createValidationObject } from "@skylib/functions/dist/helpers";
import * as regexp from "@skylib/functions/dist/regexp";
import type { strings } from "@skylib/functions/dist/types/core";
import { AST_NODE_TYPES } from "@typescript-eslint/utils";
import type { TSESTree } from "@typescript-eslint/utils";
import * as utils from "./utils";

const SubOptionsContextVO = createValidationObject<SubOptionsContext>({
  code: "code",
  comment: "comment",
  string: "string"
});

const isSubOptionsContext = is.factory(is.enumeration, SubOptionsContextVO);

const isSubOptionsContexts = is.factory(is.array.of, isSubOptionsContext);

const isRuleOptions = is.object.factory<RuleOptions>(
  { contexts: isSubOptionsContexts },
  {}
);

const isSubOptions = is.object.factory<SubOptions>(
  { patterns: is.strings },
  { contexts: isSubOptionsContexts, replacement: is.string }
);

const rule = utils.createRule({
  create(context) {
    const stringRanges: utils.ReadonlyRange[] = [];

    return {
      [AST_NODE_TYPES.Literal](node): void {
        stringRanges.push(node.range);
      },
      [AST_NODE_TYPES.TemplateLiteral](node): void {
        stringRanges.push(node.range);
      },
      "Program:exit"(program: TSESTree.Program): void {
        const commentRanges = utils
          .getComments(program)
          .map(comment => comment.range);

        for (const subOptions of context.subOptionsArray) {
          const contexts = subOptions.contexts ?? context.options.contexts;

          for (const pattern of subOptions.patterns) {
            // eslint-disable-next-line security/detect-non-literal-regexp
            const re = new RegExp(pattern, "u");

            for (const range of matchAll(re, context))
              if (
                contexts.includes(
                  getContext(range, commentRanges, stringRanges)
                )
              )
                context.report({
                  fix() {
                    return is.not.empty(subOptions.replacement)
                      ? [
                          {
                            range,
                            text: context.code
                              .slice(...range)
                              .replace(re, subOptions.replacement)
                          }
                        ]
                      : [];
                  },
                  loc: context.getLocFromRange(range),
                  messageId: "disallowedCode"
                });
          }
        }
      }
    };
  },
  defaultOptions: { contexts: ["code", "comment", "string"] },
  fixable: "code",
  isRuleOptions,
  isSubOptions,
  messages: { disallowedCode: "Disallowed code" },
  name: "disallow-by-regexp"
});

export = rule;

type Context = utils.Context<MessageId, RuleOptions, SubOptions>;

type MessageId = utils.MessageId<typeof rule>;

interface RuleOptions {
  readonly contexts: readonly SubOptionsContext[];
}

interface SubOptions {
  readonly contexts?: readonly SubOptionsContext[];
  readonly patterns: strings;
  readonly replacement?: string;
}

type SubOptionsContext = "code" | "comment" | "string";

/**
 * Gets suboptions context.
 *
 * @param range - Range.
 * @param commentRanges - Comment ranges.
 * @param stringRanges - String ranges.
 * @returns Suboptions context.
 */
function getContext(
  range: utils.ReadonlyRange,
  commentRanges: readonly utils.ReadonlyRange[],
  stringRanges: readonly utils.ReadonlyRange[]
): SubOptionsContext {
  if (inRanges(range, commentRanges)) return "comment";

  if (inRanges(range, stringRanges)) return "string";

  return "code";
}

/**
 * Checks that range belongs to one of ranges.
 *
 * @param range - Range.
 * @param ranges - Ranges.
 * @returns _True_ if range belongs to one of ranges, _false_ otherwise.
 */
function inRanges(
  range: utils.ReadonlyRange,
  ranges: readonly utils.ReadonlyRange[]
): boolean {
  return ranges.some(
    candidate => range[0] >= candidate[0] && range[1] <= candidate[1]
  );
}

/**
 * Gets ranges matching regular expression.
 *
 * @param re - Regular expression.
 * @param context - Context.
 * @returns Ranges matching regular expression.
 */
function matchAll(re: RegExp, context: Context): TSESTree.Range[] {
  return regexp
    .matchAll(context.code, re)
    .map(match => [match.index, match.index + a.first(match).length]);
}
