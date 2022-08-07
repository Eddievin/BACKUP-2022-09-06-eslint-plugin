"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.preferConstRequire = void 0;
const tslib_1 = require("tslib");
const utils = tslib_1.__importStar(require("../utils"));
const core_1 = require("./core");
exports.preferConstRequire = utils.wrapRule(core_1.core["no-restricted-syntax"], [
    {
        message: 'Assign "require" to const',
        selector: ":not(ReturnStatement, VariableDeclarator) > CallExpression > Identifier.callee[name=require]"
    }
]);
//# sourceMappingURL=prefer-const-require.js.map