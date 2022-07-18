"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.custom = exports.MessageId = void 0;
const tslib_1 = require("tslib");
const utils = tslib_1.__importStar(require("./utils"));
const functions_1 = require("@skylib/functions");
var MessageId;
(function (MessageId) {
    MessageId["customMessage"] = "customMessage";
})(MessageId = exports.MessageId || (exports.MessageId = {}));
exports.custom = utils.createRule({
    name: "custom",
    fixable: utils.Fixable.code,
    isOptions: (0, functions_1.evaluate)(() => functions_1.is.object.factory({ selector: functions_1.is.or.factory(functions_1.is.string, functions_1.is.strings) }, {
        checkReturnType: functions_1.is.boolean,
        message: functions_1.is.string,
        replacement: functions_1.is.string,
        search: functions_1.is.string,
        typeHas: utils.isTypeGroup,
        typeHasNoneOf: utils.isTypeGroups,
        typeHasNot: utils.isTypeGroup,
        typeHasOneOf: utils.isTypeGroups,
        typeIs: utils.isTypeGroup,
        typeIsNoneOf: utils.isTypeGroups,
        typeIsNot: utils.isTypeGroup,
        typeIsOneOf: utils.isTypeGroups
    })),
    messages: { [MessageId.customMessage]: "{{ message }}" },
    create: (context) => {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment -- Postponed
        const listener = getVisitors();
        return context.defineTemplateBodyVisitor(listener, listener);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any -- Postponed
        function getVisitors() {
            const { checkReturnType, message, replacement, search, selector: mixed, typeHas, typeHasNoneOf, typeHasNot, typeHasOneOf, typeIs, typeIsNoneOf, typeIsNot, typeIsOneOf } = Object.assign({ checkReturnType: false }, context.options);
            const selector = functions_1.a.fromMixed(mixed).join(", ");
            return {
                [selector]: (node) => {
                    const types = (0, functions_1.evaluate)(() => {
                        const tsNode = context.toTsNode(node);
                        const type = context.checker.getTypeAtLocation(tsNode);
                        return checkReturnType
                            ? type
                                .getCallSignatures()
                                .map(signature => signature.getReturnType())
                            : [type];
                    });
                    if (types.some(type => context.typeCheck.typeIs(type, typeIs)) &&
                        types.some(type => context.typeCheck.typeHasNot(type, typeHasNot)) &&
                        types.some(type => context.typeCheck.typeIsNot(type, typeIsNot)) &&
                        types.some(type => context.typeCheck.typeHas(type, typeHas)) &&
                        types.some(type => context.typeCheck.typeHasNoneOf(type, typeHasNoneOf)) &&
                        types.some(type => context.typeCheck.typeHasOneOf(type, typeHasOneOf)) &&
                        types.some(type => context.typeCheck.typeIsNoneOf(type, typeIsNoneOf)) &&
                        types.some(type => context.typeCheck.typeIsOneOf(type, typeIsOneOf)))
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
                            loc: context.getLocFromRange(node.range),
                            messageId: MessageId.customMessage
                        });
                }
            };
        }
    }
});
//# sourceMappingURL=custom.js.map