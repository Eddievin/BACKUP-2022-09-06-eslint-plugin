"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requirePropTypeParam = void 0;
const tslib_1 = require("tslib");
const utils = tslib_1.__importStar(require("../utils"));
const misc_1 = require("../misc");
exports.requirePropTypeParam = utils.wrapRule(misc_1.misc["no-restricted-syntax"], [
    {
        message: "Missing type parameter",
        selector: [
            "CallExpression[arguments.length=0][typeParameters=undefined] > Identifier.callee[name=prop]",
            "CallExpression[arguments.length=0][typeParameters=undefined] > MemberExpression.callee[object.name=prop][property.name=required]",
            "CallExpression[arguments.length=1][typeParameters=undefined] > MemberExpression.callee[object.name=prop][property.name=default]"
        ]
    }
]);
//# sourceMappingURL=require-prop-type-param.js.map