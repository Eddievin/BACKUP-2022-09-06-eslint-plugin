"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.preferMInput = void 0;
const tslib_1 = require("tslib");
const utils = tslib_1.__importStar(require("../../../utils"));
const misc_1 = require("../../../misc");
exports.preferMInput = utils.wrapRule(misc_1.misc["no-restricted-syntax"], [
    { message: 'Prefer "m-input" component', selector: "VElement[name=q-input]" }
]);
//# sourceMappingURL=prefer-m-input.js.map