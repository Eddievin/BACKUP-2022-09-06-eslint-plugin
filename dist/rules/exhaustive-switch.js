"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.exhaustiveSwitch = void 0;
const tslib_1 = require("tslib");
const utils = tslib_1.__importStar(require("./utils"));
const functions_1 = require("@skylib/functions");
const _ = tslib_1.__importStar(require("@skylib/lodash-commonjs-es"));
const utils_1 = require("@typescript-eslint/utils");
exports.exhaustiveSwitch = utils.createRule({
    create: (context) => {
        return {
            [utils_1.AST_NODE_TYPES.SwitchStatement]: (node) => {
                const tests = node.cases.map(switchCase => switchCase.test);
                // eslint-disable-next-line unicorn/no-null
                if (tests.includes(null)) {
                    // Has default
                }
                else {
                    const got = tests
                        .filter(functions_1.is.not.empty)
                        .flatMap(expression => utils.getTypeParts(expression, context));
                    const expected = utils.getTypeParts.typeofFix(node.discriminant, context);
                    if (_.difference(expected, got).length > 0)
                        context.report({ messageId: "inexhaustiveSwitch", node });
                }
            }
        };
    },
    isRuleOptions: functions_1.is.object,
    messages: { inexhaustiveSwitch: "Inexhaustive switch" },
    name: "exhaustive-switch"
});
//# sourceMappingURL=exhaustive-switch.js.map