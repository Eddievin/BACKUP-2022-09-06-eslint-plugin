"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.preferMCardActions = void 0;
const tslib_1 = require("tslib");
const utils = tslib_1.__importStar(require("../../../utils"));
const misc_1 = require("../../../misc");
exports.preferMCardActions = utils.wrapRule(misc_1.misc["no-restricted-syntax"], [
    {
        message: 'Prefer "m-card-actions" component',
        selector: "VElement[name=q-card-actions]"
    }
]);
//# sourceMappingURL=prefer-m-card-actions.js.map