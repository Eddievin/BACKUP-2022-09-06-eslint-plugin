"use strict";
/* eslint-disable @skylib/custom/prefer-readonly-array -- Ok */
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
 * @param keyNode - Finds key node.
 * @param options - Options.
 * @param context - Context.
 */
(nodes, keyNode, options, context) => {
    const { customOrder, sendToBottom, sendToTop } = Object.assign({ customOrder: [] }, options);
    const sendToTopRe = functions_1.is.not.empty(sendToTop)
        ? // eslint-disable-next-line security/detect-non-literal-regexp -- Ok
            new RegExp(sendToTop, "u")
        : undefined;
    const sendToBottomRe = functions_1.is.not.empty(sendToBottom)
        ? // eslint-disable-next-line security/detect-non-literal-regexp -- Ok
            new RegExp(sendToBottom, "u")
        : undefined;
    const items = nodes.map((node, index) => ({
        index,
        key: wrapKey((0, core_1.nodeToString)(keyNode(node), context)),
        node
    }));
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
                range: context.getRangeWithLeadingTrivia(item.node),
                text: context.getTextWithLeadingTrivia(sortedItem.node)
            });
        }
    if (fixes.length) {
        const loc = context.getLocFromRange([
            functions_1.a.get(items, functions_1.as.not.empty(min)).node.range[0],
            functions_1.a.get(items, functions_1.as.not.empty(max)).node.range[1]
        ]);
        if (functions_1.is.not.empty(options._id))
            context.report({
                data: { _id: options._id },
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
    function wrapKey(key) {
        const index = customOrder.indexOf(key);
        if (index >= 0)
            return `${1000 + index}:${key}`;
        if (sendToTopRe && sendToTopRe.test(key))
            return `2001:${key}`;
        if (sendToBottomRe && sendToBottomRe.test(key))
            return `2003:${key}`;
        return `2002:${key}`;
    }
}, { MessageId: sort_internal_1.MessageId });
//# sourceMappingURL=sort.js.map