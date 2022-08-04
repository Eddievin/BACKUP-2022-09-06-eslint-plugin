"use strict";
/* eslint-disable @skylib/custom/prefer-readonly-array -- Postponed */
Object.defineProperty(exports, "__esModule", { value: true });
exports.sort = void 0;
const functions_1 = require("@skylib/functions");
const sort_internal_1 = require("./sort.internal");
const compare_1 = require("./compare");
const core_1 = require("./core");
exports.sort = (0, functions_1.defineFn)(
/**
 * Sorts nodes.
 *
 * @param nodes - Nodes.
 * @param context - Context.
 * @param options - Options.
 */
(nodes, context, options) => {
    const { customOrder, keyNode, sendToBottom, sendToTop, sortingOrder } = Object.assign({ customOrder: [], 
        // eslint-disable-next-line no-warning-comments -- Wait for @skylib/functions update
        // fixme -- Use fn.never
        keyNode: functions_1.fn.noop, sortingOrder: (node) => {
            const node2 = keyNode(node);
            if (node2) {
                const key = (0, core_1.nodeText)(node2, () => `\u0001${context.getText(node2)}`);
                const index = customOrder.indexOf(key);
                if (index >= 0)
                    return `${1000 + index}:${key}`;
                if (sendToTopRe && sendToTopRe.test(key))
                    return `2001:${key}`;
                if (sendToBottomRe && sendToBottomRe.test(key))
                    return `2003:${key}`;
                return `2002:${key}`;
            }
            return undefined;
        } }, options);
    const sendToTopRe = functions_1.is.not.empty(sendToTop)
        ? // eslint-disable-next-line security/detect-non-literal-regexp -- Postponed
            new RegExp(sendToTop, "u")
        : undefined;
    const sendToBottomRe = functions_1.is.not.empty(sendToBottom)
        ? // eslint-disable-next-line security/detect-non-literal-regexp -- Postponed
            new RegExp(sendToBottom, "u")
        : undefined;
    const items = [];
    for (const node of nodes) {
        const key = sortingOrder(node);
        if (functions_1.is.not.empty(key))
            items.push({ index: 0, key, node });
        else {
            sortGroup(items, options, context);
            functions_1.a.truncate(items);
        }
    }
    sortGroup(items, options, context);
}, {
    MessageId: sort_internal_1.MessageId,
    messages: {
        [sort_internal_1.MessageId.incorrectSortingOrder]: "Incorrect sorting order",
        [sort_internal_1.MessageId.incorrectSortingOrderId]: "Incorrect sorting order ({{_id}})"
    }
});
// eslint-disable-next-line @skylib/require-jsdoc -- Ppstponed
function sortGroup(items, options, context) {
    if (items.length >= 2) {
        items = items.map((item, index) => (Object.assign(Object.assign({}, item), { index })));
        const { _id } = options;
        const sortedItems = functions_1.a.sort(items, (item1, item2) => (0, compare_1.compare)(item1.key, item2.key));
        const fixes = [];
        let min;
        let max;
        for (const [index, sortedItem] of sortedItems.entries())
            if (sortedItem.index === index) {
                // Valid
            }
            else {
                const item = functions_1.a.get(items, index);
                min = functions_1.is.not.empty(min) ? Math.min(min, index) : index;
                max = functions_1.is.not.empty(max) ? Math.max(max, index) : index;
                fixes.push({
                    range: context.getFullRange(item.node),
                    text: context.getFullText(sortedItem.node)
                });
            }
        if (fixes.length) {
            const loc = context.getLoc([
                functions_1.a.get(items, functions_1.as.not.empty(min)).node.range[0],
                functions_1.a.get(items, functions_1.as.not.empty(max)).node.range[1]
            ]);
            if (functions_1.is.not.empty(_id))
                context.report({
                    data: { _id },
                    fix: () => fixes,
                    loc,
                    messageId: exports.sort.MessageId.incorrectSortingOrderId
                });
            else
                context.report({
                    fix: () => fixes,
                    loc,
                    messageId: exports.sort.MessageId.incorrectSortingOrder
                });
        }
    }
}
//# sourceMappingURL=sort.js.map