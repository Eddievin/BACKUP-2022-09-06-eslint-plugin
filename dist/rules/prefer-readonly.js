"use strict";
const tslib_1 = require("tslib");
const ts = (0, tslib_1.__importStar)(require("typescript"));
const experimental_utils_1 = require("@typescript-eslint/experimental-utils");
const is = (0, tslib_1.__importStar)(require("@skylib/functions/dist/guards"));
const utils = (0, tslib_1.__importStar)(require("./utils"));
const readonliness_1 = require("./utils/readonliness");
const isRuleOptions = is.factory(is.object.of, {
    excludeSelectors: is.strings,
    ignoreClasses: is.boolean,
    ignoreIdentifiers: is.strings,
    ignoreTypes: is.strings,
    includeSelectors: is.strings,
    noDefaultSelectors: is.boolean
}, {});
const rule = utils.createRule({
    create(context) {
        const selectors = utils.getSelectors(context.options, defaultSelectors);
        return {
            [selectors](node) {
                const tsNode = context.toTsNode(node);
                if (ts.isFunctionLike(tsNode))
                    for (const param of tsNode.parameters)
                        lintNode(context.toEsNode(param), param.name.getText(), context);
                else
                    lintNode(node, tsNode.getText(), context);
            }
        };
    },
    defaultOptions: {
        excludeSelectors: [],
        ignoreClasses: true,
        ignoreIdentifiers: [],
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
    experimental_utils_1.AST_NODE_TYPES.ArrowFunctionExpression,
    experimental_utils_1.AST_NODE_TYPES.FunctionDeclaration,
    experimental_utils_1.AST_NODE_TYPES.FunctionExpression,
    experimental_utils_1.AST_NODE_TYPES.TSCallSignatureDeclaration,
    experimental_utils_1.AST_NODE_TYPES.TSConstructSignatureDeclaration,
    experimental_utils_1.AST_NODE_TYPES.TSConstructorType,
    experimental_utils_1.AST_NODE_TYPES.TSDeclareFunction,
    experimental_utils_1.AST_NODE_TYPES.TSEmptyBodyFunctionExpression,
    experimental_utils_1.AST_NODE_TYPES.TSFunctionType,
    experimental_utils_1.AST_NODE_TYPES.TSInterfaceDeclaration,
    experimental_utils_1.AST_NODE_TYPES.TSMethodSignature,
    experimental_utils_1.AST_NODE_TYPES.TSTypeAliasDeclaration
];
const restTypes = new Set([
    experimental_utils_1.AST_NODE_TYPES.ArrayPattern,
    experimental_utils_1.AST_NODE_TYPES.RestElement
]);
/**
 * Lints node.
 *
 * @param node - Node.
 * @param identifier - Identifier.
 * @param context - Context.
 */
function lintNode(node, identifier, context) {
    const { ignoreClasses, ignoreIdentifiers, ignoreTypes } = context.options;
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
            ignoreTypeParameters: true,
            ignoreTypes,
            readonliness: "allReadonly"
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