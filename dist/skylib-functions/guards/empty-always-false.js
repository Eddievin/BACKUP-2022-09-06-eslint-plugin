"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.emptyAlwaysFalse = void 0;
const tslib_1 = require("tslib");
const utils = tslib_1.__importStar(require("../../utils"));
const typescript_1 = require("../../typescript");
exports.emptyAlwaysFalse = utils.wrapRule(typescript_1.typescript["restrict-syntax"], [
    {
        message: "Expecting type to include null, undefined or unknown",
        selector: "CallExpression[callee.object.name=/^(?:as|assert|is)$/u][callee.property.name=empty] > .arguments:first-child",
        typeHasNoneOf: [
            utils.TypeGroup.any,
            utils.TypeGroup.null,
            utils.TypeGroup.undefined,
            utils.TypeGroup.unknown
        ]
    }
]);
//# sourceMappingURL=empty-always-false.js.map