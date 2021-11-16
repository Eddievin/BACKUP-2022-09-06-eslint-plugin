"use strict";
const tslib_1 = require("tslib");
const experimental_utils_1 = require("@typescript-eslint/experimental-utils");
const is = (0, tslib_1.__importStar)(require("@skylib/functions/dist/guards"));
const utils = (0, tslib_1.__importStar)(require("./utils"));
const readonliness_1 = require("./utils/readonliness");
const isRuleOptions = is.factory(is.object.of, {
    ignoreClasses: is.boolean,
    ignoreIdentifiers: is.strings,
    ignoreNumberSignature: is.boolean,
    ignoreStringSignature: is.boolean,
    ignoreTypes: is.strings
}, {});
const rule = utils.createRule({
    create(context) {
        const { ignoreClasses, ignoreIdentifiers, ignoreNumberSignature, ignoreStringSignature, ignoreTypes } = context.options;
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
            [experimental_utils_1.AST_NODE_TYPES.Identifier](node) {
                if (node.typeAnnotation && ignoreIdentifiersMatcher(node.name))
                    ignoreAnnotations.push(node.typeAnnotation);
            },
            [experimental_utils_1.AST_NODE_TYPES.RestElement](node) {
                if (node.typeAnnotation)
                    restAnnotations.push(node.typeAnnotation);
            },
            [experimental_utils_1.AST_NODE_TYPES.TSTypeAnnotation](node) {
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
                                const result = checker.checkType(type, restAnnotationsSet.has(node));
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
        ignoreClasses: true,
        ignoreIdentifiers: [],
        ignoreNumberSignature: true,
        ignoreStringSignature: false,
        ignoreTypes: []
    },
    isRuleOptions,
    messages: {
        noMutableNumberSignature: "Number signature should be immutable. Failed type name: {{name}}. Failed type definition: {{definition}}",
        noMutableStringSignature: "String signature should be immutable. Failed type name: {{name}}. Failed type definition: {{definition}}"
    }
});
module.exports = rule;
//# sourceMappingURL=no-mutable-signature.js.map