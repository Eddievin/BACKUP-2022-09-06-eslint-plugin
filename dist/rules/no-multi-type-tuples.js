"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.noMultiTypeTuples = exports.MessageId = void 0;
const tslib_1 = require("tslib");
const _ = tslib_1.__importStar(require("@skylib/lodash-commonjs-es"));
const utils = tslib_1.__importStar(require("./utils"));
var MessageId;
(function (MessageId) {
    // eslint-disable-next-line @typescript-eslint/no-shadow -- Postponed
    MessageId["noMultiTypeTuples"] = "noMultiTypeTuples";
})(MessageId = exports.MessageId || (exports.MessageId = {}));
exports.noMultiTypeTuples = utils.createRule({
    name: "no-multi-type-tuples",
    messages: {
        [MessageId.noMultiTypeTuples]: "Multi-type tuples are not allowed"
    },
    create: (context) => ({
        TSTupleType: (node) => {
            if (_.uniq(node.elementTypes.map(context.getText)).length > 1)
                context.report({ messageId: MessageId.noMultiTypeTuples, node });
        }
    })
});
//# sourceMappingURL=no-multi-type-tuples.js.map