"use strict";
/* eslint-disable @skylib/consistent-filename -- Postponed */
Object.defineProperty(exports, "__esModule", { value: true });
exports.preferGetPrototypeOf = void 0;
const tslib_1 = require("tslib");
const utils = tslib_1.__importStar(require("../../../utils"));
const misc_1 = require("../../../misc");
exports.preferGetPrototypeOf = utils.wrapRule(misc_1.misc["no-restricted-syntax"], [
    {
        message: 'Use "o.getPrototypeOf" function instead',
        selector: "CallExpression > .callee[object.name=Object][property.name=getPrototypeOf]"
    }
]);
//# sourceMappingURL=prefer-getPrototypeOf.js.map