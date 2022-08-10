"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.reflect = void 0;
const tslib_1 = require("tslib");
const utils = tslib_1.__importStar(require("../../../utils"));
const no_get_1 = require("./no-get");
const no_set_1 = require("./no-set");
const prefer_reflect_1 = require("./prefer-reflect");
exports.reflect = utils.prefixKeys("reflect/", {
    "no-get": no_get_1.noGet,
    "no-set": no_set_1.noSet,
    "prefer-reflect": prefer_reflect_1.preferReflect
});
//# sourceMappingURL=index.js.map