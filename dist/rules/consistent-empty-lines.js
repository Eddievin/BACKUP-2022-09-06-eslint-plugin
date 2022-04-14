"use strict";
const tslib_1 = require("tslib");
const a = tslib_1.__importStar(require("@skylib/functions/dist/array"));
const arrayMap = tslib_1.__importStar(require("@skylib/functions/dist/arrayMap"));
const fn = tslib_1.__importStar(require("@skylib/functions/dist/function"));
const is = tslib_1.__importStar(require("@skylib/functions/dist/guards"));
const helpers_1 = require("@skylib/functions/dist/helpers");
const s = tslib_1.__importStar(require("@skylib/functions/dist/string"));
const utils = tslib_1.__importStar(require("./utils"));
const EmptyLineVO = (0, helpers_1.createValidationObject)({
    always: "always",
    any: "any",
    never: "never"
});
const isEmptyLine = is.factory(is.enumeration, EmptyLineVO);
const isSubOptions = is.object.factory({
    emptyLine: isEmptyLine,
    next: is.string,
    prev: is.string
}, {});
const rule = utils.createRule({
    create(context) {
        const childNodesMap = new Map();
        const prevRuleIndexes = new Map();
        const nextRuleIndexes = new Map();
        const prevItems = [];
        const nextItems = [];
        const listener = {
            "*"(node) {
                utils.buildChildNodesMap(node, childNodesMap);
            },
            "Program:exit"() {
                const items = new Map();
                prevItems.sort((item1, item2) => item1.ruleIndex - item2.ruleIndex);
                nextItems.sort((item1, item2) => item1.ruleIndex - item2.ruleIndex);
                for (const prevItem of prevItems)
                    for (const nextItem of nextItems)
                        if (prevItem.ruleIndex === nextItem.ruleIndex &&
                            utils.isAdjacentNodes(prevItem.node, nextItem.node, childNodesMap))
                            items.set(utils.getNodeId(nextItem.node), nextItem);
                for (const item of items.values()) {
                    const emptyLine = a.get(context.subOptionsArray, item.ruleIndex).emptyLine;
                    if (emptyLine === "any") {
                        // Skip check
                    }
                    else {
                        const node = item.node;
                        const spread = fn.run(() => {
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
                        const expected = context.eol.repeat(count) + s.trimLeadingEmptyLines(got);
                        if (got === expected) {
                            // Valid
                        }
                        else
                            context.report({
                                fix() {
                                    return [
                                        {
                                            range: [node.range[0] - got.length, node.range[0]],
                                            text: expected
                                        }
                                    ];
                                },
                                messageId,
                                node
                            });
                    }
                }
            }
        };
        for (const [ruleIndex, subOptions] of context.subOptionsArray.entries()) {
            arrayMap.push(subOptions.prev, ruleIndex, prevRuleIndexes);
            arrayMap.push(subOptions.next, ruleIndex, nextRuleIndexes);
        }
        for (const subOptions of context.subOptionsArray)
            for (const selector of [subOptions.prev, subOptions.next])
                listener[selector] = (node) => {
                    for (const ruleIndex of arrayMap.get(selector, prevRuleIndexes))
                        prevItems.push({ node, ruleIndex });
                    for (const ruleIndex of arrayMap.get(selector, nextRuleIndexes))
                        nextItems.push({ node, ruleIndex });
                };
        return listener;
    },
    fixable: "whitespace",
    isRuleOptions: is.object,
    isSubOptions,
    messages: {
        expectingEmptyLine: "Expecting empty line before",
        unexpectedEmptyLine: "Unexpected empty line before"
    },
    name: "consistent-empty-lines"
});
module.exports = rule;
//# sourceMappingURL=consistent-empty-lines.js.map