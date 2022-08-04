"use strict";
/* eslint-disable @skylib/consistent-filename -- Ok */
Object.defineProperty(exports, "__esModule", { value: true });
exports.preferReadonlySet = void 0;
const tslib_1 = require("tslib");
const utils = tslib_1.__importStar(require("../utils"));
const misc_1 = require("../misc");
exports.preferReadonlySet = utils.wrapRule(misc_1.misc["restrict-syntax"], [
    {
        message: 'Prefer "ReadonlySet"',
        selector: "NewExpression > Identifier.callee[name=Set]"
    }
]);
//# sourceMappingURL=prefer-ReadonlySet.js.map