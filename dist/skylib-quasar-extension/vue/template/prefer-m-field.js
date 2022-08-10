"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.preferMField = void 0;
const tslib_1 = require("tslib");
const utils = tslib_1.__importStar(require("../../../utils"));
const misc_1 = require("../../../misc");
exports.preferMField = utils.wrapRule(misc_1.misc["no-restricted-syntax"], [
    { message: 'Prefer "m-field" component', selector: "VElement[name=q-field]" }
]);
//# sourceMappingURL=prefer-m-field.js.map