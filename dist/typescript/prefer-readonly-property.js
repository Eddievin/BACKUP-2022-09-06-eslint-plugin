"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.preferReadonlyProperty = void 0;
const tslib_1 = require("tslib");
const utils = tslib_1.__importStar(require("../utils"));
const core_1 = require("./core");
exports.preferReadonlyProperty = utils.wrapRule(core_1.core["no-restricted-syntax"], [
    {
        message: "Prefer readonly property",
        selector: `:matches(${utils.selectors.property})[readonly!=true]`
    }
]);
//# sourceMappingURL=prefer-readonly-property.js.map