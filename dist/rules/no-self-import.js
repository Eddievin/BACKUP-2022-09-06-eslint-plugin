"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.noSelfImport = exports.MessageId = void 0;
const tslib_1 = require("tslib");
const utils = tslib_1.__importStar(require("./utils"));
const functions_1 = require("@skylib/functions");
const utils_1 = require("@typescript-eslint/utils");
const node_path_1 = tslib_1.__importDefault(require("node:path"));
var MessageId;
(function (MessageId) {
    // eslint-disable-next-line @typescript-eslint/no-shadow -- Postponed
    MessageId["noSelfImport"] = "noSelfImport";
})(MessageId = exports.MessageId || (exports.MessageId = {}));
exports.noSelfImport = utils.createRule({
    name: "no-self-import",
    isOptions: functions_1.is.object.factory({ extensions: functions_1.is.strings }, {}),
    defaultOptions: { extensions: [".js", ".ts"] },
    messages: { [MessageId.noSelfImport]: "Self-import is not allowed" },
    create: (context) => {
        const basenames = new functions_1.ReadonlySet([
            node_path_1.default.basename(context.path),
            ...context.options.extensions.map(extension => node_path_1.default.basename(context.path, extension))
        ]);
        return {
            CallExpression: (node) => {
                if (node.callee.type === utils_1.AST_NODE_TYPES.Identifier &&
                    node.callee.name === "require") {
                    const source = node.arguments[0];
                    if (functions_1.is.not.empty(source) &&
                        source.type === "Literal" &&
                        functions_1.is.string(source.value))
                        lintNode(source.value, source);
                }
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
            if (node_path_1.default.dirname(source) === "." && basenames.has(node_path_1.default.basename(source)))
                context.report({ messageId: MessageId.noSelfImport, node });
        }
    }
});
//# sourceMappingURL=no-self-import.js.map