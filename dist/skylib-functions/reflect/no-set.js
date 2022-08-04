"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.noSet = void 0;
const tslib_1 = require("tslib");
const utils = tslib_1.__importStar(require("../../utils"));
const misc_1 = require("../../misc");
exports.noSet = utils.wrapRule(misc_1.misc["restrict-syntax"], [
    {
        message: 'Prefer "o.set" function',
        selector: "CallExpression > .callee[object.name=reflect][property.name=set]"
    }
]);
//# sourceMappingURL=no-set.js.map