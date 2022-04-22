"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.noExpressionEmptyLine = void 0;
const tslib_1 = require("tslib");
const functions_1 = require("@skylib/functions");
const utils_1 = require("@typescript-eslint/utils");
const utils = tslib_1.__importStar(require("./utils"));
exports.noExpressionEmptyLine = utils.createRule({
    create(context) {
        return {
            [utils_1.AST_NODE_TYPES.MemberExpression](node) {
                const got = functions_1.s.leadingSpaces(context.code.slice(node.object.range[1]));
                const expected = functions_1.fn.run(() => {
                    const lines = functions_1.s.lines(got);
                    return lines.length >= 3
                        ? `${functions_1.a.first(lines)}\n${functions_1.a.last(lines)}`
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
    isRuleOptions: functions_1.is.object,
    messages: { unexpectedEmptyLine: "Unexpected empty line" },
    name: "no-expression-empty-line"
});
//# sourceMappingURL=no-expression-empty-line.js.map