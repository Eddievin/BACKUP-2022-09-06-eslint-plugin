"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTypeParts = exports.Checker = exports.noUnnecessaryReadonliness = void 0;
const tslib_1 = require("tslib");
tslib_1.__exportStar(require("./core"), exports);
exports.noUnnecessaryReadonliness = tslib_1.__importStar(require("./no-unnecessary-readonliness"));
tslib_1.__exportStar(require("./synonyms"), exports);
var Checker_1 = require("./Checker");
Object.defineProperty(exports, "Checker", { enumerable: true, get: function () { return Checker_1.Checker; } });
var type_parts_1 = require("./type-parts");
Object.defineProperty(exports, "getTypeParts", { enumerable: true, get: function () { return type_parts_1.getTypeParts; } });
//# sourceMappingURL=index.js.map