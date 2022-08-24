"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.eslintrc = void 0;
const functions_1 = require("@skylib/functions");
const sort_array_1 = require("./sort-array");
const sort_suboptions_1 = require("./sort-suboptions");
exports.eslintrc = functions_1.o.prefixKeys({ "sort-array": sort_array_1.sortArray, "sort-suboptions": sort_suboptions_1.sortSuboptions }, "eslintrc/");
//# sourceMappingURL=index.js.map