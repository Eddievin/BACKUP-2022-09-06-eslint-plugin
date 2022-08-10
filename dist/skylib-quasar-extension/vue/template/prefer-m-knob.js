"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.preferMKnob = void 0;
const tslib_1 = require("tslib");
const utils = tslib_1.__importStar(require("../../../utils"));
const misc_1 = require("../../../misc");
exports.preferMKnob = utils.wrapRule(misc_1.misc["no-restricted-syntax"], [
    { message: 'Prefer "m-knob" component', selector: "VElement[name=q-knob]" }
]);
//# sourceMappingURL=prefer-m-knob.js.map