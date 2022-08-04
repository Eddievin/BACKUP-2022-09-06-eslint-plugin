"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.preferEvaluate = void 0;
const tslib_1 = require("tslib");
const utils = tslib_1.__importStar(require("../utils"));
const misc_1 = require("../misc");
exports.preferEvaluate = utils.wrapRule(misc_1.misc["restrict-syntax"], [
    {
        message: 'Use "evaluate" instead',
        selector: "CallExpression[arguments.length=0] > ArrowFunctionExpression.callee"
    }
]);
//# sourceMappingURL=prefer-evaluate.js.map