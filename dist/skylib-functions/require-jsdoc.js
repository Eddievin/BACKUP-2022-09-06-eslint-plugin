"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requireJsdoc = void 0;
const tslib_1 = require("tslib");
const utils = tslib_1.__importStar(require("../utils"));
const misc_1 = require("../misc");
exports.requireJsdoc = utils.wrapRule(misc_1.misc["require-jsdoc"], [
    {
        includeSelectors: [
            "ArrowFunctionExpression",
            "FunctionExpression",
            "ObjectExpression > Property > ArrowFunctionExpression",
            "ObjectExpression > Property > FunctionExpression"
        ].map(selector => `:matches(ExportNamedDeclaration, Program, TSModuleBlock) > VariableDeclaration > VariableDeclarator[id.typeAnnotation=undefined] > CallExpression[callee.name=defineFn] > ${selector}`),
        noDefaultSelectors: true
    }
]);
//# sourceMappingURL=require-jsdoc.js.map