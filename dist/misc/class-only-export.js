"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.classOnlyExport = void 0;
const tslib_1 = require("tslib");
const utils = tslib_1.__importStar(require("../utils"));
const core_1 = require("./core");
exports.classOnlyExport = utils.wrapRule(core_1.core["prefer-only-export"], [
    { selector: "Program > ExportNamedDeclaration > ClassDeclaration" }
]);
//# sourceMappingURL=class-only-export.js.map