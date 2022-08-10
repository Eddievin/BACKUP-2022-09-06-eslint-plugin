"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.json = void 0;
const tslib_1 = require("tslib");
const utils = tslib_1.__importStar(require("../../../utils"));
const prefer_json_1 = require("./prefer-json");
exports.json = utils.prefixKeys("json/", { "prefer-json": prefer_json_1.preferJson });
//# sourceMappingURL=index.js.map