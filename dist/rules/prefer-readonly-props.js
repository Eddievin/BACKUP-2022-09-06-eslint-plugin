"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.preferReadonlyProps = void 0;
const tslib_1 = require("tslib");
const utils = tslib_1.__importStar(require("./utils"));
const functions_1 = require("@skylib/functions");
const utils_1 = require("@typescript-eslint/utils");
exports.preferReadonlyProps = utils.createRule({
    create(context) {
        const { ignoreClasses, ignoreIdentifiers, ignoreInterfaces, ignorePrivateProperties, ignoreProtectedProperties, ignorePublicProperties, ignoreSelectedClasses, ignoreSelectedInterfaces } = context.options;
        const ignoreAccessebilities = functions_1.fn.run(() => {
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
                functions_1.is.string(node.key.value) &&
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
    isRuleOptions: functions_1.is.object.factory({
        ignoreClasses: functions_1.is.boolean,
        ignoreIdentifiers: functions_1.is.strings,
        ignoreInterfaces: functions_1.is.boolean,
        ignorePrivateProperties: functions_1.is.boolean,
        ignoreProtectedProperties: functions_1.is.boolean,
        ignorePublicProperties: functions_1.is.boolean,
        ignoreSelectedClasses: functions_1.is.strings,
        ignoreSelectedInterfaces: functions_1.is.strings
    }, {}),
    messages: { expectingReadonlyProperty: "Property should be readonly" },
    name: "prefer-readonly-props"
});
//# sourceMappingURL=prefer-readonly-props.js.map