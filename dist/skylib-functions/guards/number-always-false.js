"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.numberAlwaysFalse = void 0;
const tslib_1 = require("tslib");
const utils = tslib_1.__importStar(require("../../utils"));
const typescript_1 = require("../../typescript");
exports.numberAlwaysFalse = utils.wrapRule(typescript_1.typescript["no-restricted-syntax"], [
    {
        message: "Expecting type to include number, unknown",
        selector: "CallExpression[callee.object.name=/^(?:as|assert|is)$/u][callee.property.name=/^(?:number|numberU)$/u] > .arguments:first-child",
        typeHasNoneOf: [
            utils.TypeGroup.any,
            utils.TypeGroup.number,
            utils.TypeGroup.unknown
        ]
    }
]);
//# sourceMappingURL=number-always-false.js.map