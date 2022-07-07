"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.consistentGroupEmptyLines = void 0;
const tslib_1 = require("tslib");
const utils = tslib_1.__importStar(require("./utils"));
const functions_1 = require("@skylib/functions");
exports.consistentGroupEmptyLines = utils.createRule({
    create: (context) => {
        const childNodesMap = new functions_1.Accumulator();
        const nodesMap2 = new functions_1.Accumulator2();
        const listener = {
            "*": (node) => {
                utils.buildChildNodesMap(node, childNodesMap);
            },
            "Program:exit": () => {
                for (const subOptions of context.subOptionsArray) {
                    const nodesMap = nodesMap2.get(subOptions.selector);
                    for (const nodes of nodesMap.values()) {
                        const group = [];
                        for (const node of nodes)
                            if (group.length > 0)
                                if (utils.isAdjacentNodes(functions_1.a.last(group), node, childNodesMap))
                                    group.push(node);
                                else {
                                    lintGroup(group, subOptions, context);
                                    functions_1.a.truncate(group);
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
                const { selector } = subOptions;
                const id = utils.getNodeId(node.parent);
                nodesMap2.push(selector, id, node);
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
    isRuleOptions: functions_1.is.object,
    isSubOptions: functions_1.is.object.factory({
        _id: functions_1.is.string,
        averageLinesGte: functions_1.is.number,
        everyLinesGte: functions_1.is.number,
        selector: functions_1.is.string,
        someHasDocComment: functions_1.is.boolean,
        someLinesGte: functions_1.is.number
    }, {}),
    messages: {
        expectingEmptyLine: "Expecting empty line before ({{ _id }})",
        unexpectedEmptyLine: "Unexpected empty line before ({{ _id }})"
    },
    name: "consistent-group-empty-lines"
});
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
            .map(text => functions_1.s.lines(text).length);
        const averageLines = functions_1.num.average(...linesPerNode);
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
                const expected = context.eol.repeat(count) + functions_1.s.trimLeadingEmptyLines(got);
                if (got === expected) {
                    // Valid
                }
                else
                    context.report({
                        data: { _id: subOptions._id },
                        fix: () => [
                            {
                                range: [node.range[0] - got.length, node.range[0]],
                                text: expected
                            }
                        ],
                        messageId,
                        node
                    });
            }
        }
    }
}
//# sourceMappingURL=consistent-group-empty-lines.js.map