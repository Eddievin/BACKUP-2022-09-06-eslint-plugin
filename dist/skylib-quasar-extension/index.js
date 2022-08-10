"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.skylibQuasarExtension = void 0;
const tslib_1 = require("tslib");
const utils = tslib_1.__importStar(require("../utils"));
const extras_1 = require("./extras");
const jest_1 = require("./jest");
const misc_1 = require("./misc");
const vue_1 = require("./vue");
exports.skylibQuasarExtension = {
    extras: utils.prefixKeys("quasar-extension/", extras_1.extras),
    jest: utils.prefixKeys("quasar-extension/", jest_1.jest),
    misc: utils.prefixKeys("quasar-extension/", misc_1.misc),
    vue: utils.prefixKeys("quasar-extension/", vue_1.vue)
};
//# sourceMappingURL=index.js.map