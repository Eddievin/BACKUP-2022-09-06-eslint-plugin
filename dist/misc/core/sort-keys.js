"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sortKeys = exports.MessageId = void 0;
const tslib_1 = require("tslib");
const _ = tslib_1.__importStar(require("@skylib/lodash-commonjs-es"));
const utils = tslib_1.__importStar(require("../../utils"));
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
    isSubOptions: functions_1.is.object.factory({ _id: functions_1.is.string, selector: utils.isSelector }, { customOrder: functions_1.is.strings, sendToBottom: functions_1.is.string, sendToTop: functions_1.is.string }),
    subOptionsKey: "overrides",
    messages: Object.assign(Object.assign({}, utils.sort.messages), { [MessageId.expectingObject]: "Expecting object ({{_id}})" }),
    create: (context) => {
        const items = [];
        return utils.mergeListenters(...context.subOptionsArray.map((subOptions) => {
            const { _id, selector: mixed } = subOptions;
            const selector = functions_1.a.fromMixed(mixed).join(", ");
            return {
                [selector]: (node) => {
                    if (node.type === utils_1.AST_NODE_TYPES.ObjectExpression)
                        items.push({ node, options: Object.assign(Object.assign({}, subOptions), { keyNode }) });
                    else
                        context.report({
                            data: { _id },
                            messageId: MessageId.expectingObject,
                            node
                        });
                }
            };
        }), {
            "ObjectExpression": node => {
                items.push({ node, options: { keyNode } });
            },
            "Program:exit": () => {
                for (const item of _.uniqBy(functions_1.a.sort(items, reverseCompare), "node"))
                    utils.sort(item.node.properties, context, item.options);
            }
        });
        function keyNode(node) {
            return node.type === utils_1.AST_NODE_TYPES.SpreadElement ? undefined : node.key;
        }
    }
});
/**
 * Compares items.
 *
 * @param item1 - First item.
 * @param item2 - Second item.
 * @returns - Comparison result.
 */
function reverseCompare(item1, item2) {
    return utils.compare(item2.options._id, item1.options._id);
}
//# sourceMappingURL=sort-keys.js.map