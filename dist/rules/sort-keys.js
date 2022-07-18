"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sortKeys = exports.MessageId = void 0;
const tslib_1 = require("tslib");
const utils = tslib_1.__importStar(require("./utils"));
const functions_1 = require("@skylib/functions");
const utils_1 = require("@typescript-eslint/utils");
var MessageId;
(function (MessageId) {
    MessageId["expectingObject"] = "expectingObject";
})(MessageId = exports.MessageId || (exports.MessageId = {}));
exports.sortKeys = utils.createRule({
    name: "sort-keys",
    fixable: utils.Fixable.code,
    vue: true,
    isSubOptions: functions_1.is.object.factory({ _id: functions_1.is.string, selector: utils.isSelector }, {
        customOrder: functions_1.is.strings,
        sendToBottom: functions_1.is.string,
        sendToTop: functions_1.is.string
    }),
    subOptionsKey: "overrides",
    messages: {
        [MessageId.expectingObject]: "Expecting object ({{ _id }})",
        [utils.sort.MessageId.incorrectSortingOrder]: "Incorrect sorting order",
        [utils.sort.MessageId.incorrectSortingOrderId]: "Incorrect sorting order ({{ _id }})"
    },
    create: (context) => {
        const objectExpressions = new Map();
        const objectMembers = [];
        return Object.assign({ "ObjectExpression": (node) => {
                objectExpressions.set(utils.getNodeId(node), { node, options: {} });
            }, "Program:exit": () => {
                for (const objectExpression of objectExpressions.values()) {
                    for (const property of objectExpression.node.properties)
                        if (property.type === utils_1.AST_NODE_TYPES.SpreadElement)
                            lintNodes(objectExpression.options);
                        else
                            objectMembers.push(property);
                    lintNodes(objectExpression.options);
                }
            } }, functions_1.o.fromEntries(context.subOptionsArray.map(subOptions => [
            functions_1.a.fromMixed(subOptions.selector).join(", "),
            (node) => {
                if (node.type === utils_1.AST_NODE_TYPES.ObjectExpression)
                    objectExpressions.set(utils.getNodeId(node), {
                        node,
                        options: subOptions
                    });
                else
                    context.report({
                        data: { _id: subOptions._id },
                        messageId: MessageId.expectingObject,
                        node
                    });
            }
        ])));
        function keyNode(node) {
            return node.key;
        }
        function lintNodes(options) {
            utils.sort(objectMembers, keyNode, options, context);
            functions_1.a.truncate(objectMembers);
        }
    }
});
//# sourceMappingURL=sort-keys.js.map