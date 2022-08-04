"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.eslintrcNoOverrides = void 0;
const tslib_1 = require("tslib");
const utils = tslib_1.__importStar(require("../utils"));
const misc_1 = require("../misc");
exports.eslintrcNoOverrides = utils.wrapRule(misc_1.misc["restrict-syntax"], [
    {
        message: "Overrides section is disallowed",
        selector: "Property > Identifier.key[name=overrides]"
    }
]);
//# sourceMappingURL=eslintrc-no-overrides.js.map