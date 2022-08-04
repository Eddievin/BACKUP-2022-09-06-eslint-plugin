"use strict";
/* eslint-disable @skylib/consistent-filename -- Ok */
Object.defineProperty(exports, "__esModule", { value: true });
exports.noWritable = void 0;
const tslib_1 = require("tslib");
const utils = tslib_1.__importStar(require("../../utils"));
const misc_1 = require("../../misc");
exports.noWritable = utils.wrapRule(misc_1.misc["restrict-syntax"], [
    {
        message: 'Prefer "Writable..." type',
        selector: [
            "TSTypeReference[typeName.name=Writable] > .typeParameters > .params:first-child > .typeName[name=IndexedObject]",
            "TSTypeReference[typeName.name=Writable] > .typeParameters > .params:first-child > .typeName[name=IndexedRecord]",
            "TSTypeReference[typeName.name=Writable] > .typeParameters > .params:first-child > .typeName[name=PartialRecord]",
            "TSTypeReference[typeName.name=Writable] > .typeParameters > .params:first-child > .typeName[name=Rec]"
        ]
    }
]);
//# sourceMappingURL=no-Writable.js.map