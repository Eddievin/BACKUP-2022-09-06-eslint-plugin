"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.eslintrc = void 0;
const tslib_1 = require("tslib");
const utils = tslib_1.__importStar(require("../utils"));
const sort_array_1 = require("./sort-array");
const sort_suboptions_1 = require("./sort-suboptions");
exports.eslintrc = utils.prefixKeys("eslintrc/", {
    "sort-array": sort_array_1.sortArray,
    "sort-suboptions": sort_suboptions_1.sortSuboptions
});
//# sourceMappingURL=index.js.map