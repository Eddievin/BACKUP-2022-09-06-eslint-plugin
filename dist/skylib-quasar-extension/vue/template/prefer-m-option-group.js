"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.preferMOptionGroup = void 0;
const tslib_1 = require("tslib");
const utils = tslib_1.__importStar(require("../../../utils"));
const misc_1 = require("../../../misc");
exports.preferMOptionGroup = utils.wrapRule(misc_1.misc["no-restricted-syntax"], [
    {
        message: 'Prefer "m-option-group" component',
        selector: "VElement[name=q-option-group]"
    }
]);
//# sourceMappingURL=prefer-m-option-group.js.map