"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sortArray = void 0;
const tslib_1 = require("tslib");
const utils = tslib_1.__importStar(require("./utils"));
const functions_1 = require("@skylib/functions");
const utils_1 = require("@typescript-eslint/utils");
exports.sortArray = utils.createRule({
    create: (context) => {
        const { key, selector } = context.options;
        return {
            [selector]: (node) => {
                if (node.type === utils_1.AST_NODE_TYPES.ArrayExpression)
                    utils.sort(node.elements, nodeToKey, context.options, context);
                else
                    context.report({ messageId: "expectingArray", node });
            }
        };
        function nodeToKey(node) {
            if (functions_1.is.not.empty(key) && node.type === utils_1.AST_NODE_TYPES.ObjectExpression) {
                const result = node.properties
                    .map(property => property.type === utils_1.AST_NODE_TYPES.Property &&
                    utils.nodeToString(property.key, context) === key
                    ? property.value
                    : undefined)
                    .find(functions_1.is.not.empty);
                if (result)
                    return result;
            }
            return node;
        }
    },
    fixable: "code",
    isRuleOptions: functions_1.is.object.factory({ selector: functions_1.is.string }, {
        customOrder: functions_1.is.strings,
        key: functions_1.is.string,
        sendToBottom: functions_1.is.string,
        sendToTop: functions_1.is.string
    }),
    messages: {
        expectingArray: "Expecting array",
        incorrectSortingOrder: "Incorrect sorting order"
    },
    name: "sort-array"
});
//# sourceMappingURL=sort-array.js.map