"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.noRestrictedSyntax = exports.MessageId = void 0;
const tslib_1 = require("tslib");
const _ = tslib_1.__importStar(require("@skylib/lodash-commonjs-es"));
const utils = tslib_1.__importStar(require("../../utils"));
const functions_1 = require("@skylib/functions");
var MessageId;
(function (MessageId) {
    MessageId["customMessage"] = "customMessage";
})(MessageId = exports.MessageId || (exports.MessageId = {}));
exports.noRestrictedSyntax = utils.createRule({
    name: "no-restricted-syntax",
    fixable: utils.Fixable.code,
    vue: true,
    isOptions: functions_1.is.object.factory({ ignoreSelector: utils.isSelector, selector: utils.isSelector }, { message: functions_1.is.string, replacement: functions_1.is.string, search: functions_1.is.string }),
    defaultOptions: { ignoreSelector: [] },
    messages: { [MessageId.customMessage]: "{{message}}" },
    create: (context) => {
        const { ignoreSelector: ignoreMixed, message, replacement, search, selector: mixed } = context.options;
        const selector = functions_1.a.fromMixed(mixed).join(", ");
        const ignoreSelector = functions_1.a.fromMixed(ignoreMixed).join(", ");
        functions_1.assert.toBeTrue(selector !== "", "Expecting selector");
        const nodes = [];
        const ignoreNodes = [];
        const listener1 = {
            [selector]: (node) => {
                if (ignoreSelector)
                    nodes.push(node);
                else
                    lintNode(node);
            }
        };
        const listener2 = ignoreSelector
            ? (0, functions_1.typedef)({
                [ignoreSelector]: (node) => {
                    ignoreNodes.push(node);
                }
            })
            : {};
        const listener3 = {
            "Program:exit": () => {
                for (const node of _.difference(nodes, ignoreNodes))
                    lintNode(node);
            }
        };
        return utils.mergeListenters(listener1, listener2, listener3);
        function lintNode(node) {
            context.report({
                data: { message: message !== null && message !== void 0 ? message : `This syntax is not allowed: ${selector}` },
                fix: () => functions_1.is.not.empty(replacement)
                    ? [
                        {
                            range: node.range,
                            text: functions_1.is.not.empty(search)
                                ? context.getText(node).replace(
                                // eslint-disable-next-line security/detect-non-literal-regexp -- Ok
                                new RegExp(search, "u"), replacement)
                                : replacement
                        }
                    ]
                    : [],
                messageId: MessageId.customMessage,
                node
            });
        }
    }
});
//# sourceMappingURL=no-restricted-syntax.js.map