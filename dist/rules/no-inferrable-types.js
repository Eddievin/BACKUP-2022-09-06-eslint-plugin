"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.noInferrableTypes = void 0;
const tslib_1 = require("tslib");
const utils = tslib_1.__importStar(require("./utils"));
const functions_1 = require("@skylib/functions");
const utils_1 = require("@typescript-eslint/utils");
exports.noInferrableTypes = utils.createRule({
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
    isRuleOptions: functions_1.is.object,
    messages: {
        triviallyInferrableType: "Type can be trivially inferred from initializer"
    },
    name: "no-inferrable-types"
});
//# sourceMappingURL=no-inferrable-types.js.map