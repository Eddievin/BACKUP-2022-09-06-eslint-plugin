"use strict";
/* eslint-disable @skylib/consistent-filename -- Ok */
Object.defineProperty(exports, "__esModule", { value: true });
exports.preferReadonlyMap = void 0;
const tslib_1 = require("tslib");
const utils = tslib_1.__importStar(require("../utils"));
const misc_1 = require("../misc");
exports.preferReadonlyMap = utils.wrapRule(misc_1.misc["no-restricted-syntax"], [
    {
        message: 'Prefer "ReadonlyMap"',
        selector: "NewExpression > Identifier.callee[name=Map]"
    }
]);
//# sourceMappingURL=prefer-ReadonlyMap.js.map