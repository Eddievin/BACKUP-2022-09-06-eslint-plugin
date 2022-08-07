"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.noSelfImport = exports.MessageId = void 0;
const tslib_1 = require("tslib");
const utils = tslib_1.__importStar(require("../../utils"));
const node_path_1 = tslib_1.__importDefault(require("node:path"));
var MessageId;
(function (MessageId) {
    // eslint-disable-next-line @typescript-eslint/no-shadow -- Wait for https://github.com/typescript-eslint/typescript-eslint/issues/5337
    MessageId["noSelfImport"] = "noSelfImport";
})(MessageId = exports.MessageId || (exports.MessageId = {}));
exports.noSelfImport = utils.createRule({
    name: "no-self-import",
    messages: { [MessageId.noSelfImport]: "Self-import is not allowed" },
    create: context => {
        const basename = context.stripExtension(node_path_1.default.basename(context.path));
        return utils.ruleTemplates.source(ctx => {
            if (node_path_1.default.dirname(ctx.source) === "." &&
                context.stripExtension(node_path_1.default.basename(ctx.source)) === basename)
                context.report({ messageId: MessageId.noSelfImport, node: ctx.node });
        });
    }
});
//# sourceMappingURL=no-self-import.js.map