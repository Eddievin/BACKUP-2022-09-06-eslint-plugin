"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.preferMPopupProxy = void 0;
const tslib_1 = require("tslib");
const utils = tslib_1.__importStar(require("../../utils"));
const misc_1 = require("../../misc");
exports.preferMPopupProxy = utils.wrapRule(misc_1.misc["no-restricted-syntax"], [
    {
        message: 'Prefer "m-popup-proxy" component',
        selector: "VElement[name=q-popup-proxy]"
    }
]);
//# sourceMappingURL=prefer-m-popup-proxy.js.map