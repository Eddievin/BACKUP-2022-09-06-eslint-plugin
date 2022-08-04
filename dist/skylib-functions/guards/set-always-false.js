"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setAlwaysFalse = void 0;
const tslib_1 = require("tslib");
const utils = tslib_1.__importStar(require("../../utils"));
const typescript_1 = require("../../typescript");
exports.setAlwaysFalse = utils.wrapRule(typescript_1.typescript["restrict-syntax"], [
    {
        message: "Expecting type to include object, unknown",
        selector: "CallExpression[callee.object.name=/^(?:as|assert|is)$/u][callee.property.name=set] > .arguments:first-child",
        typeHasNoneOf: [
            utils.TypeGroup.any,
            utils.TypeGroup.object,
            utils.TypeGroup.unknown
        ]
    }
]);
//# sourceMappingURL=set-always-false.js.map