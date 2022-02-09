"use strict";
const tslib_1 = require("tslib");
const utils_1 = require("@typescript-eslint/utils");
const a = (0, tslib_1.__importStar)(require("@skylib/functions/dist/array"));
const is = (0, tslib_1.__importStar)(require("@skylib/functions/dist/guards"));
const s = (0, tslib_1.__importStar)(require("@skylib/functions/dist/string"));
const utils = (0, tslib_1.__importStar)(require("./utils"));
const rule = utils.createRule({
    create(context) {
        return {
            [utils_1.AST_NODE_TYPES.SwitchStatement](node) {
                for (const [case1, case2] of a.chain(node.cases)) {
                    const spread = case1.consequent.length > 0;
                    const count = spread ? 2 : 1;
                    const messageId = spread
                        ? "expectingEmptyLine"
                        : "unexpectedEmptyLine";
                    const got = context.getLeadingTrivia(case2);
                    const expected = context.eol.repeat(count) + s.trimLeadingEmptyLines(got);
                    if (got !== expected)
                        context.report({
                            fix() {
                                return [
                                    {
                                        range: [case2.range[0] - got.length, case2.range[0]],
                                        text: expected
                                    }
                                ];
                            },
                            messageId,
                            node: case2
                        });
                }
            }
        };
    },
    fixable: "whitespace",
    isRuleOptions: is.object,
    messages: {
        expectingEmptyLine: "Expecting empty line before",
        unexpectedEmptyLine: "Unexpected empty line before"
    }
});
module.exports = rule;
//# sourceMappingURL=switch-case-empty-lines.js.map