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
        const childNodes = new functions_1.Accumulator();
        const prevItems = [];
        const nextItems = [];
        const listeners = new functions_1.Accumulator();
        for (const [index, subOptions] of context.subOptionsArray.entries()) {
            listeners.push(subOptions.prev, (node) => {
                prevItems.push({
                    index,
                    node,
                    subOptions
                });
            });
            listeners.push(subOptions.next, (node) => {
                nextItems.push({
                    index,
                    node,
                    subOptions
                });
            });
        }
        return Object.assign({ "*": (node) => {
                utils.buildChildNodesMap(node, childNodes);
            }, "Program:exit": () => {
                prevItems.sort((item1, item2) => item2.index - item1.index);
                nextItems.sort((item1, item2) => item2.index - item1.index);
                const items = _.uniqBy(functions_1.a.fromIterable((0, functions_1.evaluate)(function* () {
                    for (const prevItem of prevItems)
                        for (const nextItem of nextItems)
                            if (prevItem.index === nextItem.index &&
                                utils.isAdjacentNodes(prevItem.node, nextItem.node, childNodes))
                                yield nextItem;
                })), "node");
                for (const item of items) {
                    const emptyLine = item.subOptions.emptyLine;
                    if (emptyLine === EmptyLine.any) {
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
                                data: { _id: item.subOptions._id },
                                fix: () => ({
                                    range: [node.range[0] - got.length, node.range[0]],
                                    text: expected
                                }),
                                messageId,
                                node
                            });
                    }
                }
            } }, functions_1.o.fromEntries(functions_1.a.fromIterable(listeners).map(([name, callbacks]) => [
            name,
            (node) => {
                for (const callback of callbacks)
                    callback(node);
            }
        ])));
    }
});
//# sourceMappingURL=consistent-empty-lines.js.map