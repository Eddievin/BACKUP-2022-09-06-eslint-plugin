"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.consistentEnumMembers = exports.MessageId = void 0;
const tslib_1 = require("tslib");
const utils = tslib_1.__importStar(require("../../utils"));
const utils_1 = require("@typescript-eslint/utils");
const functions_1 = require("@skylib/functions");
var MessageId;
(function (MessageId) {
    MessageId["inconsistentMember"] = "inconsistentMember";
})(MessageId = exports.MessageId || (exports.MessageId = {}));
exports.consistentEnumMembers = utils.createRule({
    name: "consistent-enum-members",
    vue: true,
    defaultOptions: { selector: [] },
    messages: { [MessageId.inconsistentMember]: "{{message}}" },
    create: (context) => ({
        TSEnumMember: node => {
            if (node.id.type === utils_1.AST_NODE_TYPES.Identifier &&
                node.initializer &&
                node.initializer.type === utils_1.AST_NODE_TYPES.Literal &&
                functions_1.is.string(node.initializer.value) &&
                node.id.name !== node.initializer.value)
                context.report({ messageId: MessageId.inconsistentMember, node });
        }
    })
});
//# sourceMappingURL=consistent-enum-members.js.map