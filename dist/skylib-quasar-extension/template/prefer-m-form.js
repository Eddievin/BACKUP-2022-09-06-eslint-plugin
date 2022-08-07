"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.preferMForm = void 0;
const tslib_1 = require("tslib");
const utils = tslib_1.__importStar(require("../../utils"));
const misc_1 = require("../../misc");
exports.preferMForm = utils.wrapRule(misc_1.misc["no-restricted-syntax"], [
    { message: 'Prefer "m-form" component', selector: "VElement[name=q-form]" }
]);
//# sourceMappingURL=prefer-m-form.js.map