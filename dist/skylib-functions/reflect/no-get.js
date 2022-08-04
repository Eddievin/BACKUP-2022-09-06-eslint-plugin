"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.noGet = void 0;
const tslib_1 = require("tslib");
const utils = tslib_1.__importStar(require("../../utils"));
const misc_1 = require("../../misc");
exports.noGet = utils.wrapRule(misc_1.misc["restrict-syntax"], [
    {
        message: 'Prefer "o.get" function',
        selector: "CallExpression > .callee[object.name=reflect][property.name=get]"
    }
]);
//# sourceMappingURL=no-get.js.map