"use strict";
const tslib_1 = require("tslib");
const experimental_utils_1 = require("@typescript-eslint/experimental-utils");
const a = (0, tslib_1.__importStar)(require("@skylib/functions/dist/array"));
const is = (0, tslib_1.__importStar)(require("@skylib/functions/dist/guards"));
const s = (0, tslib_1.__importStar)(require("@skylib/functions/dist/string"));
const utils = (0, tslib_1.__importStar)(require("./utils"));
const rule = utils.createRule({
    create(context) {
        const nodes = [];
        return {
            "*"(node) {
                nodes.push(node);
            },
            "Program:exit"(program) {
                const eol = context.eol;
                for (const comment of utils.getComments(program)) {
                    const { inBlockLike, multilineComment, onSeparateLine, prefix, suffix } = explodeComment(comment, program, nodes, context);
                    if (onSeparateLine) {
                        if (prefix.programStart) {
                            // Should be checked by prettier
                        }
                        else {
                            const got = prefix.spaces.length > 2;
                            const expected = inBlockLike && multilineComment && !prefix.blockStart;
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
                        }
                        else {
                            const got = suffix.spaces.length > 2;
                            const expected = inBlockLike && multilineComment && !suffix.blockEnd;
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
const blockLikeTypes = new Set([
    experimental_utils_1.AST_NODE_TYPES.BlockStatement,
    experimental_utils_1.AST_NODE_TYPES.ClassBody,
    experimental_utils_1.AST_NODE_TYPES.Program
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
function explodeComment(comment, program, programNodes, context) {
    const range = comment.range;
    const programRange = context.getRangeWithLeadingTrivia(program);
    const node = getNodeContainingRange(range, programNodes);
    const nodeType = node ? node.type : experimental_utils_1.AST_NODE_TYPES.Program;
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
            startsWithComment: suffixText.startsWith("/*") || suffixText.startsWith("//")
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
function getNodeContainingRange(range, programNodes) {
    const nodes = programNodes
        .filter(node => node.range[0] <= range[0] && node.range[1] >= range[1])
        .sort((node1, node2) => {
        const length1 = node1.range[1] - node1.range[0];
        const length2 = node2.range[1] - node2.range[0];
        return Math.sign(length1 - length2);
    });
    return nodes[0];
}
module.exports = rule;
//# sourceMappingURL=empty-lines-around-comment.js.map