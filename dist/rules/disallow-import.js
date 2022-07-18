"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.disallowImport = exports.MessageId = void 0;
const tslib_1 = require("tslib");
const utils = tslib_1.__importStar(require("./utils"));
const functions_1 = require("@skylib/functions");
var MessageId;
(function (MessageId) {
    MessageId["disallowedSource"] = "disallowedSource";
})(MessageId = exports.MessageId || (exports.MessageId = {}));
exports.disallowImport = utils.createRule({
    name: "disallow-import",
    isOptions: functions_1.is.object.factory({ allow: functions_1.is.strings, disallow: functions_1.is.strings }, {}),
    defaultOptions: { allow: [], disallow: [] },
    isSubOptions: functions_1.is.object.factory({ allow: functions_1.is.strings, disallow: functions_1.is.strings }, {}),
    defaultSubOptions: { allow: [], disallow: [] },
    subOptionsKey: "exclusions",
    messages: {
        [MessageId.disallowedSource]: "Import from this source is not allowed"
    },
    create: (context) => {
        const matcher = utils.createFileMatcher.disallowAllow([
            context.options.disallow,
            ...context.subOptionsArray.map(subOptions => subOptions.disallow)
        ].flat(), [
            context.options.allow,
            ...context.subOptionsArray.map(subOptions => subOptions.allow)
        ].flat(), true, { dot: true });
        return {
            CallExpression: (node) => {
                if (node.callee.type === "Identifier" &&
                    node.callee.name === "require") {
                    const source = node.arguments[0];
                    if (functions_1.is.not.empty(source) &&
                        source.type === "Literal" &&
                        functions_1.is.string(source.value))
                        lintNode(source.value, source);
                }
            },
            ExportAllDeclaration: (node) => {
                const source = node.source;
                lintNode(source.value, source);
            },
            ExportNamedDeclaration: (node) => {
                const source = node.source;
                if (source)
                    lintNode(source.value, source);
            },
            ImportDeclaration: (node) => {
                const source = node.source;
                lintNode(source.value, source);
            },
            ImportExpression: (node) => {
                const source = node.source;
                if (source.type === "Literal" && functions_1.is.string(source.value))
                    lintNode(source.value, source);
            }
        };
        function lintNode(source, node) {
            if (matcher(source))
                context.report({ messageId: MessageId.disallowedSource, node });
        }
    }
});
//# sourceMappingURL=disallow-import.js.map