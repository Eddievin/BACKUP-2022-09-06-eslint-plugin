"use strict";
const tslib_1 = require("tslib");
const _ = tslib_1.__importStar(require("lodash"));
const utils_1 = require("@typescript-eslint/utils");
const a = tslib_1.__importStar(require("@skylib/functions/dist/array"));
const arrayMap = tslib_1.__importStar(require("@skylib/functions/dist/arrayMap"));
const assert = tslib_1.__importStar(require("@skylib/functions/dist/assertions"));
const fn = tslib_1.__importStar(require("@skylib/functions/dist/function"));
const is = tslib_1.__importStar(require("@skylib/functions/dist/guards"));
const helpers_1 = require("@skylib/functions/dist/helpers");
const o = tslib_1.__importStar(require("@skylib/functions/dist/object"));
const utils = tslib_1.__importStar(require("./utils"));
const NodeTypeVO = (0, helpers_1.createValidationObject)({
    ExportDeclaration: "ExportDeclaration",
    ExportDefaultDeclaration: "ExportDefaultDeclaration",
    ExportFunctionDeclaration: "ExportFunctionDeclaration",
    ExportTypeDeclaration: "ExportTypeDeclaration",
    ExportUnknown: "ExportUnknown",
    FunctionDeclaration: "FunctionDeclaration",
    ImportDeclaration: "ImportDeclaration",
    ModuleDeclaration: "ModuleDeclaration",
    TypeDeclaration: "TypeDeclaration",
    Unknown: "Unknown"
});
const isNodeType = is.factory(is.enumeration, NodeTypeVO);
const isNodeTypes = is.factory(is.array.of, isNodeType);
const isRuleOptions = is.object.factory({
    blockOrder: isNodeTypes,
    moduleOrder: isNodeTypes,
    order: isNodeTypes,
    rootOrder: isNodeTypes
}, {});
const rule = utils.createRule({
    create(context) {
        const blockOrder = Object.assign(Object.assign(Object.assign({}, defaultOrder), o.fromEntries(context.options.order.map((type, index) => [type, index]))), o.fromEntries(context.options.blockOrder.map((type, index) => [type, index])));
        const moduleOrder = Object.assign(Object.assign(Object.assign({}, defaultOrder), o.fromEntries(context.options.order.map((type, index) => [type, index]))), o.fromEntries(context.options.moduleOrder.map((type, index) => [type, index])));
        const rootOrder = Object.assign(Object.assign(Object.assign({}, defaultOrder), o.fromEntries(context.options.order.map((type, index) => [type, index]))), o.fromEntries(context.options.rootOrder.map((type, index) => [type, index])));
        const itemsMap = new Map();
        return {
            "*"(node) {
                if (node.parent) {
                    const id = utils.getNodeId(node.parent);
                    const index = arrayMap.get(id, itemsMap).length;
                    const parentNode = node.parent;
                    const order = fn.run(() => {
                        switch (parentNode.type) {
                            case "BlockStatement":
                                return blockOrder;
                            case "Program":
                                return rootOrder;
                            case "TSModuleBlock":
                                return moduleOrder;
                            default:
                                return undefined;
                        }
                    });
                    if (order)
                        arrayMap.push(id, nodeInfo(node, parentNode, index, order, false), itemsMap);
                }
            },
            "Program:exit"() {
                for (const items of itemsMap.values()) {
                    const sortedItems = _.sortBy(items, node => node.sortingOrder);
                    const fixes = [];
                    for (const [index, sortedItem] of sortedItems.entries())
                        if (sortedItem.index !== index) {
                            const item = a.get(items, index);
                            fixes.push({
                                range: context.getRangeWithLeadingTrivia(item.node),
                                text: context.getTextWithLeadingTrivia(sortedItem.node)
                            });
                        }
                    if (fixes.length)
                        context.report({
                            fix: () => fixes,
                            messageId: "incorrectStatementsOrder",
                            node: a.first(items).parentNode
                        });
                }
            }
        };
    },
    defaultOptions: {
        blockOrder: [],
        moduleOrder: [],
        order: [],
        rootOrder: []
    },
    fixable: "code",
    isRuleOptions,
    messages: { incorrectStatementsOrder: "Incorrect statements order" }
});
const defaultOrder = {
    ExportDeclaration: 1003,
    ExportDefaultDeclaration: 1002,
    ExportFunctionDeclaration: 1006,
    ExportTypeDeclaration: 1005,
    ExportUnknown: 1004,
    FunctionDeclaration: 1009,
    ImportDeclaration: 1000,
    ModuleDeclaration: 1001,
    TypeDeclaration: 1008,
    Unknown: 1007
};
const sortable = {
    ExportDeclaration: true,
    ExportDefaultDeclaration: false,
    ExportFunctionDeclaration: true,
    ExportTypeDeclaration: true,
    ExportUnknown: false,
    FunctionDeclaration: true,
    ImportDeclaration: false,
    ModuleDeclaration: false,
    TypeDeclaration: true,
    Unknown: false
};
/**
 * Returns node info.
 *
 * @param node - Node.
 * @param parentNode - Parent node.
 * @param index - Index.
 * @param order - Order.
 * @param exportDeclaration - Inside export declaration.
 * @returns Node info.
 */
function nodeInfo(node, parentNode, index, order, exportDeclaration) {
    switch (node.type) {
        case utils_1.AST_NODE_TYPES.ExportNamedDeclaration: {
            if (node.declaration) {
                const info = nodeInfo(node.declaration, parentNode, index, order, true);
                return buildResult(info.type, info.id);
            }
            return buildResult("ExportDeclaration");
        }
        case utils_1.AST_NODE_TYPES.ExportDefaultDeclaration:
            return buildResult("ExportDefaultDeclaration");
        case utils_1.AST_NODE_TYPES.FunctionDeclaration:
        case utils_1.AST_NODE_TYPES.TSDeclareFunction:
            assert.not.empty(node.id);
            return buildResult(exportDeclaration ? "ExportFunctionDeclaration" : "FunctionDeclaration", node.id.name);
        case utils_1.AST_NODE_TYPES.ImportDeclaration:
            return buildResult("ImportDeclaration");
        case utils_1.AST_NODE_TYPES.TSInterfaceDeclaration:
        case utils_1.AST_NODE_TYPES.TSTypeAliasDeclaration:
            return buildResult(exportDeclaration ? "ExportTypeDeclaration" : "TypeDeclaration", node.id.name);
        case utils_1.AST_NODE_TYPES.TSModuleDeclaration:
            return buildResult("ModuleDeclaration");
        default:
            return buildResult(exportDeclaration ? "ExportUnknown" : "Unknown");
    }
    function buildResult(type, id = "~") {
        const order1 = order[type];
        const order2 = sortable[type] ? id : "~";
        const order3 = 1000000 + node.range[0];
        return {
            id,
            index,
            node,
            order,
            parentNode,
            sortingOrder: `${order1} ${order2} ${order3}`,
            type
        };
    }
}
module.exports = rule;
//# sourceMappingURL=statements-order.js.map