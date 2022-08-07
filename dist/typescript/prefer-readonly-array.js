"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.preferReadonlyArray = void 0;
const tslib_1 = require("tslib");
const utils = tslib_1.__importStar(require("../utils"));
const core_1 = require("./core");
exports.preferReadonlyArray = utils.wrapRule(core_1.core["no-restricted-syntax"], [
    {
        message: "Prefer readonly array",
        selector: [
            `:not(TSTypeOperator[operator=readonly]) > :matches(${utils.selectors.arrayType})`,
            "TSTypeReference > Identifier[name=Array]"
        ]
    }
]);
//# sourceMappingURL=prefer-readonly-array.js.map