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
    isOptions: functions_1.is.object.factory({ checkReturnType: functions_1.is.boolean, selector: utils.isSelector }, {
        message: functions_1.is.string,
        replacement: functions_1.is.string,
        search: functions_1.is.string,
        typeHas: utils.isTypeGroup,
        typeHasNoneOf: utils.isTypeGroups,
        typeHasOneOf: utils.isTypeGroups,
        typeIs: utils.isTypeGroup,
        typeIsNoneOf: utils.isTypeGroups,
        typeIsOneOf: utils.isTypeGroups
    }),
    defaultOptions: { checkReturnType: false },
    messages: { [MessageId.customMessage]: "{{message}}" },
    create: (context, typeCheck) => {
        const { checkReturnType, message, replacement, search, selector: mixed, typeHas, typeHasNoneOf, typeHasOneOf, typeIs, typeIsNoneOf, typeIsOneOf } = context.options;
        const selector = functions_1.a.fromMixed(mixed).join(", ");
        functions_1.assert.toBeTrue(selector !== "", "Expecting selector");
        return {
            [selector]: (node) => {
                const types = (0, functions_1.evaluate)(() => {
                    const type = typeCheck.getType(node);
                    return checkReturnType
                        ? type
                            .getCallSignatures()
                            .map(signature => signature.getReturnType())
                        : [type];
                });
                if (types.some(type => typeCheck.typeIs(type, typeIs) &&
                    typeCheck.typeIsNoneOf(type, typeIsNoneOf) &&
                    typeCheck.typeIsOneOf(type, typeIsOneOf) &&
                    typeCheck.typeHas(type, typeHas) &&
                    typeCheck.typeHasNoneOf(type, typeHasNoneOf) &&
                    typeCheck.typeHasOneOf(type, typeHasOneOf)))
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