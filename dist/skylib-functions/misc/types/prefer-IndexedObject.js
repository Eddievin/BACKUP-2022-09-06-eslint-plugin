"use strict";
/* eslint-disable @skylib/consistent-filename -- Ok */
Object.defineProperty(exports, "__esModule", { value: true });
exports.preferIndexedObject = void 0;
const tslib_1 = require("tslib");
const utils = tslib_1.__importStar(require("../../../utils"));
const misc_1 = require("../../../misc");
exports.preferIndexedObject = utils.wrapRule(misc_1.misc["no-restricted-syntax"], [
    {
        message: 'Prefer "IndexedObject" type',
        selector: "TSTypeReference[typeName.name=Rec] > .typeParameters > .params:first-child > .typeName[name=PropertyKey]"
    }
]);
//# sourceMappingURL=prefer-IndexedObject.js.map