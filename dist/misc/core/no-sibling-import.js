"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.noSiblingImport = exports.isSubOptions = exports.isStringsArray = exports.MessageId = void 0;
const tslib_1 = require("tslib");
const utils = tslib_1.__importStar(require("../../utils"));
const functions_1 = require("@skylib/functions");
const node_fs_1 = tslib_1.__importDefault(require("node:fs"));
const node_path_1 = tslib_1.__importDefault(require("node:path"));
var MessageId;
(function (MessageId) {
    MessageId["disallowedSource"] = "disallowedSource";
})(MessageId = exports.MessageId || (exports.MessageId = {}));
exports.isStringsArray = functions_1.is.factory(functions_1.is.array.of, functions_1.is.strings);
exports.isSubOptions = functions_1.is.object.factory({ allow: functions_1.is.boolean, levels: exports.isStringsArray }, {});
exports.noSiblingImport = utils.createRule({
    name: "no-sibling-import",
    isSubOptions: functions_1.is.object.factory({ allow: functions_1.is.boolean, levels: exports.isStringsArray }, {}),
    defaultSubOptions: { allow: false, levels: [] },
    subOptionsKey: "folders",
    messages: {
        [MessageId.disallowedSource]: "Import from this source is not allowed"
    },
    create: context => {
        const path = context.stripExtension(context.path);
        const dir = node_path_1.default.dirname(path);
        const basename = node_path_1.default.basename(path);
        if (basename === "index" || basename.startsWith("index."))
            return {};
        const matcher = (0, functions_1.evaluate)(() => {
            if (context.subOptionsArray.length) {
                const subOptions = functions_1.a.last(context.subOptionsArray);
                if (subOptions.allow)
                    return () => true;
                const index = subOptions.levels.findIndex(level => utils.createFileMatcher(level, false, { dot: true })(`./${basename}`));
                if (index > 0)
                    return utils.createFileMatcher(subOptions.levels.slice(0, index).flat(), false, { dot: true });
            }
            return () => false;
        });
        return utils.ruleTemplates.source(ctx => {
            const source = ctx.source;
            const parts = source.split("/");
            if (parts.length === 2) {
                const sourceDir = functions_1.a.first(parts);
                const sourceBasename = functions_1.a.second(parts);
                const sourcePath = `${dir}/${sourceBasename}`;
                if (sourceDir === ".")
                    if (matcher(source) || sourceBasename.startsWith(`${basename}.`)) {
                        // Valid
                    }
                    else if (node_fs_1.default.existsSync(sourcePath) &&
                        node_fs_1.default.statSync(sourcePath).isDirectory()) {
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