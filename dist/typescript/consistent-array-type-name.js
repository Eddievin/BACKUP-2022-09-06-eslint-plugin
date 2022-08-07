"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.consistentArrayTypeName = void 0;
const tslib_1 = require("tslib");
const utils = tslib_1.__importStar(require("../utils"));
const core_1 = require("./core");
exports.consistentArrayTypeName = utils.wrapRule(core_1.core["no-restricted-syntax"], [
    {
        message: 'Array type name should end with "s"',
        selector: "TSTypeAliasDeclaration > Identifier[name=/(?<!Array|[^s]s)$/u]",
        typeIs: utils.TypeGroup.array
    }
]);
//# sourceMappingURL=consistent-array-type-name.js.map