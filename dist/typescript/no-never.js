"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.noNever = void 0;
const tslib_1 = require("tslib");
const utils = tslib_1.__importStar(require("../utils"));
const core_1 = require("./core");
exports.noNever = utils.wrapRule(core_1.core["no-restricted-syntax"], [
    {
        message: 'Avoid "never" type',
        selector: "Identifier",
        typeIs: utils.TypeGroup.never
    }
]);
//# sourceMappingURL=no-never.js.map