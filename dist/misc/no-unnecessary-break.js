"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.noUnnecessaryBreak = void 0;
const tslib_1 = require("tslib");
const utils = tslib_1.__importStar(require("../utils"));
const core_1 = require("./core");
exports.noUnnecessaryBreak = utils.wrapRule(core_1.core["restrict-syntax"], [
    {
        message: 'Unnecessary "break" statement',
        selector: "SwitchCase:last-child > BreakStatement.consequent"
    }
]);
//# sourceMappingURL=no-unnecessary-break.js.map