"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.preferMCard = void 0;
const tslib_1 = require("tslib");
const utils = tslib_1.__importStar(require("../../utils"));
const misc_1 = require("../../misc");
exports.preferMCard = utils.wrapRule(misc_1.misc["restrict-syntax"], [
    { message: 'Prefer "m-card" component', selector: "VElement[name=q-card]" }
]);
//# sourceMappingURL=prefer-m-card.js.map