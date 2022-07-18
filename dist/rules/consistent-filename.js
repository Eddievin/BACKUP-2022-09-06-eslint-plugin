"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.consistentFilename = exports.MessageId = void 0;
const tslib_1 = require("tslib");
const _ = tslib_1.__importStar(require("@skylib/lodash-commonjs-es"));
const utils = tslib_1.__importStar(require("./utils"));
const functions_1 = require("@skylib/functions");
const node_path_1 = tslib_1.__importDefault(require("node:path"));
var MessageId;
(function (MessageId) {
    MessageId["invalidFilename"] = "invalidFilename";
    MessageId["invalidFilenameId"] = "invalidFilenameId";
})(MessageId = exports.MessageId || (exports.MessageId = {}));
exports.consistentFilename = utils.createRule({
    name: "consistent-filename",
    vue: true,
    isOptions: functions_1.is.object.factory({ format: utils.casing.isFormat }, {}),
    defaultOptions: { format: utils.casing.Format.kebabCase },
    isSubOptions: functions_1.is.object.factory({ _id: functions_1.is.string, selector: functions_1.is.string }, { format: utils.casing.isFormat, match: functions_1.is.boolean }),
    subOptionsKey: "overrides",
    messages: {
        [MessageId.invalidFilename]: "Expecting file name to be: {{ expected }}",
        [MessageId.invalidFilenameId]: "Expecting file name to be: {{ expected }} ({{ id }})"
    },
    create: (context) => {
        let _id;
        let format = context.options.format;
        let name;
        return Object.assign(Object.assign({}, functions_1.o.fromEntries(context.subOptionsArray.map(subOptions => {
            const { _id: newId, format: newFormat, match, selector } = Object.assign({ format, match: false }, subOptions);
            return [
                selector,
                (node) => {
                    _id = newId;
                    format = newFormat;
                    if (match)
                        name = utils.nodeToString(node, context);
                }
            ];
        }))), { "Program:exit": () => {
                const { base } = node_path_1.default.parse(context.path);
                const expected = base
                    .split(".")
                    .map((part, index) => index === 0
                    ? utils.casing.format(name !== null && name !== void 0 ? name : part, format)
                    : _.kebabCase(part))
                    .join(".");
                if (base === expected) {
                    // Valid
                }
                else
                    context.report(functions_1.is.not.empty(_id)
                        ? {
                            data: { _id, expected },
                            loc: context.locZero,
                            messageId: MessageId.invalidFilenameId
                        }
                        : {
                            data: { expected },
                            loc: context.locZero,
                            messageId: MessageId.invalidFilename
                        });
            } });
    }
});
//# sourceMappingURL=consistent-filename.js.map