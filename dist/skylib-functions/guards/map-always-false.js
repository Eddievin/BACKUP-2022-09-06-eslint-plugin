"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mapAlwaysFalse = void 0;
const tslib_1 = require("tslib");
const utils = tslib_1.__importStar(require("../../utils"));
const typescript_1 = require("../../typescript");
exports.mapAlwaysFalse = utils.wrapRule(typescript_1.typescript["restrict-syntax"], [
    {
        message: "Expecting type to include object, unknown",
        selector: "CallExpression[callee.object.name=/^(?:as|assert|is)$/u][callee.property.name=map] > .arguments:first-child",
        typeHasNoneOf: [
            utils.TypeGroup.any,
            utils.TypeGroup.object,
            utils.TypeGroup.unknown
        ]
    }
]);
//# sourceMappingURL=map-always-false.js.map