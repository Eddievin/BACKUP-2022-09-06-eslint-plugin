"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.onlyExportName = exports.MessageId = void 0;
const tslib_1 = require("tslib");
const utils = tslib_1.__importStar(require("../../utils"));
var MessageId;
(function (MessageId) {
    MessageId["invalidName"] = "invalidName";
})(MessageId = exports.MessageId || (exports.MessageId = {}));
exports.onlyExportName = utils.createRule({
    name: "only-export-name",
    messages: {
        [MessageId.invalidName]: "Only export should match file name: {{expected}}"
    },
    create: context => utils.ruleTemplates.export(ctx => {
        if (ctx.onlyExport)
            for (const node of ctx.identifiers) {
                const expected = utils.getIdentifierFromPath(context.path, node.name);
                if ([expected, "default"].includes(node.name)) {
                    // Valid
                }
                else
                    context.report({
                        data: { expected },
                        messageId: MessageId.invalidName,
                        node
                    });
            }
    })
});
//# sourceMappingURL=only-export-name.js.map