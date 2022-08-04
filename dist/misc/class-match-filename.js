"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.classMatchFilename = void 0;
const tslib_1 = require("tslib");
const utils = tslib_1.__importStar(require("../utils"));
const core_1 = require("./core");
exports.classMatchFilename = utils.wrapRule(core_1.core["match-filename"], [
    {
        format: utils.casing.Format.pascalCase,
        selector: "ClassDeclaration > Identifier.id"
    }
]);
//# sourceMappingURL=class-match-filename.js.map