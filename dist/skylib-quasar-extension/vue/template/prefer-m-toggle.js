"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.preferMToggle = void 0;
const tslib_1 = require("tslib");
const utils = tslib_1.__importStar(require("../../../utils"));
const misc_1 = require("../../../misc");
exports.preferMToggle = utils.wrapRule(misc_1.misc["no-restricted-syntax"], [
    {
        message: 'Prefer "m-toggle" component',
        selector: "VElement[name=q-toggle]"
    }
]);
//# sourceMappingURL=prefer-m-toggle.js.map