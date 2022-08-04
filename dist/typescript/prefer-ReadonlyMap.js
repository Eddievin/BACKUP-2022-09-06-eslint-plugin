"use strict";
/* eslint-disable @skylib/consistent-filename -- Ok */
Object.defineProperty(exports, "__esModule", { value: true });
exports.preferReadonlyMap = void 0;
const tslib_1 = require("tslib");
const utils = tslib_1.__importStar(require("../utils"));
const core_1 = require("./core");
exports.preferReadonlyMap = utils.wrapRule(core_1.core["restrict-syntax"], [
    {
        message: "Prefer readonly map",
        selector: "TSTypeReference > Identifier[name=Map]"
    }
]);
//# sourceMappingURL=prefer-ReadonlyMap.js.map