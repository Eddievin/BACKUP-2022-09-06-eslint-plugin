"use strict";
const tslib_1 = require("tslib");
const _ = (0, tslib_1.__importStar)(require("lodash"));
const experimental_utils_1 = require("@typescript-eslint/experimental-utils");
const a = (0, tslib_1.__importStar)(require("@typerock/functions/dist/array"));
const cast = (0, tslib_1.__importStar)(require("@typerock/functions/dist/converters"));
const is = (0, tslib_1.__importStar)(require("@typerock/functions/dist/guards"));
const utils = (0, tslib_1.__importStar)(require("./utils"));
const isRuleOptions = is.factory(is.object.of, { sortingOrder: is.strings }, {});
const rule = utils.createRule({
    create(context) {
        const sortingOrders = new Map(context.options.sortingOrder.map((name, index) => [name, index]));
        return {
            [experimental_utils_1.AST_NODE_TYPES.ClassBody](node) {
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
                        ].filter(is.not.empty))));
                    const name = getMemberName(member, context);
                    const accessorType = getMemberAccessorType(member);
                    return {
                        index,
                        node: member,
                        sortingOrder: `${sortingOrder}-${name}-${accessorType}`
                    };
                });
                const sortedMembers = _.sortBy(members, member => member.sortingOrder);
                const fixes = [];
                for (const [index, sortedMember] of sortedMembers.entries())
                    if (sortedMember.index !== index) {
                        const member = a.get(members, index);
                        fixes.push({
                            range: context.getRangeWithLeadingTrivia(member.node),
                            text: context.getTextWithLeadingTrivia(sortedMember.node)
                        });
                    }
                if (fixes.length)
                    context.report({
                        fix: () => fixes,
                        messageId: "incorrectSortingOrder",
                        node
                    });
            }
        };
    },
    defaultOptions: {
        sortingOrder: []
    },
    fixable: "code",
    isRuleOptions,
    messages: {
        incorrectSortingOrder: "Incorrect sorting order"
    }
});
/**
 * Gets member accessibility.
 *
 * @param node - Node.
 * @returns Member accessibility.
 */
function getMemberAccessibility(node) {
    switch (node.type) {
        case experimental_utils_1.AST_NODE_TYPES.MethodDefinition:
        case experimental_utils_1.AST_NODE_TYPES.PropertyDefinition:
        case experimental_utils_1.AST_NODE_TYPES.TSAbstractMethodDefinition:
        case experimental_utils_1.AST_NODE_TYPES.TSAbstractPropertyDefinition:
        case experimental_utils_1.AST_NODE_TYPES.TSIndexSignature:
            return node.accessibility ? node.accessibility.valueOf() : "public";
        case experimental_utils_1.AST_NODE_TYPES.StaticBlock:
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
        case experimental_utils_1.AST_NODE_TYPES.MethodDefinition:
        case experimental_utils_1.AST_NODE_TYPES.TSAbstractMethodDefinition:
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
        case experimental_utils_1.AST_NODE_TYPES.MethodDefinition:
        case experimental_utils_1.AST_NODE_TYPES.PropertyDefinition:
        case experimental_utils_1.AST_NODE_TYPES.TSAbstractMethodDefinition:
        case experimental_utils_1.AST_NODE_TYPES.TSAbstractPropertyDefinition:
        case experimental_utils_1.AST_NODE_TYPES.TSIndexSignature:
            return ((_a = node.static) !== null && _a !== void 0 ? _a : false) ? "static" : "dynamic";
        case experimental_utils_1.AST_NODE_TYPES.StaticBlock:
            return "static";
    }
}
/**
 * Gets member name.
 *
 * @param node - Node.
 * @param context - Context.
 * @returns Member name.
 */
function getMemberName(node, context) {
    switch (node.type) {
        case experimental_utils_1.AST_NODE_TYPES.MethodDefinition:
        case experimental_utils_1.AST_NODE_TYPES.PropertyDefinition:
        case experimental_utils_1.AST_NODE_TYPES.TSAbstractMethodDefinition:
        case experimental_utils_1.AST_NODE_TYPES.TSAbstractPropertyDefinition:
            switch (node.key.type) {
                case experimental_utils_1.AST_NODE_TYPES.Identifier:
                    return node.key.name;
                case experimental_utils_1.AST_NODE_TYPES.Literal:
                    return cast.string(node.key.value);
                default:
                    return context.getText(node.key);
            }
        case experimental_utils_1.AST_NODE_TYPES.StaticBlock:
        case experimental_utils_1.AST_NODE_TYPES.TSIndexSignature:
            return "";
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
        case experimental_utils_1.AST_NODE_TYPES.MethodDefinition:
        case experimental_utils_1.AST_NODE_TYPES.TSAbstractMethodDefinition:
            switch (node.kind) {
                case "get":
                case "set":
                    return ["accessor", node.kind];
                default:
                    return [node.kind];
            }
        case experimental_utils_1.AST_NODE_TYPES.PropertyDefinition:
        case experimental_utils_1.AST_NODE_TYPES.TSAbstractPropertyDefinition:
            return ["field"];
        case experimental_utils_1.AST_NODE_TYPES.TSIndexSignature:
            return ["signature"];
        case experimental_utils_1.AST_NODE_TYPES.StaticBlock:
            return ["block"];
    }
}
module.exports = rule;
//# sourceMappingURL=sort-class-members.js.map