"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.noUnnecessaryAsConst = void 0;
const tslib_1 = require("tslib");
const utils = tslib_1.__importStar(require("../utils"));
const core_1 = require("./core");
exports.noUnnecessaryAsConst = utils.wrapRule(core_1.core["restrict-syntax"], [
    {
        message: 'Unnecessary "as const"',
        selector: "VariableDeclarator[id.typeAnnotation] > TSAsExpression > TSTypeReference > Identifier[name=const]"
    }
]);
//# sourceMappingURL=no-unnecessary-as-const.js.map