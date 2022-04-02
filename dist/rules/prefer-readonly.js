"use strict";
const tslib_1 = require("tslib");
const ts = tslib_1.__importStar(require("typescript"));
const utils_1 = require("@typescript-eslint/utils");
const is = tslib_1.__importStar(require("@skylib/functions/dist/guards"));
const utils = tslib_1.__importStar(require("./utils"));
const readonliness_1 = require("./utils/readonliness");
const isRuleOptions = is.object.of.factory({
    excludeSelectors: is.strings,
    ignoreClasses: is.boolean,
    ignoreIdentifiers: is.strings,
    ignoreInferredTypes: is.boolean,
    ignoreInterfaces: is.boolean,
    ignoreTypes: is.strings,
    includeSelectors: is.strings,
    noDefaultSelectors: is.boolean
}, {});
const rule = utils.createRule({
    create(context) {
        const { ignoreInferredTypes } = context.options;
        const selectors = utils.getSelectors(context.options, defaultSelectors);
        return {
            [selectors](node) {
                const tsNode = context.toTsNode(node);
                if (ts.isFunctionLike(tsNode))
                    for (const param of tsNode.parameters)
                        if (ignoreInferredTypes && is.empty(param.type)) {
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
    isRuleOptions,
    messages: {
        shouldBeReadonly: "Parameter should be a readonly type. Failed type name: {{name}}. Failed type definition: {{definition}}"
    }
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
        const checker = new readonliness_1.Checker({
            context,
            ignoreClasses,
            ignoreInterfaces,
            ignoreTypeParameters: true,
            ignoreTypes,
            readonliness: "allMaybeReadonly"
        });
        const result = checker.checkType(type, restTypes.has(node.type));
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
module.exports = rule;
//# sourceMappingURL=prefer-readonly.js.map