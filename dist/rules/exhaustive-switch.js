"use strict";
const tslib_1 = require("tslib");
const _ = (0, tslib_1.__importStar)(require("lodash"));
const utils_1 = require("@typescript-eslint/utils");
const is = (0, tslib_1.__importStar)(require("@skylib/functions/dist/guards"));
const utils = (0, tslib_1.__importStar)(require("./utils"));
const type_parts_1 = require("./utils/type-parts");
const rule = utils.createRule({
    create(context) {
        return {
            [utils_1.AST_NODE_TYPES.SwitchStatement](node) {
                const tests = node.cases.map(switchCase => switchCase.test);
                // eslint-disable-next-line unicorn/no-null
                if (tests.includes(null)) {
                    // Has default
                }
                else {
                    const got = _.flatten(tests
                        .filter(is.not.empty)
                        .map(expression => (0, type_parts_1.getTypeParts)(expression, context)));
                    const expected = type_parts_1.getTypeParts.typeofFix(node.discriminant, context);
                    if (_.difference(expected, got).length)
                        context.report({ messageId: "inexhaustiveSwitch", node });
                }
            }
        };
    },
    isRuleOptions: is.object,
    messages: {
        inexhaustiveSwitch: "Inexhaustive switch"
    }
});
module.exports = rule;
//# sourceMappingURL=exhaustive-switch.js.map