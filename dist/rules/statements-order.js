"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.statementsOrder = void 0;
const tslib_1 = require("tslib");
const functions_1 = require("@skylib/functions");
const _ = tslib_1.__importStar(require("@skylib/lodash-commonjs-es"));
const utils_1 = require("@typescript-eslint/utils");
const utils = tslib_1.__importStar(require("./utils"));
exports.statementsOrder = utils.createRule({
    create(context) {
        const blockOrder = Object.assign(Object.assign(Object.assign({}, defaultOrder), functions_1.o.fromEntries(context.options.order.map((type, index) => [type, index]))), functions_1.o.fromEntries(context.options.blockOrder.map((type, index) => [type, index])));
        const moduleOrder = Object.assign(Object.assign(Object.assign({}, defaultOrder), functions_1.o.fromEntries(context.options.order.map((type, index) => [type, index]))), functions_1.o.fromEntries(context.options.moduleOrder.map((type, index) => [type, index])));
        const rootOrder = Object.assign(Object.assign(Object.assign({}, defaultOrder), functions_1.o.fromEntries(context.options.order.map((type, index) => [type, index]))), functions_1.o.fromEntries(context.options.rootOrder.map((type, index) => [type, index])));
        const itemsMap = new Map();
        return {
            "*"(node) {
                if (node.parent) {
                    const id = utils.getNodeId(node.parent);
                    // eslint-disable-next-line deprecation/deprecation -- Wait for @skylib/functions update
                    const index = functions_1.arrayMap.get(id, itemsMap).length;
                    const parentNode = node.parent;
                    const order = functions_1.fn.run(() => {
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
                        // eslint-disable-next-line deprecation/deprecation -- Wait for @skylib/functions update
                        functions_1.arrayMap.push(id, nodeInfo(node, parentNode, index, order), itemsMap);
                }
            },
            "Program:exit"() {
                for (const items of itemsMap.values()) {
                    const sortedItems = _.sortBy(items, node => node.sortingOrder);
                    const fixes = [];
                    for (const [index, sortedItem] of sortedItems.entries())
                        if (sortedItem.index === index) {
                            // Valid
                        }
                        else {
                            const item = functions_1.a.get(items, index);
                            fixes.push({
                                range: context.getRangeWithLeadingTrivia(item.node),
                                text: context.getTextWithLeadingTrivia(sortedItem.node)
                            });
                        }
                    if (fixes.length)
                        context.report({
                            fix: () => fixes,
                            messageId: "incorrectStatementsOrder",
                            node: functions_1.a.first(items).parentNode
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
    isRuleOptions: functions_1.fn.run(() => {
        const NodeTypeVO = (0, functions_1.createValidationObject)({
            ExportAllDeclaration: "ExportAllDeclaration",
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
        const isNodeType = functions_1.is.factory(functions_1.is.enumeration, NodeTypeVO);
        const isNodeTypes = functions_1.is.factory(functions_1.is.array.of, isNodeType);
        return functions_1.is.object.factory({
            blockOrder: isNodeTypes,
            moduleOrder: isNodeTypes,
            order: isNodeTypes,
            rootOrder: isNodeTypes
        }, {});
    }),
    messages: { incorrectStatementsOrder: "Incorrect statements order" },
    name: "statements-order"
});
const defaultOrder = {
    ExportAllDeclaration: 1003,
    ExportDeclaration: 1004,
    ExportDefaultDeclaration: 1005,
    ExportFunctionDeclaration: 1008,
    ExportModuleDeclaration: 1009,
    ExportTypeDeclaration: 1007,
    ExportUnknown: 1006,
    FunctionDeclaration: 1012,
    GlobalModuleDeclaration: 1002,
    ImportDeclaration: 1001,
    JestTest: 1014,
    ModuleDeclaration: 1013,
    TypeDeclaration: 1011,
    Unknown: 1010
};
const sortable = {
    ExportAllDeclaration: true,
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
// eslint-disable-next-line complexity
function getJestTestName(node) {
    if (node.expression.type === utils_1.AST_NODE_TYPES.CallExpression) {
        const argument = node.expression.arguments[0];
        if (argument &&
            argument.type === utils_1.AST_NODE_TYPES.Literal &&
            functions_1.is.string(argument.value)) {
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
            if (callee.type === utils_1.AST_NODE_TYPES.MemberExpression &&
                callee.object.type === utils_1.AST_NODE_TYPES.Identifier &&
                callee.object.name === "test" &&
                callee.property.type === utils_1.AST_NODE_TYPES.Identifier &&
                callee.property.name === "only")
                return argument.value;
            if (callee.type === utils_1.AST_NODE_TYPES.CallExpression &&
                callee.callee.type === utils_1.AST_NODE_TYPES.MemberExpression &&
                callee.callee.object.type === utils_1.AST_NODE_TYPES.MemberExpression &&
                callee.callee.object.object.type === utils_1.AST_NODE_TYPES.Identifier &&
                callee.callee.object.object.name === "test" &&
                callee.callee.object.property.type === utils_1.AST_NODE_TYPES.Identifier &&
                callee.callee.object.property.name === "only" &&
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
        case utils_1.AST_NODE_TYPES.ExportAllDeclaration:
            functions_1.assert.not.empty(node.source);
            return buildResult("ExportAllDeclaration", `${node.source.value} ${node.exportKind}`);
        case utils_1.AST_NODE_TYPES.ExportDefaultDeclaration:
            return buildResult("ExportDefaultDeclaration");
        case utils_1.AST_NODE_TYPES.ExportNamedDeclaration:
            if (node.declaration)
                switch (node.declaration.type) {
                    case utils_1.AST_NODE_TYPES.FunctionDeclaration:
                    case utils_1.AST_NODE_TYPES.TSDeclareFunction:
                        functions_1.assert.not.empty(node.declaration.id);
                        return buildResult("ExportFunctionDeclaration", node.declaration.id.name);
                    case utils_1.AST_NODE_TYPES.TSInterfaceDeclaration:
                    case utils_1.AST_NODE_TYPES.TSTypeAliasDeclaration:
                        return buildResult("ExportTypeDeclaration", node.declaration.id.name);
                    case utils_1.AST_NODE_TYPES.TSModuleDeclaration:
                        return buildResult("ExportModuleDeclaration");
                    default:
                        return buildResult("ExportUnknown");
                }
            return buildResult("ExportDeclaration", node.source ? `${node.source.value} ${node.exportKind}` : "~");
        case utils_1.AST_NODE_TYPES.ExpressionStatement:
            {
                const id = getJestTestName(node);
                if (functions_1.is.not.empty(id))
                    return buildResult("JestTest", id);
            }
            return buildResult("Unknown");
        case utils_1.AST_NODE_TYPES.FunctionDeclaration:
        case utils_1.AST_NODE_TYPES.TSDeclareFunction:
            functions_1.assert.not.empty(node.id);
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
    function buildResult(type, id = "") {
        const order1 = order[type];
        const order2 = sortable[type] ? id : "";
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
//# sourceMappingURL=statements-order.js.map