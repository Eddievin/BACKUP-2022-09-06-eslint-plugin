"use strict";
/* eslint-disable @skylib/consistent-filename -- Ok */
Object.defineProperty(exports, "__esModule", { value: true });
exports.preferWritableIndexedObject = void 0;
const tslib_1 = require("tslib");
const utils = tslib_1.__importStar(require("../../utils"));
const misc_1 = require("../../misc");
exports.preferWritableIndexedObject = utils.wrapRule(misc_1.misc["no-restricted-syntax"], [
    {
        message: 'Prefer "WritableIndexedObject" type',
        selector: "TSTypeReference[typeName.name=WritableRecord] > .typeParameters > .params:first-child > .typeName[name=PropertyKey]"
    }
]);
//# sourceMappingURL=prefer-WritableIndexedObject.js.map