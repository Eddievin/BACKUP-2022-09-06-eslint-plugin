"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sortConstructSignature = void 0;
const tslib_1 = require("tslib");
const utils = tslib_1.__importStar(require("../utils"));
const core_1 = require("./core");
exports.sortConstructSignature = utils.wrapRule(core_1.core["restrict-syntax"], [
    {
        message: "Construct signature should be first",
        selector: "TSInterfaceBody > TSConstructSignatureDeclaration:not(:first-child)"
    }
]);
//# sourceMappingURL=sort-construct-signature.js.map