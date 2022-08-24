"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.noUnderscoreExport = void 0;
const tslib_1 = require("tslib");
const utils = tslib_1.__importStar(require("../utils"));
const core_1 = require("./core");
exports.noUnderscoreExport = utils.wrapRule(core_1.core["no-restricted-syntax"], [
    {
        message: "No underscore exports",
        selector: [
            "ExportNamedDeclaration > :matches(:function, TSDeclareFunction, TSFunctionType, TSMethodSignature) > Identifier.id[name=/^_/u]",
            "ExportNamedDeclaration > VariableDeclaration > VariableDeclarator > Identifier.id[name=/^_/u]"
        ]
    }
]);
//# sourceMappingURL=no-underscore-export.js.map