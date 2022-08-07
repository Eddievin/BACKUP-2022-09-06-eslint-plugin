"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.preferMSelect = void 0;
const tslib_1 = require("tslib");
const utils = tslib_1.__importStar(require("../../utils"));
const misc_1 = require("../../misc");
exports.preferMSelect = utils.wrapRule(misc_1.misc["no-restricted-syntax"], [
    {
        message: 'Prefer "m-select" component',
        selector: "VElement[name=q-select]"
    }
]);
//# sourceMappingURL=prefer-m-select.js.map