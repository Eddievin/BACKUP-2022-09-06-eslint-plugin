"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.preferTsToolbelt = void 0;
const tslib_1 = require("tslib");
const utils = tslib_1.__importStar(require("./utils"));
const functions_1 = require("@skylib/functions");
const utils_1 = require("@typescript-eslint/utils");
exports.preferTsToolbelt = utils.createRule({
    create: (context) => {
        return {
            [utils_1.AST_NODE_TYPES.TSConditionalType]: (node) => {
                if (/\binfer\b/u.test(context.getText(node))) {
                    // Do not report
                }
                else
                    context.report({ messageId: "preferExtends", node });
            }
        };
    },
    isRuleOptions: functions_1.is.object,
    messages: {
        preferExtends: 'Use "Extends" type from "ts-toolbelt" package instead'
    },
    name: "prefer-ts-toolbelt"
});
//# sourceMappingURL=prefer-ts-toolbelt.js.map