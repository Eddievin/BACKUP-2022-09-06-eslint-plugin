"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sortStatements = exports.isNodeTypes = exports.isNodeType = exports.NodeType = void 0;
const tslib_1 = require("tslib");
const _ = tslib_1.__importStar(require("@skylib/lodash-commonjs-es"));
const utils = tslib_1.__importStar(require("../../utils"));
const functions_1 = require("@skylib/functions");
const utils_1 = require("@typescript-eslint/utils");
var NodeType;
(function (NodeType) {
    NodeType["ExportAllDeclaration"] = "ExportAllDeclaration";
    NodeType["ExportDeclaration"] = "ExportDeclaration";
    NodeType["ExportDefaultDeclaration"] = "ExportDefaultDeclaration";
    NodeType["ExportFunctionDeclaration"] = "ExportFunctionDeclaration";
    NodeType["ExportTypeDeclaration"] = "ExportTypeDeclaration";
    NodeType["ExportUnknown"] = "ExportUnknown";
    NodeType["FunctionDeclaration"] = "FunctionDeclaration";
    NodeType["ImportDeclaration"] = "ImportDeclaration";
    NodeType["JestTest"] = "JestTest";
    NodeType["TypeDeclaration"] = "TypeDeclaration";
    NodeType["Unknown"] = "Unknown";
})(NodeType = exports.NodeType || (exports.NodeType = {}));
exports.isNodeType = functions_1.is.factory(functions_1.is.enumeration, NodeType);
exports.isNodeTypes = functions_1.is.factory(functions_1.is.array.of, exports.isNodeType);
exports.sortStatements = utils.createRule({
    name: "sort-statements",
    fixable: utils.Fixable.code,
    isOptions: functions_1.is.object.factory({
        blockOrder: exports.isNodeTypes,
        moduleOrder: exports.isNodeTypes,
        order: exports.isNodeTypes,
        programOrder: exports.isNodeTypes
    }, {}),
    defaultOptions: {
        blockOrder: [],
        moduleOrder: [],
        order: [],
        programOrder: []
    },
    messages: utils.sort.messages,
    create: (context) => {
        const { blockOrder, moduleOrder, order, programOrder } = context.options;
        return {
            BlockStatement: node => {
                utils.sort(node.body, context, {
                    sortingOrder: sortingOrder(_.uniq([...blockOrder, ...order, ...defaultOrder]))
                });
            },
            Program: node => {
                utils.sort(node.body, context, {
                    sortingOrder: sortingOrder(_.uniq([...programOrder, ...order, ...defaultOrder]))
                });
            },
            TSModuleBlock: node => {
                utils.sort(node.body, context, {
                    sortingOrder: sortingOrder(_.uniq([...moduleOrder, ...order, ...defaultOrder]))
                });
            }
        };
    }
});
const defaultOrder = [
    NodeType.ImportDeclaration,
    NodeType.ExportAllDeclaration,
    NodeType.ExportDeclaration,
    NodeType.ExportDefaultDeclaration,
    NodeType.ExportUnknown,
    NodeType.ExportTypeDeclaration,
    NodeType.ExportFunctionDeclaration,
    NodeType.Unknown,
    NodeType.TypeDeclaration,
    NodeType.FunctionDeclaration,
    NodeType.JestTest
];
const prepareForComparison = (0, functions_1.evaluate)(() => {
    const priority = ":,.";
    const keys = functions_1.a.fromString(priority);
    const values = functions_1.a.sort(functions_1.a.fromString(priority));
    const map = functions_1.o.fromEntries(keys.map((key, index) => [key, functions_1.a.get(values, index)]));
    // eslint-disable-next-line security/detect-non-literal-regexp -- Ok
    const re = new RegExp(`[${functions_1.s.escapeRegExpSpecialChars(priority)}]`, "gu");
    return (str) => str.replace(re, callback);
    function callback(char) {
        return map[char];
    }
});
const sortable = {
    [NodeType.ExportAllDeclaration]: true,
    [NodeType.ExportDeclaration]: true,
    [NodeType.ExportDefaultDeclaration]: false,
    [NodeType.ExportFunctionDeclaration]: true,
    [NodeType.ExportTypeDeclaration]: true,
    [NodeType.ExportUnknown]: false,
    [NodeType.FunctionDeclaration]: true,
    [NodeType.ImportDeclaration]: false,
    [NodeType.JestTest]: true,
    [NodeType.TypeDeclaration]: true,
    [NodeType.Unknown]: false
};
/**
 * Checks identifier name.
 *
 * @param node - Node.
 * @param names - Expected names.
 * @returns _True_ if node is an identifier with expected name, _false_ otherwise.
 */
