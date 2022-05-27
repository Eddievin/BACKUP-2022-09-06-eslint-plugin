"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.classMemberTypedef = void 0;
const tslib_1 = require("tslib");
const utils = tslib_1.__importStar(require("./utils"));
const functions_1 = require("@skylib/functions");
const utils_1 = require("@typescript-eslint/utils");
exports.classMemberTypedef = utils.createRule({
    create: context => {
        return {
            [utils_1.AST_NODE_TYPES.PropertyDefinition]: (node) => {
                if (node.typeAnnotation || node.value) {
                    // Valid
                }
                else
                    context.report({ messageId: "typedefRequired", node });
            }
        };
    },
    isRuleOptions: functions_1.is.object,
    messages: { typedefRequired: "Type definition required" },
    name: "class-member-typedef"
});
//# sourceMappingURL=class-member-typedef.js.map