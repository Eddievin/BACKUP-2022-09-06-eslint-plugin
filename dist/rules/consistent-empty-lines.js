"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.consistentEmptyLines = void 0;
const tslib_1 = require("tslib");
const utils = tslib_1.__importStar(require("./utils"));
const functions_1 = require("@skylib/functions");
exports.consistentEmptyLines = utils.createRule({
    create: context => {
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
                const items = new Map();
                prevItems.sort((item1, item2) => item1.ruleIndex - item2.ruleIndex);
                nextItems.sort((item1, item2) => item1.ruleIndex - item2.ruleIndex);
                for (const prevItem of prevItems)
                    for (const nextItem of nextItems)
                        if (prevItem.ruleIndex === nextItem.ruleIndex &&
                            utils.isAdjacentNodes(prevItem.node, nextItem.node, childNodesMap))
                            items.set(utils.getNodeId(nextItem.node), nextItem);
                for (const item of items.values()) {
                    const emptyLine = functions_1.a.get(context.subOptionsArray, item.ruleIndex).emptyLine;
                    if (emptyLine === "any") {
                        // Skip check
                    }
                    else {
                        const node = item.node;
                        const spread = (0, functions_1.evaluate)(() => {
                            switch (emptyLine) {
                                case "always":
                                    return true;
                                case "never":
                                    return false;
                            }
                        });
                        const count = spread ? 2 : 1;
                        const messageId = spread
                            ? "expectingEmptyLine"
                            : "unexpectedEmptyLine";
                        const got = context.getLeadingTrivia(node);
                        const expected = context.eol.repeat(count) + functions_1.s.trimLeadingEmptyLines(got);
                        if (got === expected) {
                            // Valid
                        }
                        else
                            context.report({
                                fix: () => [
                                    {
                                        range: [node.range[0] - got.length, node.range[0]],
                                        text: expected
                                    }
                                ],
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
                        prevItems.push({ node, ruleIndex });
                    for (const ruleIndex of nextRuleIndexes.get(selector))
                        nextItems.push({ node, ruleIndex });
                };
        return listener;
    },
    fixable: "whitespace",
    isRuleOptions: functions_1.is.object,
    isSubOptions: (0, functions_1.evaluate)(() => {
        const EmptyLineVO = (0, functions_1.createValidationObject)({
            always: "always",
            any: "any",
            never: "never"
        });
        const isEmptyLine = functions_1.is.factory(functions_1.is.enumeration, EmptyLineVO);
        return functions_1.is.object.factory({
            emptyLine: isEmptyLine,
            next: functions_1.is.string,
            prev: functions_1.is.string
        }, {});
    }),
    messages: {
        expectingEmptyLine: "Expecting empty line before",
        unexpectedEmptyLine: "Unexpected empty line before"
    },
    name: "consistent-empty-lines"
});
//# sourceMappingURL=consistent-empty-lines.js.map