"use strict";
/* eslint-disable @skylib/consistent-filename -- Ok */
Object.defineProperty(exports, "__esModule", { value: true });
exports.preferOwnSlots = void 0;
const tslib_1 = require("tslib");
const utils = tslib_1.__importStar(require("../../utils"));
const misc_1 = require("../../misc");
exports.preferOwnSlots = utils.wrapRule(misc_1.misc["no-restricted-syntax"], [
    {
        message: 'Use "OwnSlots" interface',
        selector: "TSInterfaceDeclaration[id.name=/^(?:Slots|ParentSlots)$/u] > TSInterfaceBody.body > .body"
    }
]);
//# sourceMappingURL=prefer-OwnSlots.js.map