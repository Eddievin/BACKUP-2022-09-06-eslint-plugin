"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sortArray = void 0;
const tslib_1 = require("tslib");
const utils = tslib_1.__importStar(require("./utils"));
const functions_1 = require("@skylib/functions");
const utils_1 = require("@typescript-eslint/utils");
exports.sortArray = utils.createRule({
    create: context => functions_1.o.fromEntries(context.subOptionsArray.map(subOptions => [
        subOptions.selector,
        (node) => {
            if (node.type === utils_1.AST_NODE_TYPES.ArrayExpression)
                utils.sort(node.elements, subOptions, context);
            else
                context.report({
                    data: { _id: subOptions._id },
                    messageId: "expectingArray",
                    node
                });
        }
    ])),
    fixable: "code",
    isRuleOptions: functions_1.is.object,
    isSubOptions: functions_1.is.object.factory({ _id: functions_1.is.string, selector: functions_1.is.string }, {
        key: functions_1.is.string,
        sendToBottom: functions_1.is.string,
        sendToTop: functions_1.is.string
    }),
    messages: {
        expectingArray: "Expecting array ({{ _id }})",
        incorrectSortingOrder: "Incorrect sorting order ({{ _id }})"
    },
    name: "sort-array"
});
//# sourceMappingURL=sort-array.js.map