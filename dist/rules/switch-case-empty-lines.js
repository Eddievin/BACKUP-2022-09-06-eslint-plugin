"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.switchCaseEmptyLines = exports.MessageId = void 0;
const tslib_1 = require("tslib");
const utils = tslib_1.__importStar(require("./utils"));
const functions_1 = require("@skylib/functions");
var MessageId;
(function (MessageId) {
    MessageId["addEmptyLine"] = "addEmptyLine";
    MessageId["removeEmptyLine"] = "removeEmptyLine";
})(MessageId = exports.MessageId || (exports.MessageId = {}));
exports.switchCaseEmptyLines = utils.createRule({
    name: "switch-case-empty-lines",
    fixable: utils.Fixable.whitespace,
    messages: {
        [MessageId.addEmptyLine]: "Add empty line before switch case",
        [MessageId.removeEmptyLine]: "Remove empty line before switch case"
    },
    create: (context) => ({
        SwitchStatement: (node) => {
            for (const [case1, case2] of functions_1.a.chain(node.cases)) {
                const fallThrough = case1.consequent.length === 0;
                const got = context.getLeadingTrivia(case2);
                const expected = context.eol.repeat(fallThrough ? 1 : 2) +
                    functions_1.s.trimLeadingEmptyLines(got);
                if (got === expected) {
                    // Valid
                }
                else
                    context.report({
                        fix: () => ({
                            range: [case2.range[0] - got.length, case2.range[0]],
                            text: expected
                        }),
                        messageId: fallThrough
                            ? MessageId.removeEmptyLine
                            : MessageId.addEmptyLine,
                        node: case2
                    });
            }
        }
    })
});
//# sourceMappingURL=switch-case-empty-lines.js.map