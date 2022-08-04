"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.consistentFilename = exports.MessageId = void 0;
const tslib_1 = require("tslib");
const _ = tslib_1.__importStar(require("@skylib/lodash-commonjs-es"));
const utils = tslib_1.__importStar(require("../../utils"));
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
    isSubOptions: functions_1.is.object.factory({ _id: functions_1.is.string, match: functions_1.is.boolean, selector: utils.isSelector }, { format: utils.casing.isFormat }),
    defaultSubOptions: { match: false },
    subOptionsKey: "overrides",
    messages: {
        [MessageId.invalidFilename]: "Expecting file name to be: {{expected}}",
        [MessageId.invalidFilenameId]: "Expecting file name to be: {{expected}} ({{_id}})"
    },
    create: (context) => {
        const items = [];
        return utils.mergeListenters(...context.subOptionsArray.map((subOptions) => {
            const selector = functions_1.a.fromMixed(subOptions.selector).join(", ");
            return {
                [selector]: (node) => {
                    items.push({ node, subOptions });
                }
            };
        }), {
            "Program:exit": () => {
                const { base: got } = node_path_1.default.parse(context.path);
                const item = functions_1.a.sort(items, reverseCompare)[0];
                if (item) {
                    const { _id, format, match } = Object.assign({ format: context.options.format }, item.subOptions);
                    const expected = got
                        .split(".")
                        .map((part, index) => index === 0
                        ? utils.casing.format(match ? utils.nodeText(item.node, part) : part, format)
                        : _.kebabCase(part))
                        .join(".");
                    if (got === expected) {
                        // Valid
                    }
                    else
                        context.report({
                            data: { _id, expected },
                            loc: context.locZero,
                            messageId: MessageId.invalidFilenameId
                        });
                }
                else {
                    const { format } = context.options;
                    const expected = got
                        .split(".")
                        .map((part, index) => index === 0
                        ? utils.casing.format(part, format)
                        : _.kebabCase(part))
                        .join(".");
                    if (got === expected) {
                        // Valid
                    }
                    else
                        context.report({
                            data: { expected },
                            loc: context.locZero,
                            messageId: MessageId.invalidFilename
                        });
                }
            }
        });
    }
});
/**
 * Compares items.
 *
 * @param item1 - First item.
 * @param item2 - Second item.
 * @returns - Comparison result.
 */
function reverseCompare(item1, item2) {
    return utils.compare(item2.subOptions._id, item1.subOptions._id);
}
//# sourceMappingURL=consistent-filename.js.map