"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.preferMCardSection = void 0;
const tslib_1 = require("tslib");
const utils = tslib_1.__importStar(require("../../../utils"));
const misc_1 = require("../../../misc");
exports.preferMCardSection = utils.wrapRule(misc_1.misc["no-restricted-syntax"], [
    {
        message: 'Prefer "m-card-section" component',
        selector: "VElement[name=q-card-section]"
    }
]);
//# sourceMappingURL=prefer-m-card-section.js.map