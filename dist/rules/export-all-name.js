"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.exportAllName = exports.MessageId = void 0;
const tslib_1 = require("tslib");
const utils = tslib_1.__importStar(require("./utils"));
var MessageId;
(function (MessageId) {
    MessageId["invalidName"] = "invalidName";
})(MessageId = exports.MessageId || (exports.MessageId = {}));
exports.exportAllName = utils.createRule({
    name: "export-all-name",
    messages: { [MessageId.invalidName]: "Export name should match file name" },
    create: (context) => ({
        ExportAllDeclaration: (node) => {
            if (node.exported) {
                const got = node.exported.name;
                const expected = utils.getIdentifierFromPath(node.source.value, got);
                if (got === expected) {
                    // Valid
                }
                else
                    context.report({ messageId: MessageId.invalidName, node });
            }
        }
    })
});
//# sourceMappingURL=export-all-name.js.map