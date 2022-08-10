"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.vue = void 0;
const tslib_1 = require("tslib");
const utils = tslib_1.__importStar(require("../../utils"));
const script_1 = require("./script");
const template_1 = require("./template");
exports.vue = utils.prefixKeys("vue/", Object.assign(Object.assign({}, script_1.script), template_1.template));
//# sourceMappingURL=index.js.map