"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.defineFunctionInOneStatement = void 0;
const tslib_1 = require("tslib");
const utils = tslib_1.__importStar(require("../utils"));
const core_1 = require("./core");
exports.defineFunctionInOneStatement = utils.wrapRule(core_1.core["no-restricted-syntax"], [
    {
        message: 'Use "Object.assign" to define function properties in one statement',
        selector: "AssignmentExpression > MemberExpression.left > Identifier.object",
        typeIs: utils.TypeGroup.function
    }
]);
//# sourceMappingURL=define-function-in-one-statement.js.map