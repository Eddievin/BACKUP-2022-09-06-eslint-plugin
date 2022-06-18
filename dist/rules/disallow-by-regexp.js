"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.disallowByRegexp = void 0;
const tslib_1 = require("tslib");
const utils = tslib_1.__importStar(require("./utils"));
const functions_1 = require("@skylib/functions");
const utils_1 = require("@typescript-eslint/utils");
exports.disallowByRegexp = utils.createRule({
    create: context => {
        const stringRanges = [];
        return {
            [utils_1.AST_NODE_TYPES.Literal]: (node) => {
                stringRanges.push(node.range);
            },
            [utils_1.AST_NODE_TYPES.TemplateLiteral]: (node) => {
                stringRanges.push(node.range);
            },
            "Program:exit": (program) => {
                var _a;
                const commentRanges = utils
                    .getComments(program)
                    .map(comment => comment.range);
                for (const subOptions of context.subOptionsArray) {
                    const contexts = (_a = subOptions.contexts) !== null && _a !== void 0 ? _a : context.options.contexts;
                    for (const pattern of subOptions.patterns) {
                        // eslint-disable-next-line security/detect-non-literal-regexp
                        const re = new RegExp(pattern, "u");
                        for (const range of matchAll(re, context))
                            if (contexts.includes(getContext(range, commentRanges, stringRanges)))
                                context.report({
                                    fix: () => functions_1.is.not.empty(subOptions.replacement)
                                        ? [
                                            {
                                                range,
                                                text: context.code
                                                    .slice(...range)
                                                    .replace(re, subOptions.replacement)
                                            }
                                        ]
                                        : [],
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
    isRuleOptions: (0, functions_1.evaluate)(() => {
        const SubOptionsContextVO = (0, functions_1.createValidationObject)({
            code: "code",
            comment: "comment",
            string: "string"
        });
        const isSubOptionsContext = functions_1.is.factory(functions_1.is.enumeration, SubOptionsContextVO);
        const isSubOptionsContexts = functions_1.is.factory(functions_1.is.array.of, isSubOptionsContext);
        return functions_1.is.object.factory({ contexts: isSubOptionsContexts }, {});
    }),
    isSubOptions: (0, functions_1.evaluate)(() => {
        const SubOptionsContextVO = (0, functions_1.createValidationObject)({
            code: "code",
            comment: "comment",
            string: "string"
        });
        const isSubOptionsContext = functions_1.is.factory(functions_1.is.enumeration, SubOptionsContextVO);
        const isSubOptionsContexts = functions_1.is.factory(functions_1.is.array.of, isSubOptionsContext);
        return functions_1.is.object.factory({ patterns: functions_1.is.strings }, { contexts: isSubOptionsContexts, replacement: functions_1.is.string });
    }),
    messages: { disallowedCode: "Disallowed code" },
    name: "disallow-by-regexp"
});
/**
 * Gets suboptions context.
 *
 * @param range - Range.
 * @param commentRanges - Comment ranges.
 * @param stringRanges - String ranges.
 * @returns Suboptions context.
 */
function getContext(range, commentRanges, stringRanges) {
    if (inRanges(range, commentRanges))
        return "comment";
    if (inRanges(range, stringRanges))
        return "string";
    return "code";
}
/**
 * Checks if range belongs to one of ranges.
 *
 * @param range - Range.
 * @param ranges - Ranges.
 * @returns _True_ if range belongs to one of ranges, _false_ otherwise.
 */
function inRanges(range, ranges) {
    return ranges.some(candidate => range[0] >= candidate[0] && range[1] <= candidate[1]);
}
/**
 * Gets ranges matching regular expression.
 *
 * @param re - Regular expression.
 * @param context - Context.
 * @returns Ranges matching regular expression.
 */
function matchAll(re, context) {
    return functions_1.regexp
        .matchAll(context.code, re)
        .map(match => [match.index, match.index + functions_1.a.first(match).length]);
}
//# sourceMappingURL=disallow-by-regexp.js.map