"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.preferNumber = void 0;
const tslib_1 = require("tslib");
const utils = tslib_1.__importStar(require("../../utils"));
const misc_1 = require("../../misc");
exports.preferNumber = utils.wrapRule(misc_1.misc["restrict-syntax"], [
    {
        message: 'Prefer "cast.number" function',
        selector: "CallExpression > .callee[name=Number]"
    }
]);
//# sourceMappingURL=prefer-number.js.map