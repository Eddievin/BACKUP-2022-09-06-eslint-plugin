"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.noUnsafeObjectAssignment = exports.MessageId = void 0;
const tslib_1 = require("tslib");
const ts = tslib_1.__importStar(require("typescript"));
const tsutils = tslib_1.__importStar(require("tsutils"));
const utils = tslib_1.__importStar(require("./utils"));
const utils_1 = require("@typescript-eslint/utils");
var MessageId;
(function (MessageId) {
    MessageId["unsafeOptionalAssignment"] = "unsafeOptionalAssignment";
    MessageId["unsafeReadonlyAssignment"] = "unsafeReadonlyAssignment";
})(MessageId = exports.MessageId || (exports.MessageId = {}));
exports.noUnsafeObjectAssignment = utils.createRule({
    name: "no-unsafe-object-assignment",
    messages: {
        [MessageId.unsafeOptionalAssignment]: "Unsafe optional assignment: {{name}}",
        [MessageId.unsafeReadonlyAssignment]: "Unsafe readonly-to-mutable assignment: {{name}}"
    },
    create: (context) => {
        return {
            ArrowFunctionExpression: (node) => {
                if (node.body.type === utils_1.AST_NODE_TYPES.BlockStatement) {
                    // Should be checked by ReturnStatement
                }
                else if (node.returnType)
                    lintNodes(node.returnType.typeAnnotation, node.body);
                else {
                    // No return type to check
                }
            },
            AssignmentExpression: (node) => {
                lintNodes(node.left, node.right);
            },
            CallExpression: (node) => {
                const tsNode = context.toTsNode(node);
                for (const arg of tsNode.arguments)
                    lintExpression(arg);
            },
            ReturnStatement: (node) => {
                const tsNode = context.toTsNode(node);
                if (tsNode.expression)
                    lintExpression(tsNode.expression);
            },
            VariableDeclaration: (node) => {
                for (const declaration of node.declarations)
                    if (declaration.init)
                        lintNodes(declaration.id, declaration.init);
            }
        };
        function lintExpression(tsNode) {
            const destType = context.checker.getContextualType(tsNode);
            const sourceType = context.checker.getTypeAtLocation(tsNode);
            const node = context.toEsNode(tsNode);
            if (destType && node.type !== "ObjectExpression")
                lintTypes(destType, sourceType, node);
        }
        function lintNodes(dest, source) {
            const tsDest = context.toTsNode(dest);
            const tsSource = context.toTsNode(source);
            const destType = context.checker.getTypeAtLocation(tsDest);
            const sourceType = context.checker.getTypeAtLocation(tsSource);
            if (source.type === "ObjectExpression") {
                // Ignore
            }
            else
                lintTypes(destType, sourceType, source);
        }
        function lintTypes(dest, source, node) {
            if (dest !== source &&
                tsutils.isObjectType(dest) &&
                tsutils.isObjectType(source)) {
                for (const destProperty of dest.getProperties())
                    if (destProperty.name.startsWith("__@")) {
                        // Ignore
                    }
                    else {
                        const sourceProperty = source.getProperty(destProperty.name);
                        if (sourceProperty) {
                            const destReadonly = tsutils.isPropertyReadonlyInType(dest, destProperty.getEscapedName(), context.checker);
                            const sourceReadonly = tsutils.isPropertyReadonlyInType(source, sourceProperty.getEscapedName(), context.checker);
                            if (sourceReadonly && !destReadonly) {
                                context.report({
                                    data: { name: destProperty.name },
                                    messageId: MessageId.unsafeReadonlyAssignment,
                                    node
                                });
                                return;
                            }
                        }
                        else {
                            context.report({
                                data: { name: destProperty.name },
                                messageId: MessageId.unsafeOptionalAssignment,
                                node
                            });
                            return;
                        }
                    }
                for (const kind of [ts.IndexKind.Number, ts.IndexKind.String]) {
                    const sourceIndexInfo = context.checker.getIndexInfoOfType(source, kind);
                    const destIndexInfo = context.checker.getIndexInfoOfType(dest, kind);
                    if (sourceIndexInfo &&
                        destIndexInfo &&
                        sourceIndexInfo.isReadonly &&
                        !destIndexInfo.isReadonly) {
                        context.report({
                            data: { name: "Index signature" },
                            messageId: MessageId.unsafeReadonlyAssignment,
                            node
                        });
                        return;
                    }
                }
            }
        }
    }
});
//# sourceMappingURL=no-unsafe-object-assignment.js.map