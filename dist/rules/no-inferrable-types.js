"use strict";
const tslib_1 = require("tslib");
const is = tslib_1.__importStar(require("@skylib/functions/dist/guards"));
const utils_1 = require("@typescript-eslint/utils");
const utils = tslib_1.__importStar(require("./utils"));
const rule = utils.createRule({
    create(context) {
        return {
            [utils_1.AST_NODE_TYPES.VariableDeclarator](node) {
                const { id, init } = node;
                if (id.typeAnnotation &&
                    init &&
                    init.type === utils_1.AST_NODE_TYPES.TSAsExpression) {
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
    },
    name: "no-inferrable-types"
});
module.exports = rule;
//# sourceMappingURL=no-inferrable-types.js.map