"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sortCallSignature = void 0;
const tslib_1 = require("tslib");
const utils = tslib_1.__importStar(require("../utils"));
const core_1 = require("./core");
exports.sortCallSignature = utils.wrapRule(core_1.core["restrict-syntax"], [
    {
        message: "Call signature should be first",
        selector: "TSInterfaceBody > TSCallSignatureDeclaration:not(:first-child)"
    }
]);
//# sourceMappingURL=sort-call-signature.js.map