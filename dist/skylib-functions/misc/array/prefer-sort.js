"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.preferSort = void 0;
const tslib_1 = require("tslib");
const utils = tslib_1.__importStar(require("../../../utils"));
const typescript_1 = require("../../../typescript");
exports.preferSort = utils.wrapRule(typescript_1.typescript["typescript/no-restricted-syntax"], [
    {
        message: 'No mutation side-effect, use "a.sort" instead',
        selector: ".callee[property.name=sort] > .object",
        typeHas: utils.TypeGroup.array
    }
]);
//# sourceMappingURL=prefer-sort.js.map