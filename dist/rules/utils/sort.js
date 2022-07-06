"use strict";
/* eslint-disable @skylib/primary-export-only */
Object.defineProperty(exports, "__esModule", { value: true });
exports.sort = exports.nodeToString = void 0;
/* eslint-disable @skylib/no-restricted-syntax/prefer-readonly-array -- Ok */
const compare_1 = require("./compare");
const functions_1 = require("@skylib/functions");
const utils_1 = require("@typescript-eslint/utils");
/**
 * Returns string representing node.
 *
 * @param node - Node.
 * @param context - Context.
 * @returns String representing node.
 */
function nodeToString(node, context) {
    switch (node.type) {
        case utils_1.AST_NODE_TYPES.Identifier:
            return node.name;
        case utils_1.AST_NODE_TYPES.Literal:
            return functions_1.cast.string(node.value);
        default:
            return `\u0000${context.getText(node)}`;
    }
}
exports.nodeToString = nodeToString;
/**
 * Sorts nodes.
 *
 * @param nodes - Nodes.
 * @param nodeToKey - Finds key node.
 * @param options - Options.
 * @param context - Context.
 */
function sort(nodes, nodeToKey, options, context) {
    const { customOrder, sendToBottom, sendToTop } = Object.assign({ customOrder: [] }, options);
    const sendToTopRe = functions_1.is.not.empty(sendToTop)
        ? // eslint-disable-next-line security/detect-non-literal-regexp -- Ok
            new RegExp(sendToTop, "u")
        : undefined;
    const sendToBottomRe = functions_1.is.not.empty(sendToBottom)
        ? // eslint-disable-next-line security/detect-non-literal-regexp -- Ok
            new RegExp(sendToBottom, "u")
        : undefined;
    const items = nodes.map((node, index) => {
        return {
            index,
            key: wrapKey(nodeToString(nodeToKey(node), context)),
            node
        };
    });
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
    if (fixes.length > 0) {
        const loc = context.getLocFromRange([
            functions_1.a.get(items, functions_1.as.not.empty(min)).node.range[0],
            functions_1.a.get(items, functions_1.as.not.empty(max)).node.range[1]
        ]);
        context.report({
            fix: () => fixes,
            loc,
            messageId: "incorrectSortingOrder"
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
}
exports.sort = sort;
//# sourceMappingURL=sort.js.map