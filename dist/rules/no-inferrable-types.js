"use strict";
const tslib_1 = require("tslib");
const experimental_utils_1 = require("@typescript-eslint/experimental-utils");
const is = (0, tslib_1.__importStar)(require("@typerock/functions/dist/guards"));
const utils = (0, tslib_1.__importStar)(require("./utils"));
const rule = utils.createRule({
    create(context) {
        return {
            [experimental_utils_1.AST_NODE_TYPES.VariableDeclarator](node) {
                const { id, init } = node;
                if (id.typeAnnotation &&
                    init &&
                    init.type === experimental_utils_1.AST_NODE_TYPES.TSAsExpression) {
                    const type1 = id.typeAnnotation.typeAnnotation;
                    const type2 = init.typeAnnotation;
                    const text1 = context.getText(type1);
                    const text2 = context.getText(type2);
                    if (text1 === text2)
                        context.report({ messageId: "triviallyInferrableType", node });
                }
            }
        };
    },
    isRuleOptions: is.object,
    messages: {
        triviallyInferrableType: "Type can be trivially inferred from initializer"
    }
});
module.exports = rule;
//# sourceMappingURL=no-inferrable-types.js.map