function checkIdentifierName(node, ...names) {
    return node.type === utils_1.AST_NODE_TYPES.Identifier && names.includes(node.name);
}
/**
 * Returns Jest test name.
 *
 * @param node - Node.
 * @returns Test name if node contains Jest test, _undefined_ otherwise.
 */
function getJestTestName(node) {
    if (node.expression.type === utils_1.AST_NODE_TYPES.CallExpression) {
        const argument = node.expression.arguments[0];
        if (argument &&
            argument.type === utils_1.AST_NODE_TYPES.Literal &&
            functions_1.is.string(argument.value)) {
            const { callee } = node.expression;
            if ((callee.type === utils_1.AST_NODE_TYPES.Identifier && callee.name === "test") ||
                (callee.type === utils_1.AST_NODE_TYPES.MemberExpression &&
                    checkIdentifierName(callee.object, "test") &&
                    checkIdentifierName(callee.property, "only", "skip")) ||
                (callee.type === utils_1.AST_NODE_TYPES.CallExpression &&
                    callee.callee.type === utils_1.AST_NODE_TYPES.MemberExpression &&
                    checkIdentifierName(callee.callee.object, "test") &&
                    checkIdentifierName(callee.callee.property, "each")) ||
                (callee.type === utils_1.AST_NODE_TYPES.CallExpression &&
                    callee.callee.type === utils_1.AST_NODE_TYPES.MemberExpression &&
                    callee.callee.object.type === utils_1.AST_NODE_TYPES.MemberExpression &&
                    checkIdentifierName(callee.callee.object.object, "test") &&
                    checkIdentifierName(callee.callee.object.property, "only", "skip") &&
                    checkIdentifierName(callee.callee.property, "each")))
                return prepareForComparison(argument.value);
        }
    }
    return undefined;
}
/**
 * Creates sorting order function.
 *
 * @param order - Order.
 * @returns Sorting order function.
 */
function sortingOrder(order) {
    return node => {
        switch (node.type) {
            case utils_1.AST_NODE_TYPES.ExportAllDeclaration:
                return buildResult(NodeType.ExportAllDeclaration, `${node.source.value}\u0002${node.exportKind}`);
            case utils_1.AST_NODE_TYPES.ExportDefaultDeclaration:
                return buildResult(NodeType.ExportDefaultDeclaration);
            case utils_1.AST_NODE_TYPES.ExportNamedDeclaration:
                if (node.declaration)
                    switch (node.declaration.type) {
                        case utils_1.AST_NODE_TYPES.FunctionDeclaration:
                        case utils_1.AST_NODE_TYPES.TSDeclareFunction:
                            functions_1.assert.not.empty(node.declaration.id, "Expecting node ID");
                            return buildResult(NodeType.ExportFunctionDeclaration, node.declaration.id.name);
                        case utils_1.AST_NODE_TYPES.TSInterfaceDeclaration:
                        case utils_1.AST_NODE_TYPES.TSTypeAliasDeclaration:
                            return buildResult(NodeType.ExportTypeDeclaration, node.declaration.id.name);
                        default:
                            return buildResult(NodeType.ExportUnknown);
                    }
                return buildResult(NodeType.ExportDeclaration, node.source ? `${node.source.value}\u0002${node.exportKind}` : "");
            case utils_1.AST_NODE_TYPES.ExpressionStatement: {
                const id = getJestTestName(node);
                return functions_1.is.not.empty(id)
                    ? buildResult(NodeType.JestTest, id)
                    : buildResult(NodeType.Unknown);
            }
            case utils_1.AST_NODE_TYPES.FunctionDeclaration:
            case utils_1.AST_NODE_TYPES.TSDeclareFunction:
                functions_1.assert.not.empty(node.id, "Expecting node ID");
                return buildResult(NodeType.FunctionDeclaration, node.id.name);
            case utils_1.AST_NODE_TYPES.ImportDeclaration:
                return buildResult(NodeType.ImportDeclaration);
            case utils_1.AST_NODE_TYPES.TSInterfaceDeclaration:
            case utils_1.AST_NODE_TYPES.TSTypeAliasDeclaration:
                return buildResult(NodeType.TypeDeclaration, node.id.name);
            default:
                return buildResult(NodeType.Unknown);
        }
        function buildResult(type, id = "") {
            const order1 = 1000000 + order.indexOf(type);
            const order2 = sortable[type] ? id : "";
            const order3 = 1000000 + node.range[0];
            return `${order1}\u0001${order2}\u0001${order3}`;
        }
    };
}
//# sourceMappingURL=sort-statements.js.map