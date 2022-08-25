"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.maxIdentifierBlocks = void 0;
const tslib_1 = require("tslib");
const utils = tslib_1.__importStar(require("../utils"));
const core_1 = require("./core");
const functions_1 = require("@skylib/functions");
exports.maxIdentifierBlocks = (0, functions_1.evaluate)(() => {
    const suffix = "[name=/^[A-Z]*[^A-Z]+([A-Z]+[^A-Z]+){4}/u]";
    return utils.wrapRule(core_1.core["no-restricted-syntax"], [
        {
            message: "Identifier should not contain more than 4 blocks",
            selector: [`.id${suffix}`, `.key${suffix}`]
        }
    ]);
});
//# sourceMappingURL=max-identifier-blocks.js.map