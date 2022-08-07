"use strict";
/* eslint-disable @skylib/consistent-filename -- Ok */
Object.defineProperty(exports, "__esModule", { value: true });
exports.preferSlotsInterface = void 0;
const tslib_1 = require("tslib");
const utils = tslib_1.__importStar(require("../../utils"));
const misc_1 = require("../../misc");
exports.preferSlotsInterface = utils.wrapRule(misc_1.misc["no-restricted-syntax"], [
    {
        message: "Use interface",
        selector: "TSTypeAliasDeclaration > Identifier.id[name=Slots]"
    }
]);
//# sourceMappingURL=prefer-Slots-interface.js.map