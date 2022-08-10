"use strict";
/* eslint-disable @skylib/consistent-filename -- Ok */
Object.defineProperty(exports, "__esModule", { value: true });
exports.preferClearTimeout = void 0;
const tslib_1 = require("tslib");
const utils = tslib_1.__importStar(require("../../../utils"));
const misc_1 = require("../../../misc");
exports.preferClearTimeout = utils.wrapRule(misc_1.misc["no-restricted-syntax"], [
    {
        message: 'Prefer "programFlow.clearTimeout" function',
        selector: "CallExpression > .callee[name=clearTimeout]"
    }
]);
//# sourceMappingURL=prefer-clearTimeout.js.map