"use strict";
const tslib_1 = require("tslib");
const utils_1 = require("@typescript-eslint/utils");
const a = tslib_1.__importStar(require("@skylib/functions/dist/array"));
const is = tslib_1.__importStar(require("@skylib/functions/dist/guards"));
const s = tslib_1.__importStar(require("@skylib/functions/dist/string"));
const utils = tslib_1.__importStar(require("./utils"));
const rule = utils.createRule({
    create(context) {
        return {
            [utils_1.AST_NODE_TYPES.MemberExpression](node) {
                const lines = s.lines(context.code.slice(node.object.range[1], node.property.range[0]));
                if (lines.length >= 3)
                    context.report({
                        fix() {
                            return {
                                range: [node.object.range[1], node.property.range[0]],
                                text: `${a.first(lines)}\n${a.last(lines)}`
                            };
                        },
                        messageId: "unexpectedEmptyLine",
                        node
                    });
            }
        };
    },
    fixable: "whitespace",
    isRuleOptions: is.object,
    messages: { unexpectedEmptyLine: "Unexpected empty line" },
    name: "no-expression-empty-line"
});
module.exports = rule;
//# sourceMappingURL=no-expression-empty-line.js.map