"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.preferReadonly = void 0;
const tslib_1 = require("tslib");
const utils = tslib_1.__importStar(require("./utils"));
const functions_1 = require("@skylib/functions");
const utils_1 = require("@typescript-eslint/utils");
const ts = tslib_1.__importStar(require("typescript"));
exports.preferReadonly = utils.createRule({
    create(context) {
        const { ignoreInferredTypes } = context.options;
        const selectors = utils.getSelectors(context.options, defaultSelectors);
        return {
            [selectors](node) {
                const tsNode = context.toTsNode(node);
                if (ts.isFunctionLike(tsNode))
                    for (const param of tsNode.parameters)
                        if (ignoreInferredTypes && functions_1.is.empty(param.type)) {
                            // Ignore infered types
                        }
                        else
                            lintNode(context.toEsNode(param), param.name.getText(), context);
                else
                    lintNode(node, tsNode.getText(), context);
            }
        };
    },
    defaultOptions: {
        excludeSelectors: [],
        ignoreClasses: false,
        ignoreIdentifiers: [],
        ignoreInferredTypes: false,
        ignoreInterfaces: false,
        ignoreTypes: [],
        includeSelectors: [],
        noDefaultSelectors: false
    },
    isRuleOptions: functions_1.is.object.factory({
        excludeSelectors: functions_1.is.strings,
        ignoreClasses: functions_1.is.boolean,
        ignoreIdentifiers: functions_1.is.strings,
        ignoreInferredTypes: functions_1.is.boolean,
        ignoreInterfaces: functions_1.is.boolean,
        ignoreTypes: functions_1.is.strings,
        includeSelectors: functions_1.is.strings,
        noDefaultSelectors: functions_1.is.boolean
    }, {}),
    messages: {
        shouldBeReadonly: "Parameter should be a readonly type. Failed type name: {{name}}. Failed type definition: {{definition}}"
    },
    name: "prefer-readonly"
});
const defaultSelectors = [
    utils_1.AST_NODE_TYPES.ArrowFunctionExpression,
    utils_1.AST_NODE_TYPES.FunctionDeclaration,
    utils_1.AST_NODE_TYPES.FunctionExpression,
    utils_1.AST_NODE_TYPES.TSCallSignatureDeclaration,
    utils_1.AST_NODE_TYPES.TSConstructSignatureDeclaration,
    utils_1.AST_NODE_TYPES.TSConstructorType,
    utils_1.AST_NODE_TYPES.TSDeclareFunction,
    utils_1.AST_NODE_TYPES.TSEmptyBodyFunctionExpression,
    utils_1.AST_NODE_TYPES.TSFunctionType,
    utils_1.AST_NODE_TYPES.TSInterfaceDeclaration,
    utils_1.AST_NODE_TYPES.TSMethodSignature,
    utils_1.AST_NODE_TYPES.TSTypeAliasDeclaration
];
const restTypes = new Set([
    utils_1.AST_NODE_TYPES.ArrayPattern,
    utils_1.AST_NODE_TYPES.RestElement
]);
/**
 * Lints node.
 *
 * @param node - Node.
 * @param identifier - Identifier.
 * @param context - Context.
 */
function lintNode(node, identifier, context) {
    const { ignoreClasses, ignoreIdentifiers, ignoreInterfaces, ignoreTypes } = context.options;
    const ignoreIdentifiersMatcher = utils.createMatcher(ignoreIdentifiers);
    if (ignoreIdentifiersMatcher(identifier)) {
        // Ignore
    }
    else {
        const tsNode = context.toTsNode(node);
        const type = context.checker.getTypeAtLocation(tsNode);
        const checker = new utils.Checker({
            context,
            ignoreClasses,
            ignoreInterfaces,
            ignoreTypeParameters: true,
            ignoreTypes,
            readonliness: "allMaybeReadonly"
        });
        const result = checker.checkType(type, node, restTypes.has(node.type));
        if ("failed" in result)
            context.report({
                data: {
                    definition: context.getTypeDefinitions(result.types),
                    name: utils.getTypeNames(result.types)
                },
                messageId: "shouldBeReadonly",
                node
            });
    }
}
//# sourceMappingURL=prefer-readonly.js.map