"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.noNegatedConditions = void 0;
const tslib_1 = require("tslib");
const utils = tslib_1.__importStar(require("../utils"));
const core_1 = require("./core");
exports.noNegatedConditions = utils.wrapRule(core_1.core["restrict-syntax"], [
    {
        message: "No negated condition",
        selector: [
            'IfStatement > BinaryExpression[operator="!=="]',
            'IfStatement > LogicalExpression > BinaryExpression.left[operator="!=="]',
            'IfStatement > LogicalExpression > UnaryExpression.left[operator="!"]',
            'IfStatement > UnaryExpression[operator="!"]'
        ]
    }
]);
//# sourceMappingURL=no-negated-conditions.js.map