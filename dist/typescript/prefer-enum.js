"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.preferEnum = void 0;
const tslib_1 = require("tslib");
const utils = tslib_1.__importStar(require("../utils"));
const core_1 = require("./core");
exports.preferEnum = utils.wrapRule(core_1.core["no-restricted-syntax"], [
    {
        message: "Use enum instead",
        selector: "TSTypeAliasDeclaration > TSUnionType > TSLiteralType:first-child",
        typeIs: utils.TypeGroup.string
    }
]);
//# sourceMappingURL=prefer-enum.js.map