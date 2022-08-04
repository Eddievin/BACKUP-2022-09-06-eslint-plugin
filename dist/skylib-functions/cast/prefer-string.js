"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.preferString = void 0;
const tslib_1 = require("tslib");
const utils = tslib_1.__importStar(require("../../utils"));
const misc_1 = require("../../misc");
exports.preferString = utils.wrapRule(misc_1.misc["restrict-syntax"], [
    {
        message: 'Prefer "cast.string" function',
        selector: "CallExpression > .callee[name=String]"
    }
]);
//# sourceMappingURL=prefer-string.js.map