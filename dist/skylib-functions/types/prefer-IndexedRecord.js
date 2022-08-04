"use strict";
/* eslint-disable @skylib/consistent-filename -- Ok */
Object.defineProperty(exports, "__esModule", { value: true });
exports.preferIndexedRecord = void 0;
const tslib_1 = require("tslib");
const utils = tslib_1.__importStar(require("../../utils"));
const misc_1 = require("../../misc");
exports.preferIndexedRecord = utils.wrapRule(misc_1.misc["restrict-syntax"], [
    {
        message: 'Prefer "IndexedRecord" type',
        selector: "TSTypeReference[typeName.name=Rec] > .typeParameters > TSStringKeyword.params:first-child"
    }
]);
//# sourceMappingURL=prefer-IndexedRecord.js.map