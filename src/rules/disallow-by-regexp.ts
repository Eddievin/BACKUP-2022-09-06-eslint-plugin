import type { TSESTree } from "@typescript-eslint/utils";
import { AST_NODE_TYPES } from "@typescript-eslint/utils";

import * as a from "@skylib/functions/dist/array";
import * as is from "@skylib/functions/dist/guards";
import * as regexp from "@skylib/functions/dist/regexp";
import { createValidationObject } from "@skylib/functions/dist/types/core";

import * as utils from "./utils";

type SubOptionsContext = "code" | "comment" | "string";

const SubOptionsContextVO = createValidationObject<SubOptionsContext>({
  code: "code",
  comment: "comment",
  string: "string"
});

const isSubOptionsContext = is.factory(is.enumeration, SubOptionsContextVO);

const isSubOptionsContexts = is.factory(is.array.of, isSubOptionsContext);

interface RuleOptions {
  readonly contexts: readonly SubOptionsContext[];
}

const isRuleOptions: is.Guard<RuleOptions> = is.factory(
  is.object.of,
  { contexts: isSubOptionsContexts },
  {}
);

interface SubOptions {
  readonly contexts?: readonly SubOptionsContext[];
  readonly patterns: readonly string[];
  readonly replacement?: string;
}

const isSubOptions: is.Guard<SubOptions> = is.factory(
  is.object.of,
  { patterns: is.strings },
  { contexts: isSubOptionsContexts, replacement: is.string }
);

const rule = utils.createRule({
  create(context) {
    const strings: utils.ReadonlyRange[] = [];

    return {
      [AST_NODE_TYPES.Literal](node): void {
        strings.push(node.range);
      },
      [AST_NODE_TYPES.TemplateLiteral](node): void {
        strings.push(node.range);
      },
      "Program:exit"(program: TSESTree.Program): void {
        const comments = utils
          .getComments(program)
          .map(comment => comment.range);

        for (const subOptions of context.subOptionsArray) {
          const contexts = subOptions.contexts ?? context.options.contexts;

          for (const pattern of subOptions.patterns) {
            const re = new RegExp(pattern, "u");

            for (const range of matchAll(re, context))
              if (contexts.includes(getContext(range, comments, strings)))
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
  defaultOptions: {
    contexts: ["code", "comment", "string"]
  },
  fixable: "code",
  isRuleOptions,
  isSubOptions,
  messages: {
    disallowedCode: "Disallowed code"
  }
});

export = rule;

/*
|*******************************************************************************
|* Private
|*******************************************************************************
|*/

type Context = utils.Context<MessageId, RuleOptions, SubOptions>;

type MessageId = utils.MessageId<typeof rule>;

/**
 * Gets suboptions context.
 *
 * @param range - Range.
 * @param comments - Comment ranges.
 * @param strings - String ranges.
 * @returns Suboptions context.
 */
function getContext(
  range: utils.ReadonlyRange,
  comments: readonly utils.ReadonlyRange[],
  strings: readonly utils.ReadonlyRange[]
): SubOptionsContext {
  if (inRanges(range, comments)) return "comment";

  if (inRanges(range, strings)) return "string";

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
