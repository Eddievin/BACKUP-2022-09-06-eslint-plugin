"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.switchCaseEmptyLines = void 0;
const tslib_1 = require("tslib");
const utils = tslib_1.__importStar(require("./utils"));
const functions_1 = require("@skylib/functions");
const utils_1 = require("@typescript-eslint/utils");
exports.switchCaseEmptyLines = utils.createRule({
    create(context) {
        return {
            [utils_1.AST_NODE_TYPES.SwitchStatement](node) {
                for (const [case1, case2] of functions_1.a.chain(node.cases)) {
                    const spread = case1.consequent.length > 0;
                    const count = spread ? 2 : 1;
                    const messageId = spread
                        ? "expectingEmptyLine"
                        : "unexpectedEmptyLine";
                    const got = context.getLeadingTrivia(case2);
                    const expected = context.eol.repeat(count) + functions_1.s.trimLeadingEmptyLines(got);
                    if (got === expected) {
                        // Valid
                    }
                    else
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
    isRuleOptions: functions_1.is.object,
    messages: {
        expectingEmptyLine: "Expecting empty line before",
        unexpectedEmptyLine: "Unexpected empty line before"
    },
    name: "switch-case-empty-lines"
});
//# sourceMappingURL=switch-case-empty-lines.js.map