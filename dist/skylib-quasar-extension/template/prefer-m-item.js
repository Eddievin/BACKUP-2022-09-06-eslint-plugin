"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.preferMItem = void 0;
const tslib_1 = require("tslib");
const utils = tslib_1.__importStar(require("../../utils"));
const misc_1 = require("../../misc");
exports.preferMItem = utils.wrapRule(misc_1.misc["no-restricted-syntax"], [
    { message: 'Prefer "m-item" component', selector: "VElement[name=q-item]" }
]);
//# sourceMappingURL=prefer-m-item.js.map