"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.preferArrowFunctionProperty = void 0;
const tslib_1 = require("tslib");
const utils = tslib_1.__importStar(require("../utils"));
const core_1 = require("./core");
exports.preferArrowFunctionProperty = utils.wrapRule(core_1.core["restrict-syntax"], [
    {
        message: "Prefer arrow function",
        selector: "Property > FunctionExpression.value"
    }
]);
//# sourceMappingURL=prefer-arrow-function-property.js.map