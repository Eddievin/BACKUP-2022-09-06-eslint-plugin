"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cast = void 0;
const tslib_1 = require("tslib");
const utils = tslib_1.__importStar(require("../../../utils"));
const prefer_number_1 = require("./prefer-number");
const prefer_string_1 = require("./prefer-string");
exports.cast = utils.prefixKeys("converters/", {
    "prefer-number": prefer_number_1.preferNumber,
    "prefer-string": prefer_string_1.preferString
});
//# sourceMappingURL=index.js.map