"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.noInferrableTypes = exports.MessageId = void 0;
const tslib_1 = require("tslib");
const utils = tslib_1.__importStar(require("./utils"));
var MessageId;
(function (MessageId) {
    MessageId["triviallyInferrableType"] = "triviallyInferrableType";
})(MessageId = exports.MessageId || (exports.MessageId = {}));
exports.noInferrableTypes = utils.createRule({
    name: "no-inferrable-types",
    messages: {
        [MessageId.triviallyInferrableType]: "Type can be trivially inferred from initializer"
    },
    create: (context) => ({
        VariableDeclarator: (node) => {
            const { id, init } = node;
            if (id.typeAnnotation && init && init.type === "TSAsExpression") {
                const type1 = id.typeAnnotation.typeAnnotation;
                const type2 = init.typeAnnotation;
                const text1 = context.getText(type1);
                const text2 = context.getText(type2);
                if (text1 === text2)
                    context.report({
                        messageId: MessageId.triviallyInferrableType,
                        node
                    });
            }
        }
    })
});
//# sourceMappingURL=no-inferrable-types.js.map