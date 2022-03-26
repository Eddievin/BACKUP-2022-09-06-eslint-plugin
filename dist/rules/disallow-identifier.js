"use strict";
const tslib_1 = require("tslib");
const is = tslib_1.__importStar(require("@skylib/functions/dist/guards"));
const utils = tslib_1.__importStar(require("./utils"));
const isSubOptions = is.factory(is.object.of, { ids: is.strings }, { replacement: is.string });
const rule = utils.createRule({
    create(context) {
        return {
            ":not(Property) > Identifier:not(.property)"(node) {
                for (const subOptions of context.subOptionsArray)
                    if (subOptions.ids.includes(node.name.valueOf()))
                        context.report({
                            fix() {
                                return is.not.empty(subOptions.replacement)
                                    ? [
                                        {
                                            range: node.range,
                                            text: subOptions.replacement
                                        }
                                    ]
                                    : [];
                            },
                            messageId: "disallowedIdentifier",
                            node
                        });
            }
        };
    },
    fixable: "code",
    isRuleOptions: is.object,
    isSubOptions,
    messages: {
        disallowedIdentifier: "Disallowed identifier"
    }
});
module.exports = rule;
//# sourceMappingURL=disallow-identifier.js.map