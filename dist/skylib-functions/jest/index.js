"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.jest = void 0;
const tslib_1 = require("tslib");
const utils = tslib_1.__importStar(require("../../utils"));
const prefer_mockCallsToBe_1 = require("./prefer-mockCallsToBe");
exports.jest = utils.prefixKeys("jest/", {
    "prefer-mockCallsToBe": prefer_mockCallsToBe_1.preferMockCallsToBe
});
//# sourceMappingURL=index.js.map