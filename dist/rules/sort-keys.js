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
                    if (context.options.ignoreDefaultExport &&
                        exportDefaultDeclarations.some(exportDefaultDeclaration => group.some(item => item.node.range[0] >= exportDefaultDeclaration.range[0] &&
                            item.node.range[1] <= exportDefaultDeclaration.range[1]))) {
                        // Ignore default export
                    }
                    else {
                        const sortedGroup = _.sortBy(group, item => item.key);
                        const fixes = [];
                        for (const [index, sortedItem] of sortedGroup.entries())
                            if (sortedItem.index !== index) {
                                const item = a.get(group, index);
                                fixes.push({
                                    range: context.getRangeWithLeadingTrivia(item.node),
                                    text: context.getTextWithLeadingTrivia(sortedItem.node)
                                });
                            }
                        if (fixes.length)
                            context.report({
                                fix: () => fixes,
                                messageId: "incorrectSortingOrder",
                                node: a.first(group).node
                            });
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
                        }
                    }
                flush();
                function flush() {
                    if (group.length) {
                        groups.push(a.clone(group));
                        group.length = 0;
                    }
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
    [experimental_utils_1.AST_NODE_TYPES.Literal]: experimental_utils_1.AST_NODE_TYPES.Literal
});
const isExpectedKeyType = is.factory(is.enumeration, ExpectedKeyTypeVO);
module.exports = rule;
//# sourceMappingURL=sort-keys.js.map