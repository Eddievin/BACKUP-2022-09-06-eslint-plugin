"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.noComplexReturnType = void 0;
const tslib_1 = require("tslib");
const utils = tslib_1.__importStar(require("../utils"));
const core_1 = require("./core");
exports.noComplexReturnType = utils.wrapRule(core_1.core["restrict-syntax"], [
    {
        checkReturnType: true,
        message: "Avoid complex return type",
        selector: `:matches(${utils.selectors.function})`,
        typeIs: utils.TypeGroup.complex
    }
]);
//# sourceMappingURL=no-complex-return-type.js.map