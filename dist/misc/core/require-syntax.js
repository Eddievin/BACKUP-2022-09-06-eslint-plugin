"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requireSyntax = exports.MessageId = void 0;
const tslib_1 = require("tslib");
const utils = tslib_1.__importStar(require("../../utils"));
const functions_1 = require("@skylib/functions");
var MessageId;
(function (MessageId) {
    MessageId["customMessage"] = "customMessage";
})(MessageId = exports.MessageId || (exports.MessageId = {}));
exports.requireSyntax = utils.createRule({
    name: "require-syntax",
    fixable: utils.Fixable.code,
    vue: true,
    isOptions: functions_1.is.object.factory({ once: functions_1.is.boolean, selector: utils.isSelector, trigger: utils.isSelector }, { message: functions_1.is.string }),
    defaultOptions: { once: false, trigger: "Program" },
    messages: { [MessageId.customMessage]: "{{message}}" },
    create: (context) => {
        const { message, once, selector: mixedSelector, trigger: mixedTrigger } = context.options;
        const selector = utils.selector(mixedSelector);
        const trigger = utils.selector(mixedTrigger);
        let selectorCount = 0;
        let triggerCount = 0;
        functions_1.assert.toBeTrue(selector !== "", "Expecting selector");
        functions_1.assert.toBeTrue(trigger !== "", "Expecting trigger");
        return utils.mergeListeners({
            [selector]: () => {
                selectorCount++;
            }
        }, {
            [trigger]: () => {
                triggerCount++;
            }
        }, {
            "Program:exit": () => {
                if (triggerCount) {
                    if (selectorCount === 0)
                        context.report({
                            data: { message: message !== null && message !== void 0 ? message : `Missing syntax: ${selector}` },
                            loc: context.locZero,
                            messageId: MessageId.customMessage
                        });
                    if (selectorCount > 1 && once)
                        context.report({
                            data: {
                                message: message !== null && message !== void 0 ? message : `Require syntax once: ${selector}`
                            },
                            loc: context.locZero,
                            messageId: MessageId.customMessage
                        });
                }
            }
        });
    }
});
//# sourceMappingURL=require-syntax.js.map