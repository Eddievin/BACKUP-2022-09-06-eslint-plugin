"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.consistentSourceExtension = void 0;
const tslib_1 = require("tslib");
const utils = tslib_1.__importStar(require("../utils"));
const core_1 = require("./core");
exports.consistentSourceExtension = utils.wrapRule(core_1.core["no-restricted-syntax"], [
    {
        message: "Remove extension",
        selector: "Literal.source[value=/\\.(?:js|json|ts)$/u]"
    }
]);
//# sourceMappingURL=consistent-source-extension.js.map