"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requireJsdoc = exports.MessageId = exports.isInterfaceOptions = exports.isInterfaceOption = exports.InterfaceOption = exports.isPropertyOptions = exports.isPropertyOption = exports.PropertyOption = void 0;
const tslib_1 = require("tslib");
const tsutils = tslib_1.__importStar(require("tsutils"));
const utils = tslib_1.__importStar(require("./utils"));
const functions_1 = require("@skylib/functions");
var PropertyOption;
(function (PropertyOption) {
    PropertyOption["function"] = "function";
    PropertyOption["nonFunction"] = "nonFunction";
})(PropertyOption = exports.PropertyOption || (exports.PropertyOption = {}));
exports.isPropertyOption = functions_1.is.factory(functions_1.is.enumeration, PropertyOption);
exports.isPropertyOptions = functions_1.is.factory(functions_1.is.array.of, exports.isPropertyOption);
var InterfaceOption;
(function (InterfaceOption) {
    InterfaceOption["callSignatures"] = "callSignatures";
    InterfaceOption["constructSignatures"] = "constructSignatures";
    InterfaceOption["interface"] = "interface";
})(InterfaceOption = exports.InterfaceOption || (exports.InterfaceOption = {}));
exports.isInterfaceOption = functions_1.is.factory(functions_1.is.enumeration, InterfaceOption);
exports.isInterfaceOptions = functions_1.is.factory(functions_1.is.array.of, exports.isInterfaceOption);
var MessageId;
(function (MessageId) {
    MessageId["undocumented"] = "undocumented";
    MessageId["undocumentedCallSignature"] = "undocumentedCallSignature";
    MessageId["undocumentedConstructSignature"] = "undocumentedConstructSignature";
})(MessageId = exports.MessageId || (exports.MessageId = {}));
exports.requireJsdoc = utils.createRule({
    name: "require-jsdoc",
    isOptions: functions_1.is.object.factory({
        excludeSelectors: functions_1.is.strings,
        includeSelectors: functions_1.is.strings,
        interfaces: exports.isInterfaceOptions,
        noDefaultSelectors: functions_1.is.boolean,
        properties: exports.isPropertyOptions
    }, {}),
    defaultOptions: {
        excludeSelectors: [],
        includeSelectors: [],
        interfaces: [
            InterfaceOption.callSignatures,
            InterfaceOption.constructSignatures,
            InterfaceOption.interface
        ],
        noDefaultSelectors: false,
        properties: [PropertyOption.function, PropertyOption.nonFunction]
    },
    messages: {
        [MessageId.undocumented]: "Missing documentation",
        [MessageId.undocumentedCallSignature]: "Missing documentation for call signature",
        [MessageId.undocumentedConstructSignature]: "Missing documentation for constructor signature"
    },
    create: (context) => {
        const selectors = utils.getSelectors(context.options, defaultSelectors);
        return {
            [selectors]: (node) => {
                switch (node.type) {
                    case "TSInterfaceDeclaration":
                        lintInterface(node);
                        break;
                    case "MethodDefinition":
                    case "TSMethodSignature":
                        lintMethod(node);
                        break;
                    case "PropertyDefinition":
                    case "TSPropertySignature":
                        lintProperty(node);
                        break;
                    default:
                        lintNodeByTypeSymbol(node);
                }
            }
        };
        function lintCallSignatures(node, type) {
            if (type
                .getCallSignatures()
                .some(signature => context.missingDocComment(signature)))
                context.report({
                    messageId: MessageId.undocumentedCallSignature,
                    node
                });
        }
        function lintConstructSignatures(node, type) {
            if (type
                .getConstructSignatures()
                .some(signature => context.missingDocComment(signature)))
                context.report({
                    messageId: MessageId.undocumentedConstructSignature,
                    node
                });
        }
        function lintInterface(node) {
            const { interfaces } = context.options;
            const tsNode = context.toTsNode(node);
            const type = context.checker.getTypeAtLocation(tsNode);
            if (interfaces.includes(InterfaceOption.interface))
                lintNodeByTypeSymbol(node);
            if (interfaces.includes(InterfaceOption.callSignatures))
                lintCallSignatures(node, type);
            if (interfaces.includes(InterfaceOption.constructSignatures))
                lintConstructSignatures(node, type);
        }
        function lintMethod(node) {
            const tsNode = context.toTsNode(node);
            if (tsutils.isConstructorDeclaration(tsNode)) {
                const type = tsutils.getConstructorTypeOfClassLikeDeclaration(tsNode.parent, context.checker);
                lintConstructSignatures(node, type);
            }
            else
                lintNodeBySymbol(node.key);
        }
        /**
         * Lints node.
         *
         * @param node - Node.
         */
        function lintNodeBySymbol(node) {
            const tsNode = context.toTsNode(node);
            const symbol = context.checker.getSymbolAtLocation(tsNode);
            if (symbol && context.missingDocComment(symbol))
                context.report({ messageId: MessageId.undocumented, node });
        }
        /**
         * Lints node.
         *
         * @param node - Node.
         */
        function lintNodeByTypeSymbol(node) {
            const tsNode = context.toTsNode(node);
            const symbol = context.checker.getTypeAtLocation(tsNode).getSymbol();
            if (symbol && context.missingDocComment(symbol))
                context.report({ messageId: MessageId.undocumented, node });
        }
        /**
         * Lints property.
         *
         * @param node - Node.
         */
        function lintProperty(node) {
            const { properties } = context.options;
            const typeAnnotation = node.typeAnnotation;
            if (typeAnnotation) {
                const type = typeAnnotation.typeAnnotation.type;
                if (type === "TSFunctionType"
                    ? properties.includes(PropertyOption.function)
                    : properties.includes(PropertyOption.nonFunction))
                    lintNodeBySymbol(node.key);
            }
        }
    }
});
const defaultSelectors = [
    "ClassDeclaration",
    "FunctionDeclaration",
    "MethodDefinition",
    "PropertyDefinition",
    "TSAbstractMethodDefinition",
    "TSCallSignatureDeclaration",
    "TSConstructSignatureDeclaration",
    "TSDeclareFunction",
    "TSInterfaceDeclaration",
    "TSMethodSignature",
    "TSPropertySignature"
];
//# sourceMappingURL=require-jsdoc.js.map