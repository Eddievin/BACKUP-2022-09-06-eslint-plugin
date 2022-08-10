"use strict";
/* eslint-disable @skylib/consistent-filename -- Ok */
Object.defineProperty(exports, "__esModule", { value: true });
exports.preferDefineProperty = void 0;
const tslib_1 = require("tslib");
const utils = tslib_1.__importStar(require("../../../utils"));
const misc_1 = require("../../../misc");
exports.preferDefineProperty = utils.wrapRule(misc_1.misc["no-restricted-syntax"], [
    {
        message: 'Prefer "o.defineProperty" function',
        selector: ":matches(ExportNamedDeclaration, Program, TSModuleBlock) > VariableDeclaration > VariableDeclarator > CallExpression[callee.object.name=o][callee.property.name=/^(?:assign|extend)$/u]"
    }
]);
//# sourceMappingURL=prefer-defineProperty.js.map