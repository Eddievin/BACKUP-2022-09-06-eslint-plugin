"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.matchFilename = exports.MessageId = void 0;
const tslib_1 = require("tslib");
const utils = tslib_1.__importStar(require("./utils"));
const functions_1 = require("@skylib/functions");
var MessageId;
(function (MessageId) {
    MessageId["invalidNodeText"] = "invalidNodeText";
})(MessageId = exports.MessageId || (exports.MessageId = {}));
exports.matchFilename = utils.createRule({
    name: "match-filename",
    vue: true,
    isOptions: functions_1.is.object.factory({
        format: utils.casing.isFormat,
        prefix: functions_1.is.string,
        selector: functions_1.is.string,
        suffix: functions_1.is.string
    }, {}),
    defaultOptions: {
        format: utils.casing.Format.camelCase,
        prefix: "",
        suffix: ""
    },
    messages: {
        [MessageId.invalidNodeText]: "Node text should match file name: {{ expected }}"
    },
    create: (context) => {
        const { format, prefix, selector: mixed, suffix } = context.options;
        const selector = functions_1.a.fromMixed(mixed).join(", ");
        return {
            [selector]: (node) => {
                const got = utils.nodeToString(node, context);
                const expected = prefix +
                    utils.casing.format(utils.getIdentifierFromPath(context.path, got), format) +
                    suffix;
                if (got === expected) {
                    // Valid
                }
                else
                    context.report({
                        data: { expected },
                        messageId: MessageId.invalidNodeText,
                        node
                    });
            }
        };
    }
});
//# sourceMappingURL=match-filename.js.map