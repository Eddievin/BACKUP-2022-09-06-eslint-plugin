"use strict";
/* eslint-disable @skylib/consistent-filename -- Ok */
Object.defineProperty(exports, "__esModule", { value: true });
exports.preferPartialRecord = void 0;
const tslib_1 = require("tslib");
const utils = tslib_1.__importStar(require("../../../utils"));
const misc_1 = require("../../../misc");
exports.preferPartialRecord = utils.wrapRule(misc_1.misc["no-restricted-syntax"], [
    {
        message: 'Prefer "PartialRecord" type',
        selector: "TSTypeReference[typeName.name=Partial] > .typeParameters > .params:first-child > .typeName[name=Rec]"
    }
]);
//# sourceMappingURL=prefer-PartialRecord.js.map