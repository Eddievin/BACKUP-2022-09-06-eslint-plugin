"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.skylibFunctions = void 0;
const tslib_1 = require("tslib");
const utils = tslib_1.__importStar(require("../utils"));
const jest_1 = require("./jest");
const misc_1 = require("./misc");
exports.skylibFunctions = {
    jest: utils.prefixKeys("functions/", jest_1.jest),
    misc: utils.prefixKeys("functions/", misc_1.misc)
};
//# sourceMappingURL=index.js.map