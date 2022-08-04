"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.preferClone = void 0;
const tslib_1 = require("tslib");
const utils = tslib_1.__importStar(require("../../utils"));
const misc_1 = require("../../misc");
exports.preferClone = utils.wrapRule(misc_1.misc["restrict-syntax"], [
    {
        message: 'Prefer "o.clone" function',
        selector: "ObjectExpression[properties.length=1] > SpreadElement"
    }
]);
//# sourceMappingURL=prefer-clone.js.map