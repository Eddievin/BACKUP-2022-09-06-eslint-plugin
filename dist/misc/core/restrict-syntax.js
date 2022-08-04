"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.restrictSyntax = exports.MessageId = void 0;
const tslib_1 = require("tslib");
const utils = tslib_1.__importStar(require("../../utils"));
const functions_1 = require("@skylib/functions");
var MessageId;
(function (MessageId) {
    MessageId["customMessage"] = "customMessage";
})(MessageId = exports.MessageId || (exports.MessageId = {}));
exports.restrictSyntax = utils.createRule({
    name: "restrict-syntax",
    fixable: utils.Fixable.code,
    vue: true,
    isOptions: functions_1.is.object.factory({ selector: utils.isSelector }, { message: functions_1.is.string, replacement: functions_1.is.string, search: functions_1.is.string }),
    messages: { [MessageId.customMessage]: "{{message}}" },
    create: (context) => {
        const { message, replacement, search, selector: mixed } = context.options;
        const selector = functions_1.a.fromMixed(mixed).join(", ");
        functions_1.assert.toBeTrue(selector !== "", "Expecting selector");
        return {
            [selector]: (node) => {
                context.report({
                    data: {
                        message: message !== null && message !== void 0 ? message : `This syntax is not allowed: ${selector}`
                    },
                    fix: () => functions_1.is.not.empty(replacement)
                        ? [
                            {
                                range: node.range,
                                text: functions_1.is.not.empty(search)
                                    ? context.getText(node).replace(
                                    // eslint-disable-next-line security/detect-non-literal-regexp -- Ok
                                    new RegExp(search, "u"), replacement)
                                    : replacement
                            }
                        ]
                        : [],
                    messageId: MessageId.customMessage,
                    node
                });
            }
        };
    }
});
//# sourceMappingURL=restrict-syntax.js.map