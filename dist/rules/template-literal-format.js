"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.templateLiteralFormat = void 0;
const tslib_1 = require("tslib");
const functions_1 = require("@skylib/functions");
const utils_1 = require("@typescript-eslint/utils");
const utils = tslib_1.__importStar(require("./utils"));
exports.templateLiteralFormat = utils.createRule({
    create(context) {
        return {
            [utils_1.AST_NODE_TYPES.TemplateLiteral](node) {
                const lines = functions_1.s.lines(context.getText(node));
                if (lines.length > 1) {
                    const firstLine = functions_1.a.first(lines);
                    const middleLines = lines.slice(1, -1);
                    const lastLine = functions_1.a.last(lines);
                    const nonEmptyMiddleLines = middleLines.filter(line => line.length);
                    if (firstLine === "`" &&
                        nonEmptyMiddleLines.length &&
                        lastLine.trimStart() === "`") {
                        const padding1 = functions_1.fn.pipe(context.code.slice(0, node.range[0]), functions_1.s.lines, functions_1.a.last, functions_1.s.leadingSpaces).length;
                        const padding2 = Math.min(...nonEmptyMiddleLines.map(line => functions_1.s.leadingSpaces(line).length));
                        const padding3 = functions_1.s.leadingSpaces(lastLine).length;
                        const delta2 = padding1 - padding2 + 2;
                        const delta3 = padding1 - padding3;
                        if (delta2 || delta3)
                            context.report({
                                fix() {
                                    return [
                                        {
                                            range: node.range,
                                            text: [
                                                firstLine,
                                                ...middleLines.map(line => fixLine(line, delta2)),
                                                fixLine(lastLine, delta3)
                                            ].join(context.eol)
                                        }
                                    ];
                                },
                                messageId: "invalidTemplateLiteralFormat",
                                node
                            });
                    }
                    else
                        context.report({ messageId: "invalidTemplateLiteralFormat", node });
                }
            }
        };
    },
    fixable: "code",
    isRuleOptions: functions_1.is.object,
    messages: { invalidTemplateLiteralFormat: "Invalid template literal format" },
    name: "template-literal-format"
});
/**
 * Fixes line.
 *
 * @param line - Line.
 * @param delta - The number of spaces to add/remove.
 * @returns Fixed line.
 */
function fixLine(line, delta) {
    return line.length
        ? " ".repeat(functions_1.s.leadingSpaces(line).length + delta) + line.trimStart()
        : line;
}
//# sourceMappingURL=template-literal-format.js.map