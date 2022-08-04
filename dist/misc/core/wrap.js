"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.wrap = exports.MessageId = void 0;
const tslib_1 = require("tslib");
const utils = tslib_1.__importStar(require("../../utils"));
const functions_1 = require("@skylib/functions");
var MessageId;
(function (MessageId) {
    MessageId["customMessage"] = "customMessage";
})(MessageId = exports.MessageId || (exports.MessageId = {}));
exports.wrap = utils.createRule({
    name: "wrap",
    fixable: utils.Fixable.code,
    vue: true,
    isOptions: functions_1.is.object.factory({
        lintSelector: utils.isSelector,
        plugin: functions_1.is.string,
        rule: functions_1.is.string,
        skipSelector: utils.isSelector
    }, {}),
    defaultOptions: { lintSelector: [], skipSelector: [] },
    messages: { [MessageId.customMessage]: "{{message}}" },
    create: (context) => {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment -- Ok
        const plugin = require(context.options.plugin);
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access -- Ok
        const rule = plugin.rules[context.options.rule];
        const lintSelector = functions_1.a.fromMixed(context.options.lintSelector).join(", ");
        const skipSelector = functions_1.a.fromMixed(context.options.skipSelector).join(", ");
        const lintIds = [];
        const skipIds = [];
        const reports = [];
        const listener1 = rule.create(new Proxy({}, (0, functions_1.wrapProxyHandler)("eslint-wrap-rule", functions_1.ProxyHandlerAction.throw, {
            get: (_target, key) => key === "report"
                ? (report) => {
                    reports.push(report);
                }
                : // eslint-disable-next-line @skylib/custom/functions/no-reflect-get -- Ok
                    functions_1.reflect.get(context.rawContext, key)
        })));
        const listener2 = lintSelector
            ? (0, functions_1.typedef)({
                [lintSelector]: (node) => {
                    lintIds.push(nodeId(node));
                }
            })
            : {};
        const listener3 = skipSelector
            ? (0, functions_1.typedef)({
                [skipSelector]: (node) => {
                    skipIds.push(nodeId(node));
                }
            })
            : {};
        const listener4 = {
            "Program:exit": () => {
                const lintMatcher = lintIds.length
                    ? (report) => "node" in report && lintIds.includes(nodeId(report.node))
                    : () => true;
                const skipMatcher = skipIds.length
                    ? (report) => "node" in report && skipIds.includes(nodeId(report.node))
                    : () => false;
                for (const report of reports)
                    if (lintMatcher(report) && !skipMatcher(report)) {
                        const { data, messageId } = Object.assign({ data: {} }, report);
                        const message = functions_1.as.not
                            .empty(rule.meta.messages[messageId])
                            .replace(/\{\{\s*(\w+)\s*\}\}/gu, (_str, match1) => {
                            const result = data[match1];
                            return functions_1.as.numStr(result).toString();
                        });
                        context.rawContext.report(Object.assign(Object.assign({}, report), { data: { message }, messageId: MessageId.customMessage }));
                    }
            }
        };
        return utils.mergeListenters(listener1, listener2, listener3, listener4);
    }
});
/**
 * Generates node ID.
 *
 * @param node - Node.
 * @returns Node ID.
 */
function nodeId(node) {
    return `${node.type}-${node.range[0]}-${node.range[1]}`;
}
//# sourceMappingURL=wrap.js.map