"use strict";
/* eslint-disable @skylib/consistent-filename -- Ok */
Object.defineProperty(exports, "__esModule", { value: true });
exports.preferClearInterval = void 0;
const tslib_1 = require("tslib");
const utils = tslib_1.__importStar(require("../../utils"));
const misc_1 = require("../../misc");
exports.preferClearInterval = utils.wrapRule(misc_1.misc["no-restricted-syntax"], [
    {
        message: 'Prefer "programFlow.clearInterval" function',
        selector: "CallExpression > .callee[name=clearInterval]"
    }
]);
//# sourceMappingURL=prefer-clearInterval.js.map