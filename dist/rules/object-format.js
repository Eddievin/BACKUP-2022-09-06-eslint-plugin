"use strict";
const tslib_1 = require("tslib");
const utils_1 = require("@typescript-eslint/utils");
const is = tslib_1.__importStar(require("@skylib/functions/dist/guards"));
const num = tslib_1.__importStar(require("@skylib/functions/dist/number"));
const utils = tslib_1.__importStar(require("./utils"));
const isRuleOptions = is.factory(is.object.of, { maxLineLength: is.number, maxObjectSize: is.number }, {});
const rule = utils.createRule({
    create(context) {
        return {
            [utils_1.AST_NODE_TYPES.ObjectExpression](node) {
                const texts = node.properties.map(property => context.getText(property));
                const predictedLength = context.getLocFromRange(node.range).start.column +
                    num.sum(...texts.map(text => text.trim().length)) +
                    2 * texts.length +
                    3;
                const expectedMultiline = texts.length > context.options.maxObjectSize;
                const gotMultiline = isMultiline(context.getText(node));
                const expectedSingleLine = texts.length <= context.options.maxObjectSize &&
                    predictedLength <= context.options.maxLineLength &&
                    texts.every(text => isSingleLine(text));
                const gotSingle = isSingleLine(context.getText(node));
                if (expectedMultiline && !gotMultiline)
                    context.report({
                        fix() {
                            const propertiesText = node.properties
                                .map(property => context.getText(property))
                                .join(",\n");
                            return [
                                {
                                    range: node.range,
                                    text: `{\n${propertiesText}\n}`
                                }
                            ];
                        },
                        messageId: "expectingMultiline",
                        node
                    });
                if (expectedSingleLine && !gotSingle)
                    context.report({
                        fix() {
                            const propertiesText = node.properties
                                .map(property => context.getText(property))
                                .join(",");
                            return [
                                {
                                    range: node.range,
                                    text: `{${propertiesText}}`
                                }
                            ];
                        },
                        messageId: "expectingSingleLine",
                        node
                    });
            }
        };
    },
    defaultOptions: {
        maxLineLength: 80,
        maxObjectSize: 2
    },
    fixable: "code",
    isRuleOptions,
    messages: {
        expectingMultiline: "Expecting multiline object literal",
        expectingSingleLine: "Expecting single-line object literal"
    }
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
module.exports = rule;
//# sourceMappingURL=object-format.js.map