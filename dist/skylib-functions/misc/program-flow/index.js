"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.programFlow = void 0;
const tslib_1 = require("tslib");
const utils = tslib_1.__importStar(require("../../../utils"));
const prefer_clearInterval_1 = require("./prefer-clearInterval");
const prefer_clearTimeout_1 = require("./prefer-clearTimeout");
const prefer_setInterval_1 = require("./prefer-setInterval");
const prefer_setTimeout_1 = require("./prefer-setTimeout");
exports.programFlow = utils.prefixKeys("program-flow/", {
    "prefer-clearInterval": prefer_clearInterval_1.preferClearInterval,
    "prefer-clearTimeout": prefer_clearTimeout_1.preferClearTimeout,
    "prefer-setInterval": prefer_setInterval_1.preferSetInterval,
    "prefer-setTimeout": prefer_setTimeout_1.preferSetTimeout
});
//# sourceMappingURL=index.js.map