"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.preferMTooltip = void 0;
const tslib_1 = require("tslib");
const utils = tslib_1.__importStar(require("../../utils"));
const misc_1 = require("../../misc");
exports.preferMTooltip = utils.wrapRule(misc_1.misc["restrict-syntax"], [
    {
        message: 'Prefer "m-tooltip" component',
        selector: "VElement[name=q-tooltip]"
    }
]);
//# sourceMappingURL=prefer-m-tooltip.js.map