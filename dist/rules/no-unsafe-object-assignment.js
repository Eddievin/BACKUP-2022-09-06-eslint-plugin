"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.noUnsafeObjectAssignment = void 0;
const tslib_1 = require("tslib");
const utils = tslib_1.__importStar(require("./utils"));
const functions_1 = require("@skylib/functions");
const utils_1 = require("@typescript-eslint/utils");
const tsutils = tslib_1.__importStar(require("tsutils"));
const ts = tslib_1.__importStar(require("typescript"));
exports.noUnsafeObjectAssignment = utils.createRule({
    create(context) {
        return {
            [utils_1.AST_NODE_TYPES.ArrowFunctionExpression](node) {
                if (node.body.type === utils_1.AST_NODE_TYPES.BlockStatement) {
                    // Should be checked by ReturnStatement
                }
                else if (node.returnType)
                    lintNodes(node.returnType.typeAnnotation, node.body, context);
                else {
                    // No return type to check
                }
            },
            [utils_1.AST_NODE_TYPES.AssignmentExpression](node) {
                lintNodes(node.left, node.right, context);
            },
            [utils_1.AST_NODE_TYPES.CallExpression](node) {
                const tsNode = context.toTsNode(node);
                for (const arg of tsNode.arguments)
                    lintExpression(arg, context);
            },
            [utils_1.AST_NODE_TYPES.ReturnStatement](node) {
                const tsNode = context.toTsNode(node);
                if (tsNode.expression)
                    lintExpression(tsNode.expression, context);
            },
            [utils_1.AST_NODE_TYPES.VariableDeclaration](node) {
                for (const declaration of node.declarations)
                    if (declaration.init)
                        lintNodes(declaration.id, declaration.init, context);
            }
        };
    },
    isRuleOptions: functions_1.is.object,
    messages: {
        unsafeOptionalAssignment: "Unsafe optional assignment: {{name}}",
        unsafeReadonlyAssignment: "Unsafe readonly-to-mutable assignment: {{name}}"
    },
    name: "no-unsafe-object-assignment"
});
/**
 * Lints expression.
 *
 * @param tsNode - Node.
 * @param context - Context.
 */
function lintExpression(tsNode, context) {
    const destType = context.checker.getContextualType(tsNode);
    const sourceType = context.checker.getTypeAtLocation(tsNode);
    const node = context.toEsNode(tsNode);
    if (destType && node.type !== utils_1.AST_NODE_TYPES.ObjectExpression)
        lintTypes(destType, sourceType, node, context);
}
/**
 * Lints nodes.
 *
 * @param dest - Dest node.
 * @param source - Source node.
 * @param context - Context.
 */
function lintNodes(dest, source, context) {
    const tsDest = context.toTsNode(dest);
    const tsSource = context.toTsNode(source);
    const destType = context.checker.getTypeAtLocation(tsDest);
    const sourceType = context.checker.getTypeAtLocation(tsSource);
    if (source.type === utils_1.AST_NODE_TYPES.ObjectExpression) {
        // Ignore
    }
    else
        lintTypes(destType, sourceType, source, context);
}
/**
 * Lints types.
 *
 * @param dest - Dest type.
 * @param source - Source type.
 * @param node - Node.
 * @param context - Context.
 */
function lintTypes(dest, source, node, context) {
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
                            messageId: "unsafeReadonlyAssignment",
                            node
                        });
                        return;
                    }
                }
                else {
                    context.report({
                        data: { name: destProperty.name },
                        messageId: "unsafeOptionalAssignment",
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
                    messageId: "unsafeReadonlyAssignment",
                    node
                });
                return;
            }
        }
    }
}
//# sourceMappingURL=no-unsafe-object-assignment.js.map