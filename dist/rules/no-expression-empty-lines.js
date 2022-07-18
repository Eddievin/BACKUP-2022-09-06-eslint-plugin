"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.noExpressionEmptyLines = exports.MessageId = void 0;
const tslib_1 = require("tslib");
const utils = tslib_1.__importStar(require("./utils"));
const functions_1 = require("@skylib/functions");
var MessageId;
(function (MessageId) {
    MessageId["unexpectedEmptyLine"] = "unexpectedEmptyLine";
})(MessageId = exports.MessageId || (exports.MessageId = {}));
exports.noExpressionEmptyLines = utils.createRule({
    name: "no-expression-empty-lines",
    fixable: utils.Fixable.whitespace,
    vue: true,
    messages: { [MessageId.unexpectedEmptyLine]: "Unexpected empty line" },
    create: (context) => ({
        MemberExpression: (node) => {
            const object = node.object;
            const got = functions_1.s.leadingSpaces(context.code.slice(object.range[1]));
            const expected = (0, functions_1.evaluate)(() => {
                const lines = functions_1.s.lines(got);
                return lines.length >= 3 ? `${functions_1.a.first(lines)}\n${functions_1.a.last(lines)}` : got;
            });
            if (got === expected) {
                // Valid
            }
            else
                context.report({
                    fix: () => ({
                        range: [object.range[1], object.range[1] + got.length],
                        text: expected
                    }),
                    messageId: MessageId.unexpectedEmptyLine,
                    node
                });
        }
    })
});
//# sourceMappingURL=no-expression-empty-lines.js.map