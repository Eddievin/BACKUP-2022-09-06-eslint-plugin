"use strict";
const tslib_1 = require("tslib");
const a = (0, tslib_1.__importStar)(require("@skylib/functions/dist/array"));
const arrayMap = (0, tslib_1.__importStar)(require("@skylib/functions/dist/arrayMap"));
const assert = (0, tslib_1.__importStar)(require("@skylib/functions/dist/assertions"));
const is = (0, tslib_1.__importStar)(require("@skylib/functions/dist/guards"));
const num = (0, tslib_1.__importStar)(require("@skylib/functions/dist/number"));
const s = (0, tslib_1.__importStar)(require("@skylib/functions/dist/string"));
const utils = (0, tslib_1.__importStar)(require("./utils"));
const isSubOptions = is.factory(is.object.of, {
    averageLinesGte: is.number,
    everyLinesGte: is.number,
    selector: is.string,
    someHasDocComment: is.boolean,
    someLinesGte: is.number
}, {});
const rule = utils.createRule({
    create(context) {
        const childNodesMap = new Map();
        const nodesMap2 = new Map();
        const listener = {
            "*"(node) {
                buildChildNodesMap(node, childNodesMap);
            },
            "Program:exit"() {
                for (const subOptions of context.subOptionsArray) {
                    const nodesMap = nodesMap2.get(subOptions.selector);
                    if (nodesMap)
                        for (const [id, nodes] of nodesMap.entries()) {
                            const group = [];
                            for (const node of nodes)
                                if (group.length)
                                    if (isAdjacentNodes(id, a.last(group), node, childNodesMap))
                                        group.push(node);
                                    else {
                                        lintGroup(group, subOptions, context);
                                        a.truncate(group);
                                        group.push(node);
                                    }
                                else
                                    group.push(node);
                            lintGroup(group, subOptions, context);
                        }
                }
            }
        };
        for (const subOptions of context.subOptionsArray)
            listener[subOptions.selector] = function (node) {
                const selector = subOptions.selector;
                const id = getNodeId(node.parent);
                arrayMap.push2(selector, id, node, nodesMap2);
            };
        return listener;
    },
    defaultSubOptions: {
        averageLinesGte: 1000000,
        everyLinesGte: 1000000,
        someHasDocComment: false,
        someLinesGte: 1000000
    },
    fixable: "whitespace",
    isRuleOptions: is.object,
    isSubOptions,
    messages: {
        expectingEmptyLine: "Expecting empty line before",
        unexpectedEmptyLine: "Unexpected empty line before"
    }
});
/**
 * Adds node to child nodes map.
 *
 * @param node - Node.
 * @param mutableChildNodesMap - Child nodes map.
 */
function buildChildNodesMap(node, mutableChildNodesMap) {
    arrayMap.push(getNodeId(node.parent), node, mutableChildNodesMap);
}
/**
 * Generates node ID.
 *
 * @param node - Node.
 * @returns Node ID.
 */
function getNodeId(node) {
    return node ? node.range.join("-") : ".";
}
/**
 * Checks if two nodes are adjacent.
 *
 * @param id - Parent ID.
 * @param node1 - Node 1.
 * @param node2 - Node 2.
 * @param childNodesMap - Child nodes map.
 * @returns _True_ if two nodes are adjacent, _false_ otherwise.
 */
function isAdjacentNodes(id, node1, node2, childNodesMap) {
    const siblings = childNodesMap.get(id);
    assert.not.empty(siblings);
    const index1 = siblings.indexOf(node1);
    const index2 = siblings.indexOf(node2);
    return index1 !== -1 && index2 !== -1 && index2 - index1 === 1;
}
/**
 * Lints group.
 *
 * @param group - Nodes.
 * @param subOptions - Suboptions.
 * @param context - Context.
 */
function lintGroup(group, subOptions, context) {
    if (group.length > 1) {
        const hasDocComment = subOptions.someHasDocComment
            ? group.some(node => context.hasLeadingDocComment(node))
            : false;
        const linesPerNode = group
            .map(node => context.getText(node))
            .map(text => s.lines(text).length);
        const averageLines = num.average(...linesPerNode);
        const minLines = Math.min(...linesPerNode);
        const maxLines = Math.max(...linesPerNode);
        const spread = hasDocComment ||
            averageLines >= subOptions.averageLinesGte ||
            minLines >= subOptions.everyLinesGte ||
            maxLines >= subOptions.someLinesGte;
        const count = spread ? 2 : 1;
        const messageId = spread ? "expectingEmptyLine" : "unexpectedEmptyLine";
        for (const node of group.slice(1)) {
            const got = context.getLeadingTrivia(node);
            if (got.includes("\n")) {
                const expected = context.eol.repeat(count) + s.trimLeadingEmptyLines(got);
                if (got !== expected)
                    context.report({
                        fix() {
                            return [
                                {
                                    range: [node.range[0] - got.length, node.range[0]],
                                    text: expected
                                }
                            ];
                        },
                        messageId,
                        node
                    });
            }
        }
    }
}
module.exports = rule;
//# sourceMappingURL=consistent-empty-lines.js.map