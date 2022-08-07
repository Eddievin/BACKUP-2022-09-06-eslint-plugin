"use strict";
/* eslint-disable @skylib/consistent-filename -- Ok */
Object.defineProperty(exports, "__esModule", { value: true });
exports.preferMockCallsToBe = void 0;
const tslib_1 = require("tslib");
const utils = tslib_1.__importStar(require("../../utils"));
const misc_1 = require("../../misc");
exports.preferMockCallsToBe = utils.wrapRule(misc_1.misc["no-restricted-syntax"], [
    {
        message: 'Prefer "mockCallsToBe" function',
        selector: [
            "Identifier[name=mockClear]",
            "Identifier[name=toHaveBeenCalled]",
            "Identifier[name=toHaveBeenCalledTimes]",
            "Identifier[name=toHaveBeenCalledWith]"
        ]
    }
]);
//# sourceMappingURL=prefer-mockCallsToBe.js.map