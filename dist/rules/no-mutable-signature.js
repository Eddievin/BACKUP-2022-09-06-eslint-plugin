"use strict";
const tslib_1 = require("tslib");
const utils_1 = require("@typescript-eslint/utils");
const is = tslib_1.__importStar(require("@skylib/functions/dist/guards"));
const utils = tslib_1.__importStar(require("./utils"));
const readonliness_1 = require("./utils/readonliness");
const isRuleOptions = is.object.factory({
    ignoreClasses: is.boolean,
    ignoreIdentifiers: is.strings,
    ignoreInterfaces: is.boolean,
    ignoreNumberSignature: is.boolean,
    ignoreStringSignature: is.boolean,
    ignoreTypes: is.strings
}, {});
const rule = utils.createRule({
    create(context) {
        const { ignoreClasses, ignoreIdentifiers, ignoreInterfaces, ignoreNumberSignature, ignoreStringSignature, ignoreTypes } = context.options;
        const ignoreIdentifiersMatcher = utils.createMatcher(ignoreIdentifiers);
        const signatures = [
            {
                ignore: ignoreNumberSignature,
                messageId: "noMutableNumberSignature",
                readonliness: "numberSignatureReadonly"
            },
            {
                ignore: ignoreStringSignature,
                messageId: "noMutableStringSignature",
                readonliness: "stringSignatureReadonly"
            }
        ];
        const annotations = [];
        const ignoreAnnotations = [];
        const restAnnotations = [];
        return {
            [utils_1.AST_NODE_TYPES.Identifier](node) {
                if (node.typeAnnotation && ignoreIdentifiersMatcher(node.name))
                    ignoreAnnotations.push(node.typeAnnotation);
            },
            [utils_1.AST_NODE_TYPES.RestElement](node) {
                if (node.typeAnnotation)
                    restAnnotations.push(node.typeAnnotation);
            },
            [utils_1.AST_NODE_TYPES.TSTypeAnnotation](node) {
                annotations.push(node);
            },
            "Program:exit"() {
                const ignoreAnnotationsSet = new Set(ignoreAnnotations);
                const restAnnotationsSet = new Set(restAnnotations);
                for (const { ignore, messageId, readonliness } of signatures)
                    if (ignore) {
                        // Ignore
                    }
                    else {
                        const checker = new readonliness_1.Checker({
                            context,
                            ignoreClasses,
                            ignoreInterfaces,
                            ignoreTypeParameters: true,
                            ignoreTypes,
                            readonliness
                        });
                        for (const node of annotations)
                            if (ignoreAnnotationsSet.has(node)) {
                                // Ignore
                            }
                            else {
                                const tsNode = context.toTsNode(node.typeAnnotation);
                                const type = context.checker.getTypeAtLocation(tsNode);
                                const result = checker.checkType(type, node, restAnnotationsSet.has(node));
                                if ("failed" in result)
                                    context.report({
                                        data: {
                                            definition: context.getTypeDefinitions(result.types),
                                            name: utils.getTypeNames(result.types)
                                        },
                                        messageId,
                                        node
                                    });
                            }
                    }
            }
        };
    },
    defaultOptions: {
        ignoreClasses: false,
        ignoreIdentifiers: [],
        ignoreInterfaces: false,
        ignoreNumberSignature: false,
        ignoreStringSignature: false,
        ignoreTypes: []
    },
    isRuleOptions,
    messages: {
        noMutableNumberSignature: "Number signature should be immutable. Failed type name: {{name}}. Failed type definition: {{definition}}",
        noMutableStringSignature: "String signature should be immutable. Failed type name: {{name}}. Failed type definition: {{definition}}"
    },
    name: "no-mutable-signature"
});
module.exports = rule;
//# sourceMappingURL=no-mutable-signature.js.map