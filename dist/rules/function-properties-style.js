"use strict";
const tslib_1 = require("tslib");
const is = tslib_1.__importStar(require("@skylib/functions/dist/guards"));
const utils_1 = require("@typescript-eslint/utils");
const ts = tslib_1.__importStar(require("typescript"));
const utils = tslib_1.__importStar(require("./utils"));
const rule = utils.createRule({
    create(context) {
        return {
            [utils_1.AST_NODE_TYPES.AssignmentExpression](node) {
                if (node.left.type === utils_1.AST_NODE_TYPES.MemberExpression) {
                    const tsObject = context.toTsNode(node.left.object);
                    const type = context.checker.getTypeAtLocation(tsObject);
                    const signatures = context.checker.getSignaturesOfType(type, ts.SignatureKind.Call);
                    if (signatures.length)
                        context.report({ messageId: "noDistributedDefinition", node });
                }
            }
        };
    },
    isRuleOptions: is.object,
    messages: {
        noDistributedDefinition: "Use Object.assign to define function in one statement"
    },
    name: "function-properties-style"
});
module.exports = rule;
//# sourceMappingURL=function-properties-style.js.map