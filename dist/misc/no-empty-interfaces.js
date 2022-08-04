"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.noEmptyInterfaces = void 0;
const tslib_1 = require("tslib");
const utils = tslib_1.__importStar(require("../utils"));
const core_1 = require("./core");
exports.noEmptyInterfaces = utils.wrapRule(core_1.core["restrict-syntax"], [
    {
        message: "Empty interface is not allowed",
        selector: "TSInterfaceDeclaration[body.body.length=0][extends=undefined] > .id"
    }
]);
//# sourceMappingURL=no-empty-interfaces.js.map