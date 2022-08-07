"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.preferReverse = void 0;
const tslib_1 = require("tslib");
const utils = tslib_1.__importStar(require("../../utils"));
const typescript_1 = require("../../typescript");
exports.preferReverse = utils.wrapRule(typescript_1.typescript["no-restricted-syntax"], [
    {
        message: 'No mutation side-effect, use "a.reverse" instead',
        selector: ".callee[property.name=reverse] > .object",
        typeHas: utils.TypeGroup.array
    }
]);
//# sourceMappingURL=prefer-reverse.js.map