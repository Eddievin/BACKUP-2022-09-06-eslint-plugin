"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.restrictIdentifierCharacters = void 0;
const tslib_1 = require("tslib");
const utils = tslib_1.__importStar(require("../utils"));
const core_1 = require("./core");
exports.restrictIdentifierCharacters = utils.wrapRule(core_1.core["restrict-syntax"], [
    {
        message: "Identifier must consist of word characters and dollar sign",
        selector: "Identifier[name=/[^$\\w]/u]"
    }
]);
//# sourceMappingURL=restrict-identifier-characters.js.map