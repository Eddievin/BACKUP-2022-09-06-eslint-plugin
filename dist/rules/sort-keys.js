"use strict";
const tslib_1 = require("tslib");
const _ = (0, tslib_1.__importStar)(require("lodash"));
const utils_1 = require("@typescript-eslint/utils");
const a = (0, tslib_1.__importStar)(require("@skylib/functions/dist/array"));
const assert = (0, tslib_1.__importStar)(require("@skylib/functions/dist/assertions"));
const is = (0, tslib_1.__importStar)(require("@skylib/functions/dist/guards"));
const utils = (0, tslib_1.__importStar)(require("./utils"));
const rule = utils.createRule({
    create(context) {
        return {
            [utils_1.AST_NODE_TYPES.ObjectExpression](node) {
                const group = [];
                for (const property of node.properties)
                    if (property.type === utils_1.AST_NODE_TYPES.SpreadElement)
                        flush();
                    else {
                        if (context
                            .getLeadingTrivia(property)
                            .includes("@skylib/sort-keys break"))
                            flush();
                        switch (property.key.type) {
                            case utils_1.AST_NODE_TYPES.Identifier:
                                group.push({
                                    index: group.length,
                                    key: property.key.name,
                                    node: property
                                });
                                break;
                            case utils_1.AST_NODE_TYPES.Literal:
                                group.push({
                                    index: group.length,
                                    key: property.key.value,
                                    node: property
                                });
                                break;
                            default:
                                group.push({
                                    index: group.length,
                                    key: `\u0000${context.getText(property.key)}`,
                                    node: property
                                });
                        }
                    }
                flush();
                function flush() {
                    lintNodes(group, context);
                    group.length = 0;
                }
            }
        };
    },
    fixable: "code",
    isRuleOptions: is.object,
    messages: {
        incorrectSortingOrder: "Incorrect sorting order"
    }
});
/**
 * Lints group.
 *
 * @param group - Items.
 * @param context - Context.
 */
function lintNodes(group, context) {
    if (group.length > 1) {
        const sortedGroup = _.sortBy(group, item => item.key);
        const fixes = [];
        let min = undefined;
        let max = undefined;
        for (const [index, sortedItem] of sortedGroup.entries())
            if (sortedItem.index !== index) {
                const item = a.get(group, index);
                min = is.not.empty(min) ? Math.min(min, index) : index;
                max = is.not.empty(max) ? Math.max(max, index) : index;
                fixes.push({
                    range: context.getRangeWithLeadingTrivia(item.node),
                    text: context.getTextWithLeadingTrivia(sortedItem.node)
                });
            }
        if (fixes.length) {
            assert.not.empty(min);
            assert.not.empty(max);
            const loc = context.getLocFromRange([
                a.get(group, min).node.range[0],
                a.get(group, max).node.range[1]
            ]);
            context.report({
                fix: () => fixes,
                loc,
                messageId: "incorrectSortingOrder"
            });
        }
    }
}
module.exports = rule;
//# sourceMappingURL=sort-keys.js.map