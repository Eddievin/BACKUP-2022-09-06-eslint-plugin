"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sortArray = exports.MessageId = void 0;
const tslib_1 = require("tslib");
const utils = tslib_1.__importStar(require("./utils"));
const functions_1 = require("@skylib/functions");
const utils_1 = require("@typescript-eslint/utils");
var MessageId;
(function (MessageId) {
    MessageId["expectingArray"] = "expectingArray";
})(MessageId = exports.MessageId || (exports.MessageId = {}));
exports.sortArray = utils.createRule({
    name: "sort-array",
    fixable: utils.Fixable.code,
    vue: true,
    isOptions: functions_1.is.object.factory({ selector: functions_1.is.string }, {
        customOrder: functions_1.is.strings,
        key: functions_1.is.string,
        sendToBottom: functions_1.is.string,
        sendToTop: functions_1.is.string
    }),
    messages: {
        [MessageId.expectingArray]: "Expecting array expression",
        [utils.sort.MessageId.incorrectSortingOrder]: "Incorrect sorting order",
        [utils.sort.MessageId.incorrectSortingOrderId]: "Incorrect sorting order ({{ _id }})"
    },
    create: (context) => {
        const { customOrder, key, selector, sendToBottom, sendToTop } = context.options;
        return {
            [selector]: (node) => {
                if (node.type === utils_1.AST_NODE_TYPES.ArrayExpression)
                    utils.sort(node.elements, keyNode, functions_1.o.removeUndefinedKeys({
                        customOrder,
                        sendToBottom,
                        sendToTop
                    }), context);
                else
                    context.report({ messageId: MessageId.expectingArray, node });
            }
        };
        function keyNode(node) {
            if (functions_1.is.not.empty(key) && node.type === utils_1.AST_NODE_TYPES.ObjectExpression)
                for (const property of node.properties)
                    if (property.type === utils_1.AST_NODE_TYPES.Property &&
                        utils.nodeToString(property.key, context) === key)
                        return property.value;
            return node;
        }
    }
});
//# sourceMappingURL=sort-array.js.map