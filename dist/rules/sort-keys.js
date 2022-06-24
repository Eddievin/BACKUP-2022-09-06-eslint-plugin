"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sortKeys = void 0;
const tslib_1 = require("tslib");
const utils = tslib_1.__importStar(require("./utils"));
const functions_1 = require("@skylib/functions");
const _ = tslib_1.__importStar(require("@skylib/lodash-commonjs-es"));
const utils_1 = require("@typescript-eslint/utils");
exports.sortKeys = utils.createRule({
    create: context => {
        return {
            [utils_1.AST_NODE_TYPES.ObjectExpression]: (node) => {
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
    isRuleOptions: functions_1.is.object,
    messages: { incorrectSortingOrder: "Incorrect sorting order" },
    name: "sort-keys"
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
        let min;
        let max;
        for (const [index, sortedItem] of sortedGroup.entries())
            if (sortedItem.index === index) {
                // Valid
            }
            else {
                const item = functions_1.a.get(group, index);
                min = functions_1.is.not.empty(min) ? Math.min(min, index) : index;
                max = functions_1.is.not.empty(max) ? Math.max(max, index) : index;
                fixes.push({
                    range: context.getRangeWithLeadingTrivia(item.node),
                    text: context.getTextWithLeadingTrivia(sortedItem.node)
                });
            }
        if (fixes.length > 0) {
            functions_1.assert.not.empty(min);
            functions_1.assert.not.empty(max);
            const loc = context.getLocFromRange([
                functions_1.a.get(group, min).node.range[0],
                functions_1.a.get(group, max).node.range[1]
            ]);
            context.report({
                fix: () => fixes,
                loc,
                messageId: "incorrectSortingOrder"
            });
        }
    }
}
//# sourceMappingURL=sort-keys.js.map