"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.noUnsafeObjectAssign = void 0;
const tslib_1 = require("tslib");
const utils = tslib_1.__importStar(require("../utils"));
const core_1 = require("./core");
exports.noUnsafeObjectAssign = utils.wrapRule(core_1.core["no-restricted-syntax"], [
    {
        message: "Do not assign to readonly object",
        selector: "CallExpression[callee.object.name=Object][callee.property.name=assign] > Identifier.arguments",
        typeIs: utils.TypeGroup.readonly
    }
]);
//# sourceMappingURL=no-unsafe-object-assign.js.map