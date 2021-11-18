"use strict";
const tslib_1 = require("tslib");
const _ = (0, tslib_1.__importStar)(require("lodash"));
const experimental_utils_1 = require("@typescript-eslint/experimental-utils");
const a = (0, tslib_1.__importStar)(require("@skylib/functions/dist/array"));
const assert = (0, tslib_1.__importStar)(require("@skylib/functions/dist/assertions"));
const is = (0, tslib_1.__importStar)(require("@skylib/functions/dist/guards"));
const core_1 = require("@skylib/functions/dist/types/core");
const utils = (0, tslib_1.__importStar)(require("./utils"));
const isRuleOptions = is.factory(is.object.of, { ignoreDefaultExport: is.boolean }, {});
const rule = utils.createRule({
    create(context) {
        const exportDefaultDeclarations = [];
        const groups = [];
        return {
            "Program:exit"() {
                for (const group of groups)
                    if (group.length > 1)
                        if (context.options.ignoreDefaultExport &&
                            exportDefaultDeclarations.some(exportDefaultDeclaration => group.some(item => item.node.range[0] >= exportDefaultDeclaration.range[0] &&
                                item.node.range[1] <= exportDefaultDeclaration.range[1]))) {
                            // Ignore default export
                        }
                        else {
                            const sortedGroup = _.sortBy(group, item => item.key);
                            const fixes = [];
                            let min = undefined;
                            let max = undefined;
                            for (const [index, sortedItem] of sortedGroup.entries())
                                if (sortedItem.index !== index) {
                                    const item = a.get(group, index);
                                    min = is.not.empty(min) ? Math.min(min, index) : index;
                                    max = is.not.empty(max) ? Math.max(max, index) : index;
                                    fixes.push({
                                        range: context.getRangeWithLeadingTrivia(item.node),
                                        text: context.getTextWithLeadingTrivia(sortedItem.node)
                                    });
                                }
                            if (fixes.length) {
                                assert.not.empty(min);
                                assert.not.empty(max);
                                const loc = context.getLocFromRange([
                                    a.get(group, min).node.range[0],
                                    a.get(group, max).node.range[1]
                                ]);
                                context.report({
                                    fix: () => fixes,
                                    loc,
                                    messageId: "incorrectSortingOrder"
                                });
                            }
                        }
            },
            [experimental_utils_1.AST_NODE_TYPES.ExportDefaultDeclaration](node) {
                exportDefaultDeclarations.push(node);
            },
            [experimental_utils_1.AST_NODE_TYPES.ObjectExpression](node) {
                const group = [];
                for (const property of node.properties)
                    if (property.type === experimental_utils_1.AST_NODE_TYPES.SpreadElement)
                        flush();
                    else {
                        assert.byGuard(property.key.type, isExpectedKeyType);
                        if (context
                            .getLeadingTrivia(property)
                            .includes("@skylib/sort-keys break"))
                            flush();
                        switch (property.key.type) {
                            case experimental_utils_1.AST_NODE_TYPES.Identifier:
                                group.push({
                                    index: group.length,
                                    key: property.key.name,
                                    node: property
                                });
                                break;
                            case experimental_utils_1.AST_NODE_TYPES.Literal:
                                group.push({
                                    index: group.length,
                                    key: property.key.value,
                                    node: property
                                });
                                break;
                            case experimental_utils_1.AST_NODE_TYPES.MemberExpression:
                                group.push({
                                    index: group.length,
                                    key: `\u0000${context.getText(property.key)}`,
                                    node: property
                                });
                                break;
                        }
                    }
                flush();
                function flush() {
                    groups.push(a.clone(group));
                    group.length = 0;
                }
            }
        };
    },
    defaultOptions: {
        ignoreDefaultExport: false
    },
    fixable: "code",
    isRuleOptions,
    messages: {
        incorrectSortingOrder: "Incorrect sorting order"
    }
});
const ExpectedKeyTypeVO = (0, core_1.createValidationObject)({
    [experimental_utils_1.AST_NODE_TYPES.Identifier]: experimental_utils_1.AST_NODE_TYPES.Identifier,
    [experimental_utils_1.AST_NODE_TYPES.Literal]: experimental_utils_1.AST_NODE_TYPES.Literal,
    [experimental_utils_1.AST_NODE_TYPES.MemberExpression]: experimental_utils_1.AST_NODE_TYPES.MemberExpression
});
const isExpectedKeyType = is.factory(is.enumeration, ExpectedKeyTypeVO);
module.exports = rule;
//# sourceMappingURL=sort-keys.js.map