"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sortClassMembers = void 0;
const tslib_1 = require("tslib");
const utils = tslib_1.__importStar(require("./utils"));
const functions_1 = require("@skylib/functions");
const _ = tslib_1.__importStar(require("@skylib/lodash-commonjs-es"));
const utils_1 = require("@typescript-eslint/utils");
exports.sortClassMembers = utils.createRule({
    create: (context) => {
        const sortingOrders = new Map(context.options.sortingOrder.map((name, index) => [name, index]));
        return {
            [utils_1.AST_NODE_TYPES.ClassBody]: (node) => {
                const members = node.body.map((member, index) => {
                    const x = getMemberAccessibility(member);
                    const y = getMemberDynamicStatic(member);
                    const types = getMemberTypes(member);
                    const sortingOrder = 1000 +
                        Math.min(...types.map(z => Math.min(...[
                            1000,
                            sortingOrders.get(x),
                            sortingOrders.get(y),
                            sortingOrders.get(z),
                            sortingOrders.get(`${x}-${y}`),
                            sortingOrders.get(`${x}-${z}`),
                            sortingOrders.get(`${y}-${x}`),
                            sortingOrders.get(`${y}-${z}`),
                            sortingOrders.get(`${z}-${x}`),
                            sortingOrders.get(`${z}-${y}`),
                            sortingOrders.get(`${x}-${y}-${z}`),
                            sortingOrders.get(`${x}-${z}-${y}`),
                            sortingOrders.get(`${y}-${x}-${z}`),
                            sortingOrders.get(`${y}-${z}-${x}`),
                            sortingOrders.get(`${z}-${x}-${y}`),
                            sortingOrders.get(`${z}-${y}-${x}`)
                        ].filter(functions_1.is.not.empty))));
                    const name = context.getMemberName(member);
                    const accessorType = getMemberAccessorType(member);
                    return {
                        index,
                        node: member,
                        sortingOrder: `${sortingOrder} ${name} ${accessorType}`
                    };
                });
                const sortedMembers = _.sortBy(members, member => member.sortingOrder);
                const fixes = [];
                for (const [index, sortedMember] of sortedMembers.entries())
                    if (sortedMember.index === index) {
                        // Valid
                    }
                    else {
                        const member = functions_1.a.get(members, index);
                        fixes.push({
                            range: context.getRangeWithLeadingTrivia(member.node),
                            text: context.getTextWithLeadingTrivia(sortedMember.node)
                        });
                    }
                if (fixes.length > 0)
                    context.report({
                        fix: () => fixes,
                        messageId: "incorrectSortingOrder",
                        node
                    });
            }
        };
    },
    defaultOptions: { sortingOrder: [] },
    fixable: "code",
    isRuleOptions: functions_1.is.object.factory({ sortingOrder: functions_1.is.strings }, {}),
    messages: { incorrectSortingOrder: "Incorrect sorting order" },
    name: "sort-class-members"
});
/**
 * Gets member accessibility.
 *
 * @param node - Node.
 * @returns Member accessibility.
 */
function getMemberAccessibility(node) {
    switch (node.type) {
        case utils_1.AST_NODE_TYPES.MethodDefinition:
        case utils_1.AST_NODE_TYPES.PropertyDefinition:
        case utils_1.AST_NODE_TYPES.TSAbstractMethodDefinition:
        case utils_1.AST_NODE_TYPES.TSAbstractPropertyDefinition:
        case utils_1.AST_NODE_TYPES.TSIndexSignature:
            return node.accessibility ? node.accessibility.valueOf() : "public";
        case utils_1.AST_NODE_TYPES.StaticBlock:
            return "public";
    }
}
/**
 * Gets member accessor type.
 *
 * @param node - Node.
 * @returns Member accessor type.
 */
function getMemberAccessorType(node) {
    switch (node.type) {
        case utils_1.AST_NODE_TYPES.MethodDefinition:
        case utils_1.AST_NODE_TYPES.TSAbstractMethodDefinition:
            switch (node.kind) {
                case "get":
                case "set":
                    return node.kind;
                default:
                    return "none";
            }
        default:
            return "none";
    }
}
/**
 * Gets member dynamic/static state.
 *
 * @param node - Node.
 * @returns Member dynamic/static state.
 */
function getMemberDynamicStatic(node) {
    var _a;
    switch (node.type) {
        case utils_1.AST_NODE_TYPES.MethodDefinition:
        case utils_1.AST_NODE_TYPES.PropertyDefinition:
        case utils_1.AST_NODE_TYPES.TSAbstractMethodDefinition:
        case utils_1.AST_NODE_TYPES.TSAbstractPropertyDefinition:
        case utils_1.AST_NODE_TYPES.TSIndexSignature:
            return ((_a = node.static) !== null && _a !== void 0 ? _a : false) ? "static" : "dynamic";
        case utils_1.AST_NODE_TYPES.StaticBlock:
            return "static";
    }
}
/**
 * Gets member types.
 *
 * @param node - Node.
 * @returns Member types.
 */
function getMemberTypes(node) {
    switch (node.type) {
        case utils_1.AST_NODE_TYPES.MethodDefinition:
        case utils_1.AST_NODE_TYPES.TSAbstractMethodDefinition:
            switch (node.kind) {
                case "get":
                case "set":
                    return ["accessor", node.kind];
                default:
                    return [node.kind];
            }
        case utils_1.AST_NODE_TYPES.PropertyDefinition:
        case utils_1.AST_NODE_TYPES.TSAbstractPropertyDefinition:
            return ["field"];
        case utils_1.AST_NODE_TYPES.TSIndexSignature:
            return ["signature"];
        case utils_1.AST_NODE_TYPES.StaticBlock:
            return ["block"];
    }
}
//# sourceMappingURL=sort-class-members.js.map