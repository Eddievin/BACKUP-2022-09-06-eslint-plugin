"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.noUnnecessaryReadonly = void 0;
const tslib_1 = require("tslib");
const functions_1 = require("@skylib/functions");
const utils = tslib_1.__importStar(require("./utils"));
exports.noUnnecessaryReadonly = utils.noUnnecessaryReadonliness.createRule("no-unnecessary-readonly", functions_1.fn.run(() => {
    const TypeToCheckVO = (0, functions_1.createValidationObject)({
        DeepReadonly: "DeepReadonly",
        Readonly: "Readonly"
    });
    return functions_1.is.factory(functions_1.is.enumeration, TypeToCheckVO);
}), "allDefinitelyReadonly", "unnecessaryReadonly", 'Unnecessary "Readonly" or "DeepReadonly"');
//# sourceMappingURL=no-unnecessary-readonly.js.map