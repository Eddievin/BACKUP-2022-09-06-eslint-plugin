"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.jest = void 0;
const tslib_1 = require("tslib");
const utils = tslib_1.__importStar(require("../../utils"));
const prefer_findQuasarComponent_1 = require("./prefer-findQuasarComponent");
const prefer_testComponents_1 = require("./prefer-testComponents");
exports.jest = utils.prefixKeys("jest/", {
    "prefer-findQuasarComponent": prefer_findQuasarComponent_1.preferFindQuasarComponent,
    "prefer-testComponents": prefer_testComponents_1.preferTestComponents
});
//# sourceMappingURL=index.js.map