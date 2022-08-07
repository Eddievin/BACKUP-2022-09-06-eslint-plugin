"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.noUnnecessaryInitialization = void 0;
const tslib_1 = require("tslib");
const utils = tslib_1.__importStar(require("../utils"));
const core_1 = require("./core");
exports.noUnnecessaryInitialization = utils.wrapRule(core_1.core["no-restricted-syntax"], [
    {
        message: "Unnecessary initialization",
        selector: [
            "PropertyDefinition > Identifier.value[name=undefined]",
            "VariableDeclarator > Identifier.init[name=undefined]"
        ]
    }
]);
//# sourceMappingURL=no-unnecessary-initialization.js.map