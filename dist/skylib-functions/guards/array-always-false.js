"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.arrayAlwaysFalse = void 0;
const tslib_1 = require("tslib");
const utils = tslib_1.__importStar(require("../../utils"));
const typescript_1 = require("../../typescript");
exports.arrayAlwaysFalse = utils.wrapRule(typescript_1.typescript["no-restricted-syntax"], [
    {
        message: "Expecting type to include array or unknown",
        selector: "CallExpression[callee.object.name=/^(?:as|assert|is)$/u][callee.property.name=/^(?:array|arrayU)$/u] > .arguments:first-child",
        typeHasNoneOf: [
            utils.TypeGroup.any,
            utils.TypeGroup.array,
            utils.TypeGroup.object,
            utils.TypeGroup.unknown
        ]
    }
]);
//# sourceMappingURL=array-always-false.js.map