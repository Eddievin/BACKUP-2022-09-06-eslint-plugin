"use strict";
/* eslint-disable @skylib/consistent-filename -- Ok */
Object.defineProperty(exports, "__esModule", { value: true });
exports.preferDefineFn = void 0;
const tslib_1 = require("tslib");
const utils = tslib_1.__importStar(require("../utils"));
const misc_1 = require("../misc");
exports.preferDefineFn = utils.wrapRule(misc_1.misc["restrict-syntax"], [
    {
        message: 'Use "defineFn" instead',
        selector: ":matches(ExportNamedDeclaration, Program, TSModuleBlock) > VariableDeclaration > VariableDeclarator > CallExpression[callee.object.name=/^(Object|o)$/][callee.property.name=assign]"
    }
]);
//# sourceMappingURL=prefer-defineFn.js.map