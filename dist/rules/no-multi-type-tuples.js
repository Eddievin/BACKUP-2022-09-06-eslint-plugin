"use strict";
const tslib_1 = require("tslib");
const is = tslib_1.__importStar(require("@skylib/functions/dist/guards"));
const utils_1 = require("@typescript-eslint/utils");
const _ = tslib_1.__importStar(require("lodash"));
const utils = tslib_1.__importStar(require("./utils"));
const rule = utils.createRule({
    create(context) {
        return {
            [utils_1.AST_NODE_TYPES.TSTupleType](node) {
                if (_.uniq(node.elementTypes.map(context.getText)).length > 1)
                    context.report({ messageId: "multiTypeTuplesDisallowed", node });
            }
        };
    },
    isRuleOptions: is.object,
    messages: { multiTypeTuplesDisallowed: "Multi-type tuples are not allowed" },
    name: "no-multi-type-tuples"
});
module.exports = rule;
//# sourceMappingURL=no-multi-type-tuples.js.map