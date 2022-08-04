"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sortArray = exports.MessageId = void 0;
const tslib_1 = require("tslib");
const utils = tslib_1.__importStar(require("../../utils"));
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
    isOptions: functions_1.is.object.factory({ selector: utils.isSelector }, {
        customOrder: functions_1.is.strings,
        key: functions_1.is.string,
        sendToBottom: functions_1.is.string,
        sendToTop: functions_1.is.string
    }),
    messages: Object.assign(Object.assign({}, utils.sort.messages), { [MessageId.expectingArray]: "Expecting array" }),
    create: (context) => {
        const { key, selector: mixed } = context.options;
        const selector = functions_1.a.fromMixed(mixed).join(", ");
        return {
            [selector]: (node) => {
                if (node.type === utils_1.AST_NODE_TYPES.ArrayExpression)
                    utils.sort(node.elements, context, Object.assign(Object.assign({}, context.options), { keyNode }));
                else
                    context.report({ messageId: MessageId.expectingArray, node });
            }
        };
        function keyNode(node) {
            switch (node.type) {
                case utils_1.AST_NODE_TYPES.ObjectExpression:
                    if (functions_1.is.not.empty(key))
                        for (const property of node.properties)
                            if (property.type === utils_1.AST_NODE_TYPES.Property &&
                                utils.nodeText(property.key, "?") === key)
                                return property.value;
                    return node;
                case utils_1.AST_NODE_TYPES.SpreadElement:
                    return undefined;
                default:
                    return node;
            }
        }
    }
});
//# sourceMappingURL=sort-array.js.map