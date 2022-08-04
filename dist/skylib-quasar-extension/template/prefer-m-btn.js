"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.preferMBtn = void 0;
const tslib_1 = require("tslib");
const utils = tslib_1.__importStar(require("../../utils"));
const misc_1 = require("../../misc");
exports.preferMBtn = utils.wrapRule(misc_1.misc["restrict-syntax"], [
    { message: 'Prefer "m-btn" component', selector: "VElement[name=q-btn]" }
]);
//# sourceMappingURL=prefer-m-btn.js.map