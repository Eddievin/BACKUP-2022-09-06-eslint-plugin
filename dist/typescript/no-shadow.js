"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.noShadow = void 0;
const tslib_1 = require("tslib");
const utils = tslib_1.__importStar(require("../utils"));
const misc_1 = require("../misc");
exports.noShadow = utils.wrapRule(misc_1.misc.wrap, [
    {
        plugin: "@typescript-eslint/eslint-plugin",
        rule: "no-shadow",
        skip: "TSEnumDeclaration *"
    }
]);
//# sourceMappingURL=no-shadow.js.map