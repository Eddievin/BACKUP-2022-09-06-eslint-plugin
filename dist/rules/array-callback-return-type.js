"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.arrayCallbackReturnType = exports.MessageId = void 0;
const tslib_1 = require("tslib");
const utils = tslib_1.__importStar(require("./utils"));
const functions_1 = require("@skylib/functions");
var MessageId;
(function (MessageId) {
    MessageId["invalidType"] = "invalidType";
})(MessageId = exports.MessageId || (exports.MessageId = {}));
exports.arrayCallbackReturnType = utils.createRule({
    name: "array-callback-return-type",
    vue: true,
    messages: { [MessageId.invalidType]: "Expecting boolean return type" },
    create: (context) => {
        const arrayCallbacks = new functions_1.ReadonlySet(["some", "every"]);
        return {
            CallExpression: (node) => {
                const callee = node.callee;
                if (callee.type === "MemberExpression" &&
                    callee.property.type === "Identifier" &&
                    arrayCallbacks.has(callee.property.name) &&
                    context.typeCheck.isArray(callee.object)) {
                    const argument = node.arguments[0];
                    if (argument &&
                        !context.typeCheck
                            .getCallSignatures(argument)
                            .every(signature => context.typeCheck.isBoolish(context.checker.getReturnTypeOfSignature(signature))))
                        context.report({
                            messageId: MessageId.invalidType,
                            node: argument
                        });
                }
            }
        };
    }
});
//# sourceMappingURL=array-callback-return-type.js.map