"use strict";
const tslib_1 = require("tslib");
const fn = tslib_1.__importStar(require("@skylib/functions/dist/function"));
const is = tslib_1.__importStar(require("@skylib/functions/dist/guards"));
const utils_1 = require("@typescript-eslint/utils");
const utils = tslib_1.__importStar(require("./utils"));
const isRuleOptions = is.object.factory({
    ignoreClasses: is.boolean,
    ignoreIdentifiers: is.strings,
    ignoreInterfaces: is.boolean,
    ignorePrivateProperties: is.boolean,
    ignoreProtectedProperties: is.boolean,
    ignorePublicProperties: is.boolean,
    ignoreSelectedClasses: is.strings,
    ignoreSelectedInterfaces: is.strings
}, {});
const rule = utils.createRule({
    create(context) {
        const { ignoreClasses, ignoreIdentifiers, ignoreInterfaces, ignorePrivateProperties, ignoreProtectedProperties, ignorePublicProperties, ignoreSelectedClasses, ignoreSelectedInterfaces } = context.options;
        const ignoreAccessebilities = fn.run(() => {
            const result = new Set();
            if (ignorePrivateProperties)
                result.add("private");
            if (ignoreProtectedProperties)
                result.add("protected");
            if (ignorePublicProperties)
                result.add("public");
            return result;
        });
        const ignoreIdentifiersMatcher = utils.createMatcher(ignoreIdentifiers);
        const ignoreSelectedClassesMatcher = utils.createMatcher(ignoreSelectedClasses);
        const ignoreSelectedInterfacesMatcher = utils.createMatcher(ignoreSelectedInterfaces);
        const listener = {};
        if (ignoreClasses) {
            // Skip
        }
        else
            listener[utils_1.AST_NODE_TYPES.ClassDeclaration] = (node) => {
                if (node.id && ignoreSelectedClassesMatcher(node.id.name)) {
                    // Ignore
                }
                else
                    for (const element of node.body.body)
                        if (element.type === utils_1.AST_NODE_TYPES.PropertyDefinition)
                            lintNode(element);
            };
        if (ignoreInterfaces) {
            // Skip
        }
        else
            listener[utils_1.AST_NODE_TYPES.TSInterfaceDeclaration] = (node) => {
                if (ignoreSelectedInterfacesMatcher(node.id.name)) {
                    // Ignore
                }
                else
                    for (const element of node.body.body)
                        if (element.type === utils_1.AST_NODE_TYPES.TSPropertySignature)
                            lintNode(element);
            };
        return listener;
        function lintNode(node) {
            var _a;
            if ((_a = node.readonly) !== null && _a !== void 0 ? _a : false) {
                // Valid
            }
            else if (ignoreAccessebilities.has(node.accessibility)) {
                // Ignore based on accessibility
            }
            else if (node.key.type === utils_1.AST_NODE_TYPES.Identifier &&
                ignoreIdentifiersMatcher(node.key.name)) {
                // Ignore based on property name
            }
            else if (node.key.type === utils_1.AST_NODE_TYPES.Literal &&
                is.string(node.key.value) &&
                ignoreIdentifiersMatcher(node.key.value)) {
                // Ignore based on property name
            }
            else
                context.report({ messageId: "expectingReadonlyProperty", node });
        }
    },
    defaultOptions: {
        ignoreClasses: false,
        ignoreIdentifiers: [],
        ignoreInterfaces: false,
        ignorePrivateProperties: false,
        ignoreProtectedProperties: false,
        ignorePublicProperties: false,
        ignoreSelectedClasses: [],
        ignoreSelectedInterfaces: []
    },
    isRuleOptions,
    messages: { expectingReadonlyProperty: "Property should be readonly" },
    name: "prefer-readonly-props"
});
module.exports = rule;
//# sourceMappingURL=prefer-readonly-props.js.map