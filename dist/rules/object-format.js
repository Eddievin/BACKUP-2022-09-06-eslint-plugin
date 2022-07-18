"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.objectFormat = exports.MessageId = void 0;
const tslib_1 = require("tslib");
const utils = tslib_1.__importStar(require("./utils"));
const functions_1 = require("@skylib/functions");
var MessageId;
(function (MessageId) {
    MessageId["expectingMultiline"] = "expectingMultiline";
    MessageId["expectingSingleLine"] = "expectingSingleLine";
})(MessageId = exports.MessageId || (exports.MessageId = {}));
exports.objectFormat = utils.createRule({
    name: "object-format",
    fixable: utils.Fixable.code,
    isOptions: functions_1.is.object.factory({ maxLineLength: functions_1.is.number, maxObjectSize: functions_1.is.number }, {}),
    defaultOptions: { maxLineLength: 80, maxObjectSize: 2 },
    messages: {
        [MessageId.expectingMultiline]: "Expecting multiline object literal",
        [MessageId.expectingSingleLine]: "Expecting single-line object literal"
    },
    create: (context) => {
        const listener = {
            ObjectExpression: (node) => {
                const texts = node.properties.map(property => context.getTextWithLeadingTrivia(property).trim());
                if (texts.length) {
                    const predictedLength = (0, functions_1.evaluate)(() => {
                        const headLength = context.getLocFromRange(node.range).start.column;
                        const tailLength = (0, functions_1.evaluate)(() => {
                            const tail = context.code.slice(node.range[1]);
                            if (tail.startsWith(" as "))
                                return 1000;
                            if (tail.startsWith(");"))
                                return 2;
                            return 1;
                        });
                        return (headLength +
                            2 +
                            functions_1.num.sum(...texts.map(text => text.trim().length)) +
                            2 * (texts.length - 1) +
                            2 +
                            tailLength);
                    });
                    const expectMultiline = texts.length > context.options.maxObjectSize;
                    const gotMultiline = isMultiline(context.getText(node));
                    const keepMultiline = predictedLength > context.options.maxLineLength ||
                        texts.some(text => isMultiline(text)) ||
                        node.properties.some(property => context.hasTrailingComment(property));
                    const expectSingleLine = !expectMultiline && !keepMultiline;
                    const gotSingleLine = isSingleLine(context.getText(node));
                    if (expectMultiline && !gotMultiline)
                        context.report({
                            fix: () => ({
                                range: node.range,
                                text: `{\n${texts.join(",\n")}\n}`
                            }),
                            messageId: MessageId.expectingMultiline,
                            node
                        });
                    if (expectSingleLine && !gotSingleLine)
                        context.report({
                            fix: () => ({
                                range: node.range,
                                text: `{${texts.join(",")}}`
                            }),
                            messageId: MessageId.expectingSingleLine,
                            node
                        });
                }
            }
        };
        return context.defineTemplateBodyVisitor(listener, listener);
    }
});
// eslint-disable-next-line no-warning-comments -- Postponed
// fixme: use @skylib/functions
// eslint-disable-next-line @skylib/require-jsdoc -- Postponed
function isMultiline(str) {
    return str.includes("\n");
}
// eslint-disable-next-line no-warning-comments -- Postponed
// fixme: use @skylib/functions
// eslint-disable-next-line @skylib/require-jsdoc -- Postponed
function isSingleLine(str) {
    return !str.includes("\n");
}
//# sourceMappingURL=object-format.js.map