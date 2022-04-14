"use strict";
const tslib_1 = require("tslib");
const a = tslib_1.__importStar(require("@skylib/functions/dist/array"));
const fn = tslib_1.__importStar(require("@skylib/functions/dist/function"));
const is = tslib_1.__importStar(require("@skylib/functions/dist/guards"));
const s = tslib_1.__importStar(require("@skylib/functions/dist/string"));
const utils_1 = require("@typescript-eslint/utils");
const utils = tslib_1.__importStar(require("./utils"));
const rule = utils.createRule({
    create(context) {
        return {
            [utils_1.AST_NODE_TYPES.MemberExpression](node) {
                const got = s.leadingSpaces(context.code.slice(node.object.range[1]));
                const expected = fn.run(() => {
                    const lines = s.lines(got);
                    return lines.length >= 3
                        ? `${a.first(lines)}\n${a.last(lines)}`
                        : got;
                });
                if (got === expected) {
                    // Valid
                }
                else
                    context.report({
                        fix() {
                            return {
                                range: [
                                    node.object.range[1],
                                    node.object.range[1] + got.length
                                ],
                                text: expected
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