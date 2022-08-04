"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.preferArrowStaticMethod = void 0;
const tslib_1 = require("tslib");
const utils = tslib_1.__importStar(require("../utils"));
const core_1 = require("./core");
exports.preferArrowStaticMethod = utils.wrapRule(core_1.core["restrict-syntax"], [
    {
        message: "Prefer arrow function",
        selector: `:matches(${utils.selectors.method})[static=true]`
    }
]);
//# sourceMappingURL=prefer-arrow-static-method.js.map