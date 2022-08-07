"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.noChainCoalescenceMixture = void 0;
const tslib_1 = require("tslib");
const utils = tslib_1.__importStar(require("../utils"));
const core_1 = require("./core");
exports.noChainCoalescenceMixture = utils.wrapRule(core_1.core["no-restricted-syntax"], [
    {
        message: "Do not mix chain and coalescence operators",
        selector: "LogicalExpression[operator=??][left.type=ChainExpression]"
    }
]);
//# sourceMappingURL=no-chain-coalescence-mixture.js.map