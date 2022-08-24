"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requireJsdoc = void 0;
const tslib_1 = require("tslib");
const utils = tslib_1.__importStar(require("../../utils"));
const misc_1 = require("../../misc");
const prefix = ":matches(ExportNamedDeclaration, Program, TSModuleBlock) > VariableDeclaration > VariableDeclarator[id.typeAnnotation=undefined] > CallExpression[callee.name=defineFn]";
exports.requireJsdoc = utils.wrapRule(misc_1.misc["require-jsdoc"], [
    {
        includeSelectors: [
            `${prefix} > ArrowFunctionExpression`,
            `${prefix} > FunctionExpression`,
            `${prefix} > ObjectExpression > Property > ArrowFunctionExpression`,
            `${prefix} > ObjectExpression > Property > FunctionExpression`
        ],
        noDefaultSelectors: true
    }
]);
//# sourceMappingURL=require-jsdoc.js.map