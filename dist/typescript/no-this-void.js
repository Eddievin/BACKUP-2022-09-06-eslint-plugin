"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.noThisVoid = void 0;
const tslib_1 = require("tslib");
const utils = tslib_1.__importStar(require("../utils"));
const core_1 = require("./core");
exports.noThisVoid = utils.wrapRule(core_1.core["restrict-syntax"], [
    {
        message: 'Use arrow function instead of "this: void"',
        selector: "Identifier[name=this][typeAnnotation.typeAnnotation.type=TSVoidKeyword]"
    }
]);
//# sourceMappingURL=no-this-void.js.map