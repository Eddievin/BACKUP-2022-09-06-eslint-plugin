"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createRule = void 0;
const tslib_1 = require("tslib");
const Checker_1 = require("./Checker");
const utils = tslib_1.__importStar(require("./core"));
const functions_1 = require("@skylib/functions");
const utils_1 = require("@typescript-eslint/utils");
/**
 * Creates rule.
 *
 * @param name - Name.
 * @param isTypeToCheck - Guard.
 * @param readonliness - Readonliness that triggers error.
 * @param messageId - Message ID.
 * @param message - Message.
 * @returns Rule module.
 */
// eslint-disable-next-line @skylib/only-export-name
function createRule(name, isTypeToCheck, readonliness, messageId, message) {
    const isRuleOptions = functions_1.is.object.factory({
        ignoreClasses: functions_1.is.boolean,
        ignoreInterfaces: functions_1.is.boolean,
        ignoreTypes: functions_1.is.strings
    }, {});
    return utils.createRule({
        create: context => {
            const { ignoreClasses, ignoreInterfaces, ignoreTypes } = context.options;
            const checker = new Checker_1.Checker({
                context,
                ignoreClasses,
                ignoreInterfaces,
                ignoreTypeParameters: false,
                ignoreTypes,
                readonliness
            });
            return {
                [utils_1.AST_NODE_TYPES.TSTypeReference]: (node) => {
                    const { typeArguments, typeName } = context.toTsNode(node);
                    if (isTypeToCheck(typeName.getText()) &&
                        typeArguments &&
                        typeArguments.length === 1) {
                        const typeArgument = functions_1.a.first(typeArguments);
                        const type = context.checker.getTypeFromTypeNode(typeArgument);
                        const result = checker.checkType(type, node);
                        if ("passed" in result)
                            context.report({ messageId, node });
                    }
                }
            };
        },
        defaultOptions: {
            ignoreClasses: false,
            ignoreInterfaces: false,
            ignoreTypes: []
        },
        isRuleOptions,
        messages: { [messageId]: message },
        name
    });
}
exports.createRule = createRule;
//# sourceMappingURL=no-unnecessary-readonliness.js.map