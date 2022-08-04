"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.symbolAlwaysFalse = void 0;
const tslib_1 = require("tslib");
const utils = tslib_1.__importStar(require("../../utils"));
const typescript_1 = require("../../typescript");
exports.symbolAlwaysFalse = utils.wrapRule(typescript_1.typescript["restrict-syntax"], [
    {
        message: "Unnecessary type guard",
        selector: "CallExpression[callee.object.name=/^(?:as|assert|is)$/u][callee.property.name=/^(?:symbol|symbolU)$/u] > .arguments:first-child",
        typeHasNoneOf: [
            utils.TypeGroup.any,
            utils.TypeGroup.symbol,
            utils.TypeGroup.unknown
        ]
    }
]);
//# sourceMappingURL=symbol-always-false.js.map