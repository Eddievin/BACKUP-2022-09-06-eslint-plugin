"use strict";
const tslib_1 = require("tslib");
const tsutils = (0, tslib_1.__importStar)(require("tsutils"));
const ts = (0, tslib_1.__importStar)(require("typescript"));
const experimental_utils_1 = require("@typescript-eslint/experimental-utils");
const is = (0, tslib_1.__importStar)(require("@typerock/functions/dist/guards"));
const utils = (0, tslib_1.__importStar)(require("./utils"));
const rule = utils.createRule({
    create(context) {
        return {
            [experimental_utils_1.AST_NODE_TYPES.ArrowFunctionExpression](node) {
                if (node.body.type === experimental_utils_1.AST_NODE_TYPES.BlockStatement) {
                    // Should be checked by ReturnStatement
                }
                else if (node.returnType)
                    lintNodes(node.returnType.typeAnnotation, node.body, context);
                else {
                    // No return type to check
                }
            },
            [experimental_utils_1.AST_NODE_TYPES.AssignmentExpression](node) {
                lintNodes(node.left, node.right, context);
            },
            [experimental_utils_1.AST_NODE_TYPES.CallExpression](node) {
                const tsNode = context.toTsNode(node);
                for (const arg of tsNode.arguments)
                    lintExpression(arg, context);
            },
            [experimental_utils_1.AST_NODE_TYPES.ReturnStatement](node) {
                const tsNode = context.toTsNode(node);
                if (tsNode.expression)
                    lintExpression(tsNode.expression, context);
            },
            [experimental_utils_1.AST_NODE_TYPES.VariableDeclaration](node) {
                for (const declaration of node.declarations)
                    if (declaration.init)
                        lintNodes(declaration.id, declaration.init, context);
            }
        };
    },
    isRuleOptions: is.object,
    messages: {
        unsafeOptionalAssignment: "Unsafe optional assignment: {{name}}",
        unsafeReadonlyAssignment: "Unsafe readonly-to-mutable assignment: {{name}}"
    }
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
    if (node.type !== experimental_utils_1.AST_NODE_TYPES.ObjectExpression && destType)
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
    if (source.type !== experimental_utils_1.AST_NODE_TYPES.ObjectExpression)
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
module.exports = rule;
//# sourceMappingURL=no-unsafe-object-assignment.js.map