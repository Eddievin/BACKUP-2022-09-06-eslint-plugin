"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.preferOnlyExport = exports.MessageId = void 0;
const tslib_1 = require("tslib");
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
        const { exportMatchingFilename, selector: mixed } = context.options;
        const selector = functions_1.a.fromMixed(mixed).join(", ");
        let activated = false;
        return utils.ruleTemplates.export(ctx => {
            if (exportMatchingFilename &&
                ctx.identifiers.some(node => node.name === utils.getIdentifierFromPath(context.path, node.name)))
                activated = true;
            if (activated)
                if (ctx.onlyExport) {
                    // Valid
                }
                else
                    for (const node of ctx.identifiers)
                        context.report({ messageId: MessageId.invalidExport, node });
        }, selector
            ? {
                [selector]: () => {
                    activated = true;
                }
            }
            : {});
    }
});
//# sourceMappingURL=prefer-only-export.js.map