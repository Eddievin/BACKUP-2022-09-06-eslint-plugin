"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.noAtSignInternalImport = void 0;
const tslib_1 = require("tslib");
const utils = tslib_1.__importStar(require("../utils"));
const core_1 = require("./core");
// eslint-disable-next-line @skylib/max-identifier-blocks -- Ok
exports.noAtSignInternalImport = utils.wrapRule(core_1.core["disallow-import"], [
    { disallow: ["@/**"] }
]);
//# sourceMappingURL=no-at-sign-internal-import.js.map