"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.primaryExportOnly = exports.MessageId = void 0;
const tslib_1 = require("tslib");
const utils = tslib_1.__importStar(require("./utils"));
var MessageId;
(function (MessageId) {
    MessageId["invalidExport"] = "invalidExport";
})(MessageId = exports.MessageId || (exports.MessageId = {}));
exports.primaryExportOnly = utils.createRule({
    name: "primary-export-only",
    messages: { [MessageId.invalidExport]: "Primary export should be only one" },
    create: (context) => utils.ruleTemplates.export.create(ctx => {
        const primary = ctx.identifiers.find(node => node.name === utils.getIdentifierFromPath(context.path, node.name));
        if (primary)
            if (ctx.onlyExport) {
                // Valid
            }
            else
                context.report({ messageId: MessageId.invalidExport, node: primary });
    })
});
//# sourceMappingURL=primary-export-only.js.map