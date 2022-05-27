"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.disallowIdentifier = void 0;
const tslib_1 = require("tslib");
const utils = tslib_1.__importStar(require("./utils"));
const functions_1 = require("@skylib/functions");
exports.disallowIdentifier = utils.createRule({
    create: context => {
        return {
            ":not(Property) > Identifier:not(.property)": (node) => {
                for (const subOptions of context.subOptionsArray)
                    if (subOptions.ids.includes(node.name.valueOf()))
                        context.report({
                            fix: () => functions_1.is.not.empty(subOptions.replacement)
                                ? [{ range: node.range, text: subOptions.replacement }]
                                : [],
                            messageId: "disallowedIdentifier",
                            node
                        });
            }
        };
    },
    fixable: "code",
    isRuleOptions: functions_1.is.object,
    isSubOptions: functions_1.is.object.factory({ ids: functions_1.is.strings }, { replacement: functions_1.is.string }),
    messages: { disallowedIdentifier: "Disallowed identifier" },
    name: "disallow-identifier"
});
//# sourceMappingURL=disallow-identifier.js.map