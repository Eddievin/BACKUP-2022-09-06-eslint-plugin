"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.preferMMenu = void 0;
const tslib_1 = require("tslib");
const utils = tslib_1.__importStar(require("../../utils"));
const misc_1 = require("../../misc");
exports.preferMMenu = utils.wrapRule(misc_1.misc["no-restricted-syntax"], [
    { message: 'Prefer "m-menu" component', selector: "VElement[name=q-menu]" }
]);
//# sourceMappingURL=prefer-m-menu.js.map