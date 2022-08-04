"use strict";
/* eslint-disable @skylib/consistent-filename -- Ok */
Object.defineProperty(exports, "__esModule", { value: true });
exports.requireReturnInDefineFn = void 0;
const tslib_1 = require("tslib");
const utils = tslib_1.__importStar(require("../utils"));
const misc_1 = require("../misc");
exports.requireReturnInDefineFn = utils.wrapRule(misc_1.misc["restrict-syntax"], [
    {
        message: "Missing return type on function",
        selector: [
            "ArrowFunctionExpression[returnType=undefined]",
            "FunctionExpression[returnType=undefined]",
            "ObjectExpression > Property > ArrowFunctionExpression[returnType=undefined]",
            "ObjectExpression > Property > FunctionExpression[returnType=undefined]"
        ].map(selector => `:matches(ExportNamedDeclaration, Program, TSModuleBlock) > VariableDeclaration > VariableDeclarator[id.typeAnnotation=undefined] > CallExpression[callee.name=defineFn] > ${selector}`)
    }
]);
//# sourceMappingURL=require-return-in-defineFn.js.map