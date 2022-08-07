"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.noEmptyLines = void 0;
const tslib_1 = require("tslib");
const utils = tslib_1.__importStar(require("../utils"));
const misc_1 = require("../misc");
exports.noEmptyLines = utils.wrapRule(misc_1.misc["no-restricted-syntax"], [
    {
        message: "Unexpected empty line",
        selector: "VElement[name=template] VText[value=/^\\n\\s*\\n/u]"
    }
]);
//# sourceMappingURL=no-empty-lines.js.map