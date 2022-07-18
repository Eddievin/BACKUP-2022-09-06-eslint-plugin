"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.consistentEmptyLines = exports.MessageId = exports.isEmptyLine = exports.EmptyLine = void 0;
const tslib_1 = require("tslib");
const _ = tslib_1.__importStar(require("@skylib/lodash-commonjs-es"));
const utils = tslib_1.__importStar(require("./utils"));
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
    MessageId["expectingEmptyLine"] = "expectingEmptyLine";
    MessageId["unexpectedEmptyLine"] = "unexpectedEmptyLine";
})(MessageId = exports.MessageId || (exports.MessageId = {}));
exports.consistentEmptyLines = utils.createRule({
    name: "consistent-empty-lines",
    fixable: utils.Fixable.whitespace,
    isSubOptions: functions_1.is.object.factory({
        _id: functions_1.is.string,
        emptyLine: exports.isEmptyLine,
        next: functions_1.is.string,
        prev: functions_1.is.string
    }, {}),
    subOptionsKey: "rules",
    messages: {
        [MessageId.expectingEmptyLine]: "Expecting empty line before ({{ _id }})",
        [MessageId.unexpectedEmptyLine]: "Unexpected empty line before ({{ _id }})"
    },
    create: (context) => {
        const childNodesMap = new functions_1.Accumulator();
        const prevRuleIndexes = new functions_1.Accumulator();
        const nextRuleIndexes = new functions_1.Accumulator();
        const prevItems = [];
        const nextItems = [];
        const listener = {
            "*": (node) => {
                utils.buildChildNodesMap(node, childNodesMap);
            },
            "Program:exit": () => {
                prevItems.sort((item1, item2) => item1.ruleIndex - item2.ruleIndex);
                nextItems.sort((item1, item2) => item1.ruleIndex - item2.ruleIndex);
                const items = _.uniq(functions_1.a.fromIterable((0, functions_1.evaluate)(function* () {
                    for (const prevItem of prevItems)
                        for (const nextItem of nextItems)
                            if (prevItem.ruleIndex === nextItem.ruleIndex &&
                                utils.isAdjacentNodes(prevItem.node, nextItem.node, childNodesMap))
                                yield nextItem;
                })));
                for (const item of items) {
                    const emptyLine = functions_1.a.get(context.subOptionsArray, item.ruleIndex).emptyLine;
                    if (emptyLine === "any") {
                        // Skip check
                    }
                    else {
                        const node = item.node;
                        const spread = (0, functions_1.evaluate)(() => {
                            switch (emptyLine) {
                                case EmptyLine.always:
                                    return true;
                                case EmptyLine.never:
                                    return false;
                            }
                        });
                        const count = spread ? 2 : 1;
                        const messageId = spread
                            ? MessageId.expectingEmptyLine
                            : MessageId.unexpectedEmptyLine;
                        const got = context.getLeadingTrivia(node);
                        const expected = context.eol.repeat(count) + functions_1.s.trimLeadingEmptyLines(got);
                        if (got === expected) {
                            // Valid
                        }
                        else
                            context.report({
                                data: { _id: item._id },
                                fix: () => ({
                                    range: [node.range[0] - got.length, node.range[0]],
                                    text: expected
                                }),
                                messageId,
                                node
                            });
                    }
                }
            }
        };
        for (const [ruleIndex, subOptions] of context.subOptionsArray.entries()) {
            prevRuleIndexes.push(subOptions.prev, ruleIndex);
            nextRuleIndexes.push(subOptions.next, ruleIndex);
        }
        for (const subOptions of context.subOptionsArray)
            for (const selector of [subOptions.prev, subOptions.next])
                listener[selector] = (node) => {
                    for (const ruleIndex of prevRuleIndexes.get(selector))
                        prevItems.push({
                            _id: subOptions._id,
                            node,
                            ruleIndex
                        });
                    for (const ruleIndex of nextRuleIndexes.get(selector))
                        nextItems.push({
                            _id: subOptions._id,
                            node,
                            ruleIndex
                        });
                };
        return listener;
    }
});
//# sourceMappingURL=consistent-empty-lines.js.map