"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.consistentEmptyLines = exports.MessageId = exports.isEmptyLine = exports.EmptyLine = void 0;
const tslib_1 = require("tslib");
const _ = tslib_1.__importStar(require("@skylib/lodash-commonjs-es"));
const utils = tslib_1.__importStar(require("../../utils"));
const functions_1 = require("@skylib/functions");
var EmptyLine;
(function (EmptyLine) {
    EmptyLine["always"] = "always";
    EmptyLine["any"] = "any";
    EmptyLine["never"] = "never";
})(EmptyLine = exports.EmptyLine || (exports.EmptyLine = {}));
exports.isEmptyLine = functions_1.is.factory(functions_1.is.enumeration, EmptyLine);
var MessageId;
(function (MessageId) {
    MessageId["addEmptyLine"] = "addEmptyLine";
    MessageId["removeEmptyLine"] = "removeEmptyLine";
})(MessageId = exports.MessageId || (exports.MessageId = {}));
exports.consistentEmptyLines = utils.createRule({
    name: "consistent-empty-lines",
    fixable: utils.Fixable.whitespace,
    isSubOptions: functions_1.is.object.factory({
        _id: functions_1.is.string,
        emptyLine: exports.isEmptyLine,
        next: utils.isSelector,
        prev: utils.isSelector
    }, {}),
    subOptionsKey: "rules",
    messages: {
        [MessageId.addEmptyLine]: "Add empty line before ({{_id}})",
        [MessageId.removeEmptyLine]: "Remove empty line before ({{_id}})"
    },
    create: (context) => {
        const prevItems = [];
        const nextItems = [];
        return utils.mergeListenters(...context.subOptionsArray.flatMap((subOptions) => {
            const prev = functions_1.a.fromMixed(subOptions.prev).join(", ");
            const next = functions_1.a.fromMixed(subOptions.next).join(", ");
            return [
                {
                    [prev]: (node) => {
                        prevItems.push({ node, subOptions });
                    }
                },
                {
                    [next]: (node) => {
                        nextItems.push({ node, subOptions });
                    }
                }
            ];
        }), {
            "Program:exit": () => {
                prevItems.sort(reverseCompare);
                nextItems.sort(reverseCompare);
                const items = _.uniqBy(functions_1.a.fromIterable((0, functions_1.evaluate)(function* () {
                    for (const prevItem of prevItems)
                        for (const nextItem of nextItems)
                            if (prevItem.subOptions._id === nextItem.subOptions._id &&
                                context.isAdjacentNodes(prevItem.node, nextItem.node))
                                yield nextItem;
                })), "node");
                for (const item of items) {
                    const { _id, emptyLine } = item.subOptions;
                    if (emptyLine === EmptyLine.any) {
                        // Skip check
                    }
                    else {
                        const { node } = item;
                        const spread = (0, functions_1.evaluate)(() => {
                            switch (emptyLine) {
                                case EmptyLine.always:
                                    return true;
                                case EmptyLine.never:
                                    return false;
                            }
                        });
                        const messageId = spread
                            ? MessageId.addEmptyLine
                            : MessageId.removeEmptyLine;
                        const range = context.getLeadingSpaces(node);
                        const got = context.getText(range);
                        if (got.includes("\n")) {
                            const expected = context.eol.repeat(spread ? 2 : 1) +
                                functions_1.s.trimLeadingEmptyLines(got);
                            if (got === expected) {
                                // Valid
                            }
                            else
                                context.report({
                                    data: { _id },
                                    fix: () => ({ range, text: expected }),
                                    messageId,
                                    node
                                });
                        }
                    }
                }
            }
        });
    }
});
/**
 * Compares items.
 *
 * @param item1 - First item.
 * @param item2 - Second item.
 * @returns - Comparison result.
 */
function reverseCompare(item1, item2) {
    return utils.compare(item2.subOptions._id, item1.subOptions._id);
}
//# sourceMappingURL=consistent-empty-lines.js.map