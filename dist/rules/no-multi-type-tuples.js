"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.noMultiTypeTuples = void 0;
const tslib_1 = require("tslib");
const utils = tslib_1.__importStar(require("./utils"));
const functions_1 = require("@skylib/functions");
const _ = tslib_1.__importStar(require("@skylib/lodash-commonjs-es"));
const utils_1 = require("@typescript-eslint/utils");
exports.noMultiTypeTuples = utils.createRule({
    create(context) {
        return {
            [utils_1.AST_NODE_TYPES.TSTupleType](node) {
                if (_.uniq(node.elementTypes.map(context.getText)).length > 1)
                    context.report({ messageId: "multiTypeTuplesDisallowed", node });
            }
        };
    },
    isRuleOptions: functions_1.is.object,
    messages: { multiTypeTuplesDisallowed: "Multi-type tuples are not allowed" },
    name: "no-multi-type-tuples"
});
//# sourceMappingURL=no-multi-type-tuples.js.map