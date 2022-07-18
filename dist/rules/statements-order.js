"use strict";
/* eslint-disable @typescript-eslint/naming-convention -- Wait for @skylib/config update */
Object.defineProperty(exports, "__esModule", { value: true });
exports.statementsOrder = exports.MessageId = exports.isNodeTypes = exports.isNodeType = exports.NodeType = void 0;
const tslib_1 = require("tslib");
const _ = tslib_1.__importStar(require("@skylib/lodash-commonjs-es"));
const utils = tslib_1.__importStar(require("./utils"));
const functions_1 = require("@skylib/functions");
const utils_1 = require("@typescript-eslint/utils");
var NodeType;
(function (NodeType) {
    NodeType["ExportAllDeclaration"] = "ExportAllDeclaration";
    NodeType["ExportDeclaration"] = "ExportDeclaration";
    NodeType["ExportDefaultDeclaration"] = "ExportDefaultDeclaration";
    NodeType["ExportFunctionDeclaration"] = "ExportFunctionDeclaration";
    NodeType["ExportModuleDeclaration"] = "ExportModuleDeclaration";
    NodeType["ExportTypeDeclaration"] = "ExportTypeDeclaration";
    NodeType["ExportUnknown"] = "ExportUnknown";
    NodeType["FunctionDeclaration"] = "FunctionDeclaration";
    NodeType["GlobalModuleDeclaration"] = "GlobalModuleDeclaration";
    NodeType["ImportDeclaration"] = "ImportDeclaration";
    NodeType["JestTest"] = "JestTest";
    NodeType["ModuleDeclaration"] = "ModuleDeclaration";
    NodeType["TypeDeclaration"] = "TypeDeclaration";
    NodeType["Unknown"] = "Unknown";
})(NodeType = exports.NodeType || (exports.NodeType = {}));
exports.isNodeType = functions_1.is.factory(functions_1.is.enumeration, NodeType);
exports.isNodeTypes = functions_1.is.factory(functions_1.is.array.of, exports.isNodeType);
var MessageId;
(function (MessageId) {
    MessageId["incorrectStatementsOrder"] = "incorrectStatementsOrder";
})(MessageId = exports.MessageId || (exports.MessageId = {}));
exports.statementsOrder = utils.createRule({
    name: "statements-order",
    fixable: utils.Fixable.code,
    isOptions: functions_1.is.object.factory({
        blockOrder: exports.isNodeTypes,
        moduleOrder: exports.isNodeTypes,
        order: exports.isNodeTypes,
        rootOrder: exports.isNodeTypes
    }, {}),
    defaultOptions: {
        blockOrder: [],
        moduleOrder: [],
        order: [],
        rootOrder: []
    },
    messages: {
        [MessageId.incorrectStatementsOrder]: "Incorrect statements order"
    },
    create: (context) => {
        const blockOrder = Object.assign(Object.assign(Object.assign({}, defaultOrder), functions_1.o.fromEntries(context.options.order.map((type, index) => [type, index]))), functions_1.o.fromEntries(context.options.blockOrder.map((type, index) => [type, index])));
        const moduleOrder = Object.assign(Object.assign(Object.assign({}, defaultOrder), functions_1.o.fromEntries(context.options.order.map((type, index) => [type, index]))), functions_1.o.fromEntries(context.options.moduleOrder.map((type, index) => [type, index])));
        const rootOrder = Object.assign(Object.assign(Object.assign({}, defaultOrder), functions_1.o.fromEntries(context.options.order.map((type, index) => [type, index]))), functions_1.o.fromEntries(context.options.rootOrder.map((type, index) => [type, index])));
        const itemsMap = new functions_1.Accumulator();
        return {
            "*": (node) => {
                if (node.parent) {
                    const id = utils.getNodeId(node.parent);
                    const index = itemsMap.get(id).length;
                    const parentNode = node.parent;
                    const order = (0, functions_1.evaluate)(() => {
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
                        itemsMap.push(id, nodeInfo(node, parentNode, index, order));
                }
            },
            "Program:exit": () => {
                for (const items of itemsMap.values()) {
                    const sortedItems = _.sortBy(items, node => node.sortingOrder);
                    const fixes = functions_1.a
                        .fromIterable(sortedItems.entries())
                        .filter(([index, sortedItem]) => sortedItem.index !== index)
                        .map(([index, sortedItem]) => {
                        const item = functions_1.a.get(items, index);
                        return {
                            range: context.getRangeWithLeadingTrivia(item.node),
                            text: context.getTextWithLeadingTrivia(sortedItem.node)
                        };
                    });
                    if (fixes.length)
                        context.report({
                            fix: () => fixes,
                            messageId: MessageId.incorrectStatementsOrder,
                            node: functions_1.a.first(items).parentNode
                        });
                }
            }
        };
    }
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
function getJestTestName(node) {
    if (node.expression.type === "CallExpression") {
        const argument = node.expression.arguments[0];
        if (argument && argument.type === "Literal" && functions_1.is.string(argument.value)) {
            const { callee } = node.expression;
            if (callee.type === "Identifier" && callee.name === "test")
                return argument.value;
            if (callee.type === "MemberExpression" &&
                isIdentifier(callee.object, "test") &&
                isIdentifier(callee.property, "only", "skip"))
                return argument.value;
            if (callee.type === "CallExpression" &&
                callee.callee.type === "MemberExpression" &&
                isIdentifier(callee.callee.object, "test") &&
                isIdentifier(callee.callee.property, "each"))
                return argument.value;
            if (callee.type === "CallExpression" &&
                callee.callee.type === "MemberExpression" &&
                callee.callee.object.type === "MemberExpression" &&
                isIdentifier(callee.callee.object.object, "test") &&
                isIdentifier(callee.callee.object.property, "only", "skip") &&
                isIdentifier(callee.callee.property, "each"))
                return argument.value;
        }
    }
    return undefined;
}
/**
 * Checks if node is an identifier.
 *
 * @param node - Node.
 * @param names - Allowed names.
 * @returns _True_ if node is an identifier, _false_ otherwise.
 */
function isIdentifier(node, ...names) {
    return node.type === "Identifier" && names.includes(node.name);
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
            return buildResult(NodeType.ExportAllDeclaration, `${node.source.value} ${node.exportKind}`);
        case utils_1.AST_NODE_TYPES.ExportDefaultDeclaration:
            return buildResult(NodeType.ExportDefaultDeclaration);
        case utils_1.AST_NODE_TYPES.ExportNamedDeclaration:
            if (node.declaration)
                switch (node.declaration.type) {
                    case utils_1.AST_NODE_TYPES.FunctionDeclaration:
                    case utils_1.AST_NODE_TYPES.TSDeclareFunction:
                        functions_1.assert.not.empty(node.declaration.id, "Expecting declaration ID");
                        return buildResult(NodeType.ExportFunctionDeclaration, node.declaration.id.name);
                    case utils_1.AST_NODE_TYPES.TSInterfaceDeclaration:
                    case utils_1.AST_NODE_TYPES.TSTypeAliasDeclaration:
                        return buildResult(NodeType.ExportTypeDeclaration, node.declaration.id.name);
                    case utils_1.AST_NODE_TYPES.TSModuleDeclaration:
                        return buildResult(NodeType.ExportModuleDeclaration);
                    default:
                        return buildResult(NodeType.ExportUnknown);
                }
            return buildResult(NodeType.ExportDeclaration, node.source ? `${node.source.value} ${node.exportKind}` : "~");
        case utils_1.AST_NODE_TYPES.ExpressionStatement:
            {
                const id = getJestTestName(node);
                if (functions_1.is.not.empty(id))
                    return buildResult(NodeType.JestTest, id);
            }
            return buildResult(NodeType.Unknown);
        case utils_1.AST_NODE_TYPES.FunctionDeclaration:
        case utils_1.AST_NODE_TYPES.TSDeclareFunction:
            functions_1.assert.not.empty(node.id, "Expecting node ID");
            return buildResult(NodeType.FunctionDeclaration, node.id.name);
        case utils_1.AST_NODE_TYPES.ImportDeclaration:
            return buildResult(NodeType.ImportDeclaration);
        case utils_1.AST_NODE_TYPES.TSInterfaceDeclaration:
        case utils_1.AST_NODE_TYPES.TSTypeAliasDeclaration:
            return buildResult(NodeType.TypeDeclaration, node.id.name);
        case utils_1.AST_NODE_TYPES.TSModuleDeclaration:
            return ((_a = node.global) !== null && _a !== void 0 ? _a : false)
                ? buildResult(NodeType.GlobalModuleDeclaration)
                : buildResult(NodeType.ModuleDeclaration);
        default:
            return buildResult(NodeType.Unknown);
    }
    function buildResult(type, id = "") {
        const order1 = 1000000 + order[type];
        const order2 = sortable[type] ? id : "";
        const order3 = 1000000 + node.range[0];
        return {
            id,
            index,
            node,
            order,
            parentNode,
            sortingOrder: `${order1}\u0000${order2}\u0000${order3}`,
            type
        };
    }
}
//# sourceMappingURL=statements-order.js.map