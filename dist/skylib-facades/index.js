"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.skylibFacades = void 0;
const tslib_1 = require("tslib");
const utils = tslib_1.__importStar(require("../utils"));
const prefer_uniqueId_facade_1 = require("./prefer-uniqueId-facade");
exports.skylibFacades = utils.prefixKeys("facades/", {
    "prefer-uniqueId-facade": prefer_uniqueId_facade_1.preferUniqueIdFacade
});
//# sourceMappingURL=index.js.map