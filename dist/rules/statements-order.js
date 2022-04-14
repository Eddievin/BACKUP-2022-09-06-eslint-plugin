"use strict";
const tslib_1 = require("tslib");
const a = tslib_1.__importStar(require("@skylib/functions/dist/array"));
const arrayMap = tslib_1.__importStar(require("@skylib/functions/dist/arrayMap"));
const assert = tslib_1.__importStar(require("@skylib/functions/dist/assertions"));
const fn = tslib_1.__importStar(require("@skylib/functions/dist/function"));
const is = tslib_1.__importStar(require("@skylib/functions/dist/guards"));
const helpers_1 = require("@skylib/functions/dist/helpers");
const o = tslib_1.__importStar(require("@skylib/functions/dist/object"));
const utils_1 = require("@typescript-eslint/utils");
const _ = tslib_1.__importStar(require("lodash"));
const utils = tslib_1.__importStar(require("./utils"));
const NodeTypeVO = (0, helpers_1.createValidationObject)({
    ExportDeclaration: "ExportDeclaration",
    ExportDefaultDeclaration: "ExportDefaultDeclaration",
    ExportFunctionDeclaration: "ExportFunctionDeclaration",
    ExportModuleDeclaration: "ExportModuleDeclaration",
    ExportTypeDeclaration: "ExportTypeDeclaration",
    ExportUnknown: "ExportUnknown",
    FunctionDeclaration: "FunctionDeclaration",
    GlobalModuleDeclaration: "GlobalModuleDeclaration",
    ImportDeclaration: "ImportDeclaration",
    JestTest: "JestTest",
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
                        arrayMap.push(id, nodeInfo(node, parentNode, index, order), itemsMap);
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
    messages: { incorrectStatementsOrder: "Incorrect statements order" },
    name: "statements-order"
});
const defaultOrder = {
    ExportDeclaration: 1003,
    ExportDefaultDeclaration: 1004,
    ExportFunctionDeclaration: 1007,
    ExportModuleDeclaration: 1008,
    ExportTypeDeclaration: 1006,
    ExportUnknown: 1005,
    FunctionDeclaration: 1011,
    GlobalModuleDeclaration: 1002,
    ImportDeclaration: 1001,
    JestTest: 1013,
    ModuleDeclaration: 1012,
    TypeDeclaration: 1010,
    Unknown: 1009
};
const sortable = {
    ExportDeclaration: true,
    ExportDefaultDeclaration: false,
    ExportFunctionDeclaration: true,
    ExportModuleDeclaration: false,
    ExportTypeDeclaration: true,
    ExportUnknown: false,
    FunctionDeclaration: true,
    GlobalModuleDeclaration: false,
    ImportDeclaration: false,
    JestTest: true,
    ModuleDeclaration: false,
    TypeDeclaration: true,
    Unknown: false
};
/**
 * Returns Jest test name.
 *
 * @param node - Node.
 * @returns Jest test name if node is Jest test, _undefined_ otherwise.
 */
function getJestTestName(node) {
    if (node.expression.type === utils_1.AST_NODE_TYPES.CallExpression) {
        const argument = node.expression.arguments[0];
        if (argument &&
            argument.type === utils_1.AST_NODE_TYPES.Literal &&
            is.string(argument.value)) {
            const callee = node.expression.callee;
            if (callee.type === utils_1.AST_NODE_TYPES.Identifier && callee.name === "test")
                return argument.value;
            if (callee.type === utils_1.AST_NODE_TYPES.CallExpression &&
                callee.callee.type === utils_1.AST_NODE_TYPES.MemberExpression &&
                callee.callee.object.type === utils_1.AST_NODE_TYPES.Identifier &&
                callee.callee.object.name === "test" &&
                callee.callee.property.type === utils_1.AST_NODE_TYPES.Identifier &&
                callee.callee.property.name === "each")
                return argument.value;
        }
    }
    return undefined;
}
/**
 * Returns node info.
 *
 * @param node - Node.
 * @param parentNode - Parent node.
 * @param index - Index.
 * @param order - Order.
 * @returns Node info.
 */
function nodeInfo(node, parentNode, index, order) {
    var _a;
    switch (node.type) {
        case utils_1.AST_NODE_TYPES.ExportDefaultDeclaration:
            return buildResult("ExportDefaultDeclaration");
        case utils_1.AST_NODE_TYPES.ExportNamedDeclaration: {
            if (node.declaration)
                switch (node.declaration.type) {
                    case utils_1.AST_NODE_TYPES.FunctionDeclaration:
                    case utils_1.AST_NODE_TYPES.TSDeclareFunction:
                        assert.not.empty(node.declaration.id);
                        return buildResult("ExportFunctionDeclaration", node.declaration.id.name);
                    case utils_1.AST_NODE_TYPES.TSInterfaceDeclaration:
                    case utils_1.AST_NODE_TYPES.TSTypeAliasDeclaration:
                        return buildResult("ExportTypeDeclaration", node.declaration.id.name);
                    case utils_1.AST_NODE_TYPES.TSModuleDeclaration:
                        return buildResult("ExportModuleDeclaration");
                    default:
                        return buildResult("ExportUnknown");
                }
            return buildResult("ExportDeclaration");
        }
        case utils_1.AST_NODE_TYPES.ExpressionStatement:
            {
                const id = getJestTestName(node);
                if (is.not.empty(id))
                    return buildResult("JestTest", id);
            }
            return buildResult("Unknown");
        case utils_1.AST_NODE_TYPES.FunctionDeclaration:
        case utils_1.AST_NODE_TYPES.TSDeclareFunction:
            assert.not.empty(node.id);
            return buildResult("FunctionDeclaration", node.id.name);
        case utils_1.AST_NODE_TYPES.ImportDeclaration:
            return buildResult("ImportDeclaration");
        case utils_1.AST_NODE_TYPES.TSInterfaceDeclaration:
        case utils_1.AST_NODE_TYPES.TSTypeAliasDeclaration:
            return buildResult("TypeDeclaration", node.id.name);
        case utils_1.AST_NODE_TYPES.TSModuleDeclaration:
            return ((_a = node.global) !== null && _a !== void 0 ? _a : false)
                ? buildResult("GlobalModuleDeclaration")
                : buildResult("ModuleDeclaration");
        default:
            return buildResult("Unknown");
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