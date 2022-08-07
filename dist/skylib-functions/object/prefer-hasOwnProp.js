"use strict";
/* eslint-disable @skylib/consistent-filename -- Ok */
Object.defineProperty(exports, "__esModule", { value: true });
exports.preferHasOwnProp = void 0;
const tslib_1 = require("tslib");
const utils = tslib_1.__importStar(require("../../utils"));
const misc_1 = require("../../misc");
exports.preferHasOwnProp = utils.wrapRule(misc_1.misc["no-restricted-syntax"], [
    {
        message: 'Prefer "o.hasOwnProp" function',
        selector: "CallExpression > .callee[object.object.object.name=Object][object.object.property.name=prototype][object.property.name=hasOwnProperty][property.name=call]"
    }
]);
//# sourceMappingURL=prefer-hasOwnProp.js.map