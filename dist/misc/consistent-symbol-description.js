"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.consistentSymbolDescription = void 0;
const tslib_1 = require("tslib");
const utils = tslib_1.__importStar(require("../utils"));
const core_1 = require("./core");
exports.consistentSymbolDescription = utils.wrapRule(core_1.core["restrict-syntax"], [
    {
        message: "Prefer kebab-case symbol description",
        selector: "CallExpression[callee.name=Symbol] > Literal:not([value=/^(?:[\\d\\-a-z]|__)+$/u])"
    }
]);
//# sourceMappingURL=consistent-symbol-description.js.map