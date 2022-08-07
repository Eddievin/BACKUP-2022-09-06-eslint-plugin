"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.preferMExpansionItem = void 0;
const tslib_1 = require("tslib");
const utils = tslib_1.__importStar(require("../../utils"));
const misc_1 = require("../../misc");
exports.preferMExpansionItem = utils.wrapRule(misc_1.misc["no-restricted-syntax"], [
    {
        message: 'Prefer "m-expansion-item" component',
        selector: "VElement[name=q-expansion-item]"
    }
]);
//# sourceMappingURL=prefer-m-expansion-item.js.map