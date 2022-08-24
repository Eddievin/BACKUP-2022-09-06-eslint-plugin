"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.preferOnlyExport = exports.MessageId = void 0;
const tslib_1 = require("tslib");
const ruleTemplates = tslib_1.__importStar(require("../../rule-templates"));
const utils = tslib_1.__importStar(require("../../utils"));
const functions_1 = require("@skylib/functions");
var MessageId;
(function (MessageId) {
    MessageId["invalidExport"] = "invalidExport";
})(MessageId = exports.MessageId || (exports.MessageId = {}));
exports.preferOnlyExport = utils.createRule({
    name: "prefer-only-export",
    vue: true,
    isOptions: functions_1.is.object.factory({ exportMatchingFilename: functions_1.is.boolean, selector: utils.isSelector }, {}),
    defaultOptions: { exportMatchingFilename: false, selector: [] },
    messages: { [MessageId.invalidExport]: "Expecting only export" },
    create: context => {
        const { exportMatchingFilename, selector: mixedSelector } = context.options;
        const selector = utils.selector(mixedSelector);
        let activated = false;
        return utils.mergeListeners(selector
            ? (0, functions_1.typedef)({
                [selector]: () => {
                    activated = true;
                }
            })
            : {}, ruleTemplates.export(ctx => {
            const { identifiers, onlyExport } = ctx;
            if (exportMatchingFilename &&
                identifiers.some(node => node.name ===
                    context.identifierFromPath(context.filename, node.name)))
                activated = true;
            if (activated)
                if (onlyExport) {
                    // Valid
                }
                else
                    for (const node of identifiers)
                        context.report({ messageId: MessageId.invalidExport, node });
        }));
    }
});
//# sourceMappingURL=prefer-only-export.js.map