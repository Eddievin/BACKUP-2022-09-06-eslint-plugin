"use strict";
const tslib_1 = require("tslib");
const is = (0, tslib_1.__importStar)(require("@typerock/functions/dist/guards"));
const core_1 = require("@typerock/functions/dist/types/core");
const no_unnecessary_readonliness_1 = require("./utils/no-unnecessary-readonliness");
const TypeToCheckVO = (0, core_1.createValidationObject)({
    DeepReadonly: "DeepReadonly",
    Readonly: "Readonly"
});
const isTypeToCheck = is.factory(is.enumeration, TypeToCheckVO);
module.exports = (0, no_unnecessary_readonliness_1.createRule)(isTypeToCheck, "allReadonly", "unnecessaryReadonly", 'Unnecessary "Readonly" or "DeepReadonly"');
//# sourceMappingURL=no-unnecessary-readonly.js.map