"use strict";
/* eslint-disable @skylib/consistent-filename -- Ok */
Object.defineProperty(exports, "__esModule", { value: true });
exports.indexedObjectAlwaysFalse = void 0;
const tslib_1 = require("tslib");
const utils = tslib_1.__importStar(require("../../../utils"));
const typescript_1 = require("../../../typescript");
exports.indexedObjectAlwaysFalse = utils.wrapRule(typescript_1.typescript["typescript/no-restricted-syntax"], [
    {
        message: "Expecting type to be unknown",
        selector: "CallExpression[callee.object.name=/^(?:as|assert|is)$/u][callee.property.name=/^(?:indexedObject|indexedObjectU)$/u] > .arguments:first-child",
        typeHasNoneOf: [
            utils.TypeGroup.any,
            utils.TypeGroup.object,
            utils.TypeGroup.unknown
        ]
    }
]);
//# sourceMappingURL=indexedObject-always-false.js.map