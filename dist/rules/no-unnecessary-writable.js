"use strict";
const tslib_1 = require("tslib");
const is = tslib_1.__importStar(require("@skylib/functions/dist/guards"));
const core_1 = require("@skylib/functions/dist/types/core");
const no_unnecessary_readonliness_1 = require("./utils/no-unnecessary-readonliness");
const TypeToCheckVO = (0, core_1.createValidationObject)({
    DeepWritable: "DeepWritable",
    Writable: "Writable"
});
const isTypeToCheck = is.factory(is.enumeration, TypeToCheckVO);
module.exports = (0, no_unnecessary_readonliness_1.createRule)(isTypeToCheck, "allDefinitelyWritable", "unnecessaryWritable", 'Unnecessary "Writable" or "DeepWritable"');
//# sourceMappingURL=no-unnecessary-writable.js.map