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
    isOptions: functions_1.is.object.factory({ selector: utils.isSelector, trigger: utils.isSelector }, { message: functions_1.is.string }),
    defaultOptions: { trigger: "Program" },
    messages: { [MessageId.customMessage]: "{{message}}" },
    create: (context) => {
        const { message, selector: mixedSelector, trigger: mixedTrigger } = context.options;
        const selector = functions_1.a.fromMixed(mixedSelector).join(", ");
        const trigger = functions_1.a.fromMixed(mixedTrigger).join(", ");
        let selectorCount = 0;
        let triggerCount = 0;
        functions_1.assert.toBeTrue(selector !== "", "Expecting selector");
        functions_1.assert.toBeTrue(trigger !== "", "Expecting trigger");
        return {
            "Program:exit": () => {
                if (triggerCount)
                    if (selectorCount === 1) {
                        // Valid
                    }
                    else
                        context.report({
                            data: { message: message !== null && message !== void 0 ? message : `Missing syntax: ${selector}` },
                            loc: context.locZero,
                            messageId: MessageId.customMessage
                        });
            },
            [selector]: () => {
                selectorCount++;
            },
            [trigger]: () => {
                triggerCount++;
            }
        };
    }
});
//# sourceMappingURL=require-syntax.js.map