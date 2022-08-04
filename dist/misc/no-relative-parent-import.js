"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.noRelativeParentImport = void 0;
const tslib_1 = require("tslib");
const utils = tslib_1.__importStar(require("../utils"));
const core_1 = require("./core");
exports.noRelativeParentImport = utils.wrapRule(core_1.core["disallow-import"], [
    {
        disallow: [
            "../**",
            "../../**",
            "../../../**",
            "../../../../**",
            "../../../../../**"
        ]
    }
]);
//# sourceMappingURL=no-relative-parent-import.js.map