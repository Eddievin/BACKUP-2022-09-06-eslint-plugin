"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.noSiblingImport = exports.MessageId = void 0;
const tslib_1 = require("tslib");
const utils = tslib_1.__importStar(require("../../utils"));
const functions_1 = require("@skylib/functions");
const node_fs_1 = tslib_1.__importDefault(require("node:fs"));
const node_path_1 = tslib_1.__importDefault(require("node:path"));
var MessageId;
(function (MessageId) {
    MessageId["disallowedSource"] = "disallowedSource";
})(MessageId = exports.MessageId || (exports.MessageId = {}));
exports.noSiblingImport = utils.createRule({
    name: "no-sibling-import",
    isOptions: functions_1.is.object.factory({ exclusions: functions_1.is.strings }, {}),
    defaultOptions: { exclusions: [] },
    messages: {
        [MessageId.disallowedSource]: "Import from this source is not allowed"
    },
    create: context => {
        const { exclusions } = context.options;
        const fileDir = node_path_1.default.dirname(context.path);
        const fileBasename = node_path_1.default.basename(context.path);
        return fileBasename.startsWith("index.")
            ? {}
            : utils.ruleTemplates.source(ctx => {
                const source = ctx.source.split("/");
                if (source.length === 2) {
                    const sourceDir = functions_1.a.first(source);
                    const sourceBasename = functions_1.a.second(source);
                    const path = `${fileDir}/${sourceBasename}`;
                    if (sourceDir === ".")
                        if (exclusions.includes(sourceBasename)) {
                            // Valid
                        }
                        else if (node_fs_1.default.existsSync(path) &&
                            node_fs_1.default.statSync(path).isDirectory()) {
                            // Valid
                        }
                        else
                            context.report({
                                messageId: MessageId.disallowedSource,
                                node: ctx.node
                            });
                }
            });
    }
});
//# sourceMappingURL=no-sibling-import.js.map