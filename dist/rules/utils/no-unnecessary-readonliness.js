"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createRule = void 0;
const tslib_1 = require("tslib");
const utils_1 = require("@typescript-eslint/utils");
const a = (0, tslib_1.__importStar)(require("@skylib/functions/dist/array"));
const is = (0, tslib_1.__importStar)(require("@skylib/functions/dist/guards"));
const utils = (0, tslib_1.__importStar)(require("."));
const readonliness_1 = require("./readonliness");
/**
 * Creates rule.
 *
 * @param isTypeToCheck - Guard.
 * @param readonliness - Readonliness that triggers error.
 * @param messageId - Message ID.
 * @param message - Message.
 * @returns Rule module.
 */
function createRule(isTypeToCheck, readonliness, messageId, message) {
    const isRuleOptions = is.factory(is.object.of, {
        ignoreClasses: is.boolean,
        ignoreTypes: is.strings
    }, {});
    return utils.createRule({
        create(context) {
            const { ignoreClasses, ignoreTypes } = context.options;
            const checker = new readonliness_1.Checker({
                context,
                ignoreClasses,
                ignoreTypes,
                readonliness
            });
            return {
                [utils_1.AST_NODE_TYPES.TSTypeReference](node) {
                    const { typeArguments, typeName } = context.toTsNode(node);
                    if (isTypeToCheck(typeName.getText()) &&
                        typeArguments &&
                        typeArguments.length === 1) {
                        const typeArgument = a.first(typeArguments);
                        const type = context.checker.getTypeFromTypeNode(typeArgument);
                        const result = checker.checkType(type);
                        if ("passed" in result)
                            context.report({ messageId, node });
                    }
                }
            };
        },
        defaultOptions: {
            ignoreClasses: true,
            ignoreTypes: []
        },
        isRuleOptions,
        messages: {
            [messageId]: message
        }
    });
}
exports.createRule = createRule;
//# sourceMappingURL=no-unnecessary-readonliness.js.map