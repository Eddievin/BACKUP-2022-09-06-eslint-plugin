"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.noTrueType = void 0;
const tslib_1 = require("tslib");
const utils = tslib_1.__importStar(require("../utils"));
const core_1 = require("./core");
exports.noTrueType = utils.wrapRule(core_1.core["no-restricted-syntax"], [
    {
        message: 'Prefer "boolean" type',
        selector: "TSPropertySignature[optional=true] > .typeAnnotation > TSLiteralType.typeAnnotation > .literal[value=true]"
    }
]);
//# sourceMappingURL=no-true-type.js.map