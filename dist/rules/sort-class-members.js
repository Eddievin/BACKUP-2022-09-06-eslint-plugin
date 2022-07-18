"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sortClassMembers = exports.MessageId = void 0;
const tslib_1 = require("tslib");
const _ = tslib_1.__importStar(require("@skylib/lodash-commonjs-es"));
const utils = tslib_1.__importStar(require("./utils"));
const functions_1 = require("@skylib/functions");
const utils_1 = require("@typescript-eslint/utils");
var MessageId;
(function (MessageId) {
    MessageId["incorrectSortingOrder"] = "incorrectSortingOrder";
})(MessageId = exports.MessageId || (exports.MessageId = {}));
exports.sortClassMembers = utils.createRule({
    name: "sort-class-members",
    fixable: utils.Fixable.code,
    isOptions: functions_1.is.object.factory({ sortingOrder: functions_1.is.strings }, {}),
    defaultOptions: { sortingOrder: [] },
    messages: { [MessageId.incorrectSortingOrder]: "Incorrect sorting order" },
    create: (context) => {
        const sortingOrders = new functions_1.ReadonlyMap(context.options.sortingOrder.map((name, index) => [name, index]));
        return {
            ClassBody: (node) => {
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
                const fixes = functions_1.a
                    .fromIterable(sortedMembers.entries())
                    .filter(([index, sortedMember]) => sortedMember.index !== index)
                    .map(([index, sortedMember]) => {
                    const member = functions_1.a.get(members, index);
                    return {
                        range: context.getRangeWithLeadingTrivia(member.node),
                        text: context.getTextWithLeadingTrivia(sortedMember.node)
                    };
                });
                if (fixes.length)
                    context.report({
                        fix: () => fixes,
                        messageId: MessageId.incorrectSortingOrder,
                        node
                    });
            }
        };
    }
});
var DynamicStatic;
(function (DynamicStatic) {
    DynamicStatic["dynamic"] = "dynamic";
    DynamicStatic["static"] = "static";
})(DynamicStatic || (DynamicStatic = {}));
var Type;
(function (Type) {
    Type["accessor"] = "accessor";
    Type["block"] = "block";
    // eslint-disable-next-line @typescript-eslint/no-shadow -- Ok
    Type["constructor"] = "constructor";
    Type["field"] = "field";
    Type["get"] = "get";
    Type["method"] = "method";
    Type["set"] = "set";
    Type["signature"] = "signature";
})(Type || (Type = {}));
var AccessorType;
(function (AccessorType) {
    AccessorType["get"] = "get";
    AccessorType["none"] = "none";
    AccessorType["set"] = "set";
})(AccessorType || (AccessorType = {}));
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
                    return AccessorType.get;
                case "set":
                    return AccessorType.set;
                default:
                    return AccessorType.none;
            }
        default:
            return AccessorType.none;
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
            return ((_a = node.static) !== null && _a !== void 0 ? _a : false)
                ? DynamicStatic.static
                : DynamicStatic.dynamic;
        case utils_1.AST_NODE_TYPES.StaticBlock:
            return DynamicStatic.static;
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
            return (0, functions_1.evaluate)(() => {
                switch (node.kind) {
                    case "constructor":
                        return [Type.constructor];
                    case "get":
                        return [Type.accessor, Type.get];
                    case "method":
                        return [Type.method];
                    case "set":
                        return [Type.accessor, Type.set];
                }
            });
        case utils_1.AST_NODE_TYPES.PropertyDefinition:
        case utils_1.AST_NODE_TYPES.TSAbstractPropertyDefinition:
            return [Type.field];
        case utils_1.AST_NODE_TYPES.TSIndexSignature:
            return [Type.signature];
        case utils_1.AST_NODE_TYPES.StaticBlock:
            return [Type.block];
    }
}
//# sourceMappingURL=sort-class-members.js.map