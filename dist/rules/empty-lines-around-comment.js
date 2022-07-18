"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.emptyLinesAroundComment = exports.MessageId = void 0;
const tslib_1 = require("tslib");
const utils = tslib_1.__importStar(require("./utils"));
const functions_1 = require("@skylib/functions");
var MessageId;
(function (MessageId) {
    MessageId["missingEmptyLineAfter"] = "missingEmptyLineAfter";
    MessageId["missingEmptyLineBefore"] = "missingEmptyLineBefore";
    MessageId["unexpectedEmptyLineAfter"] = "unexpectedEmptyLineAfter";
})(MessageId = exports.MessageId || (exports.MessageId = {}));
exports.emptyLinesAroundComment = utils.createRule({
    name: "empty-lines-around-comment",
    fixable: utils.Fixable.whitespace,
    messages: {
        [MessageId.missingEmptyLineAfter]: "Missing empty line after comment",
        [MessageId.missingEmptyLineBefore]: "Missing empty line before comment",
        [MessageId.unexpectedEmptyLineAfter]: "Unexpected empty line after comment"
    },
    create: (context) => {
        // eslint-disable-next-line @skylib/custom/prefer-readonly-array -- Postponed
        const nodes = [];
        return {
            "*": (node) => {
                nodes.push(node);
            },
            "Program:exit": (program) => {
                const eol = context.eol;
                for (const comment of utils.getComments(program)) {
                    const { inBlockLike, multilineComment, onSeparateLine, prefix, suffix } = explodeComment(comment, program, nodes);
                    if (onSeparateLine) {
                        if (prefix.programStart) {
                            // Should be checked by prettier
                        }
                        else {
                            const got = prefix.spaces.length > 2;
                            const expected = inBlockLike && multilineComment && !prefix.blockStart;
                            if (expected && !got)
                                context.report({
                                    fix: () => ({
                                        range: functions_1.a.clone(prefix.range),
                                        text: `${eol}${eol}${functions_1.a.last(prefix.spaces)}`
                                    }),
                                    messageId: MessageId.missingEmptyLineBefore,
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
                                    fix: () => ({
                                        range: functions_1.a.clone(suffix.range),
                                        text: `${eol}${eol}${functions_1.a.last(suffix.spaces)}`
                                    }),
                                    messageId: MessageId.missingEmptyLineAfter,
                                    node: comment
                                });
                            if (got && !expected)
                                context.report({
                                    fix: () => ({
                                        range: functions_1.a.clone(suffix.range),
                                        text: `${context.eol}${functions_1.a.last(suffix.spaces)}`
                                    }),
                                    messageId: MessageId.unexpectedEmptyLineAfter,
                                    node: comment
                                });
                        }
                    }
                }
            }
        };
        function explodeComment(comment, program, programNodes) {
            const range = comment.range;
            const programRange = context.getRangeWithLeadingTrivia(program);
            const node = getNodeContainingRange(range, programNodes);
            const nodeType = node ? node.type : "Program";
            const text = context.getText(comment);
            const prefix = context.code.slice(programRange[0], range[0]);
            const prefixSpaces = functions_1.s.trailingSpaces(prefix);
            const prefixText = prefix.trimEnd();
            const suffix = context.code.slice(range[1], programRange[1]);
            const suffixSpaces = functions_1.s.leadingSpaces(suffix);
            const suffixText = suffix.trimStart();
            return {
                inBlockLike: blockLikeTypes.has(nodeType),
                multilineComment: text.startsWith("/*") && !text.startsWith("/**"),
                onSeparateLine: prefixSpaces.includes("\n") || prefixText === "",
                prefix: {
                    blockStart: prefixText.endsWith("{"),
                    programStart: prefixText === "",
                    range: [range[0] - prefixSpaces.length, range[0]],
                    spaces: functions_1.s.lines(prefixSpaces)
                },
                suffix: {
                    blockEnd: suffixText.startsWith("}"),
                    programEnd: suffixText === "",
                    range: [range[1], range[1] + suffixSpaces.length],
                    spaces: functions_1.s.lines(suffixSpaces),
                    startsWithComment: suffixText.startsWith("/*") || suffixText.startsWith("//")
                }
            };
        }
    }
});
const blockLikeTypes = new functions_1.ReadonlySet([
    "BlockStatement",
    "ClassBody",
    "Program"
]);
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
//# sourceMappingURL=empty-lines-around-comment.js.map