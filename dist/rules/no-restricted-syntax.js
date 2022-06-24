"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.noRestrictedSyntax = void 0;
const tslib_1 = require("tslib");
const utils = tslib_1.__importStar(require("./utils"));
const functions_1 = require("@skylib/functions");
exports.noRestrictedSyntax = utils.createRule({
    create: context => functions_1.o.fromEntries(context.subOptionsArray.flatMap(subOptions => {
        const { message, replacement, search, selector: mixedSelector } = subOptions;
        // eslint-disable-next-line no-warning-comments -- Wait for @skylib/function update
        // fixme - mixedToArray
        const selectors = functions_1.is.string(mixedSelector)
            ? [mixedSelector]
            : mixedSelector;
        return selectors.map(selector => [
            selector,
            (node) => {
                const range = node.range;
                context.report({
                    data: {
                        message: message !== null && message !== void 0 ? message : `This syntax is not allowed: ${selector}`
                    },
                    fix: () => functions_1.is.not.empty(replacement)
                        ? [
                            {
                                range,
                                text: functions_1.is.not.empty(search)
                                    ? context.getText(node).replace(
                                    // eslint-disable-next-line security/detect-non-literal-regexp -- Ok
                                    new RegExp(search, "u"), replacement)
                                    : replacement
                            }
                        ]
                        : [],
                    loc: context.getLocFromRange(range),
                    messageId: "customMessage"
                });
            }
        ]);
    })),
    fixable: "code",
    isRuleOptions: functions_1.is.object,
    isSubOptions: functions_1.is.object.factory({ selector: functions_1.is.or.factory(functions_1.is.string, functions_1.is.strings) }, {
        message: functions_1.is.string,
        replacement: functions_1.is.string,
        search: functions_1.is.string
    }),
    messages: { customMessage: "{{ message }}" },
    name: "no-restricted-syntax"
});
//# sourceMappingURL=no-restricted-syntax.js.map