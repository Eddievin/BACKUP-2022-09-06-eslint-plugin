"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.functionPropertiesStyle = void 0;
const tslib_1 = require("tslib");
const utils = tslib_1.__importStar(require("./utils"));
const functions_1 = require("@skylib/functions");
const utils_1 = require("@typescript-eslint/utils");
const ts = tslib_1.__importStar(require("typescript"));
exports.functionPropertiesStyle = utils.createRule({
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
    isRuleOptions: functions_1.is.object,
    messages: {
        noDistributedDefinition: "Use Object.assign to define function in one statement"
    },
    name: "function-properties-style"
});
//# sourceMappingURL=function-properties-style.js.map