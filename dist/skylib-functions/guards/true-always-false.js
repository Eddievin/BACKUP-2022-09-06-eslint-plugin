"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.trueAlwaysFalse = void 0;
const tslib_1 = require("tslib");
const utils = tslib_1.__importStar(require("../../utils"));
const typescript_1 = require("../../typescript");
exports.trueAlwaysFalse = utils.wrapRule(typescript_1.typescript["restrict-syntax"], [
    {
        message: "Expecting type to include boolean or unknown",
        selector: "CallExpression[callee.object.name=/^(?:as|assert|is)$/u][callee.property.name=true] > .arguments:first-child",
        typeHasNoneOf: [
            utils.TypeGroup.any,
            utils.TypeGroup.boolean,
            utils.TypeGroup.unknown
        ]
    }
]);
//# sourceMappingURL=true-always-false.js.map