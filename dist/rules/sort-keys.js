"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sortKeys = void 0;
const tslib_1 = require("tslib");
const utils = tslib_1.__importStar(require("./utils"));
const functions_1 = require("@skylib/functions");
const utils_1 = require("@typescript-eslint/utils");
exports.sortKeys = utils.createRule({
    create: context => {
        const items = new Map();
        const nodes = [];
        const listener = Object.assign({ [utils_1.AST_NODE_TYPES.ObjectExpression]: (node) => {
                items.set(utils.getNodeId(node), { node, options: { _id: "__main" } });
            }, "Program:exit": () => {
                for (const item of items.values()) {
                    for (const property of item.node.properties)
                        if (property.type === utils_1.AST_NODE_TYPES.SpreadElement)
                            flush(item.options);
                        else
                            nodes.push(property);
                    flush(item.options);
                }
            } }, functions_1.o.fromEntries(context.subOptionsArray.map(subOptions => [
            functions_1.a.fromMixed(subOptions.selector).join(", "),
            (node) => {
                if (node.type === utils_1.AST_NODE_TYPES.ObjectExpression)
                    items.set(utils.getNodeId(node), { node, options: subOptions });
                else
                    context.report({
                        data: { _id: subOptions._id },
                        messageId: "expectingObject",
                        node
                    });
            }
        ])));
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return -- Postponed
        return context.defineTemplateBodyVisitor(listener, listener);
        function flush(options) {
            utils.sort(nodes, nodeToKey, options, context);
            functions_1.a.truncate(nodes);
        }
        function nodeToKey(node) {
            return node.key;
        }
    },
    fixable: "code",
    isRuleOptions: functions_1.is.object,
    isSubOptions: functions_1.is.object.factory({ _id: functions_1.is.string, selector: functions_1.is.or.factory(functions_1.is.string, functions_1.is.strings) }, {
        customOrder: functions_1.is.strings,
        sendToBottom: functions_1.is.string,
        sendToTop: functions_1.is.string
    }),
    messages: {
        expectingObject: "Expecting object ({{ _id }})",
        incorrectSortingOrder: "Incorrect sorting order"
    },
    name: "sort-keys",
    subOptionsKey: "overrides"
});
//# sourceMappingURL=sort-keys.js.map