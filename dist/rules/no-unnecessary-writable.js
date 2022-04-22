"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.noUnnecessaryWritable = void 0;
const tslib_1 = require("tslib");
const functions_1 = require("@skylib/functions");
const utils = tslib_1.__importStar(require("./utils"));
exports.noUnnecessaryWritable = utils.noUnnecessaryReadonliness.createRule("no-unnecessary-writable", functions_1.fn.run(() => {
    const TypeToCheckVO = (0, functions_1.createValidationObject)({
        DeepWritable: "DeepWritable",
        Writable: "Writable"
    });
    return functions_1.is.factory(functions_1.is.enumeration, TypeToCheckVO);
}), "allDefinitelyWritable", "unnecessaryWritable", 'Unnecessary "Writable" or "DeepWritable"');
//# sourceMappingURL=no-unnecessary-writable.js.map