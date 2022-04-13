"use strict";
const tslib_1 = require("tslib");
const utils_1 = require("@typescript-eslint/utils");
const is = tslib_1.__importStar(require("@skylib/functions/dist/guards"));
const utils = tslib_1.__importStar(require("./utils"));
const rule = utils.createRule({
    create(context) {
        return {
            [utils_1.AST_NODE_TYPES.TSConditionalType](node) {
                if (/\binfer\b/u.test(context.getText(node))) {
                    // Do not report
                }
                else
                    context.report({ messageId: "preferExtends", node });
            }
        };
    },
    isRuleOptions: is.object,
    messages: {
        preferExtends: 'Use "Extends" type from "ts-toolbelt" package instead'
    },
    name: "prefer-ts-toolbelt"
});
module.exports = rule;
//# sourceMappingURL=prefer-ts-toolbelt.js.map