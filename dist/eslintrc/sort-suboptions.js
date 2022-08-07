"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sortSuboptions = void 0;
const tslib_1 = require("tslib");
const utils = tslib_1.__importStar(require("../utils"));
const misc_1 = require("../misc");
exports.sortSuboptions = utils.wrapRule(misc_1.misc["sort-array"], [
    {
        customOrder: ["catch-all"],
        key: "_id",
        selector: "Property[key.value=/@skylib\\u002F/u] > ArrayExpression > ObjectExpression > Property[key.name=/^(?:exclusions|overrides|rules|sources)$/u] > ArrayExpression"
    }
]);
//# sourceMappingURL=sort-suboptions.js.map