"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.objectFormat = void 0;
const tslib_1 = require("tslib");
const functions_1 = require("@skylib/functions");
const utils_1 = require("@typescript-eslint/utils");
const utils = tslib_1.__importStar(require("./utils"));
exports.objectFormat = utils.createRule({
    create(context) {
        return {
            [utils_1.AST_NODE_TYPES.ObjectExpression](node) {
                const texts = node.properties.map(property => context.getTextWithLeadingTrivia(property).trim());
                const predictedLength = functions_1.fn.run(() => {
                    const headLength = context.getLocFromRange(node.range).start.column;
                    const tailLength = functions_1.fn.run(() => {
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
                        fix() {
                            const propertiesText = texts.join(",\n");
                            return [{ range: node.range, text: `{\n${propertiesText}\n}` }];
                        },
                        messageId: "expectingMultiline",
                        node
                    });
                if (expectSingleLine && !gotSingleLine)
                    context.report({
                        fix() {
                            const propertiesText = texts.join(",");
                            return [{ range: node.range, text: `{${propertiesText}}` }];
                        },
                        messageId: "expectingSingleLine",
                        node
                    });
            }
        };
    },
    defaultOptions: { maxLineLength: 80, maxObjectSize: 2 },
    fixable: "code",
    isRuleOptions: functions_1.is.object.factory({ maxLineLength: functions_1.is.number, maxObjectSize: functions_1.is.number }, {}),
    messages: {
        expectingMultiline: "Expecting multiline object literal",
        expectingSingleLine: "Expecting single-line object literal"
    },
    name: "object-format"
});
// eslint-disable-next-line no-warning-comments
// fixme: use @skylib/functions
// eslint-disable-next-line @skylib/require-jsdoc
function isMultiline(str) {
    return str.includes("\n");
}
// eslint-disable-next-line no-warning-comments
// fixme: use @skylib/functions
// eslint-disable-next-line @skylib/require-jsdoc
function isSingleLine(str) {
    return !str.includes("\n");
}
//# sourceMappingURL=object-format.js.map