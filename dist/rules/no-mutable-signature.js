"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.noMutableSignature = void 0;
const tslib_1 = require("tslib");
const utils = tslib_1.__importStar(require("./utils"));
const functions_1 = require("@skylib/functions");
const utils_1 = require("@typescript-eslint/utils");
exports.noMutableSignature = utils.createRule({
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
                        const checker = new utils.Checker({
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
    isRuleOptions: functions_1.is.object.factory({
        ignoreClasses: functions_1.is.boolean,
        ignoreIdentifiers: functions_1.is.strings,
        ignoreInterfaces: functions_1.is.boolean,
        ignoreNumberSignature: functions_1.is.boolean,
        ignoreStringSignature: functions_1.is.boolean,
        ignoreTypes: functions_1.is.strings
    }, {}),
    messages: {
        noMutableNumberSignature: "Number signature should be immutable. Failed type name: {{name}}. Failed type definition: {{definition}}",
        noMutableStringSignature: "String signature should be immutable. Failed type name: {{name}}. Failed type definition: {{definition}}"
    },
    name: "no-mutable-signature"
});
//# sourceMappingURL=no-mutable-signature.js.map