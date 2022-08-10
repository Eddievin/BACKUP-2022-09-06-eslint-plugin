"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.object = void 0;
const tslib_1 = require("tslib");
const utils = tslib_1.__importStar(require("../../../utils"));
const no_unfreeze_1 = require("./no-unfreeze");
const prefer_assign_1 = require("./prefer-assign");
const prefer_clone_1 = require("./prefer-clone");
const prefer_defineProperty_1 = require("./prefer-defineProperty");
const prefer_entries_1 = require("./prefer-entries");
const prefer_getPrototypeOf_1 = require("./prefer-getPrototypeOf");
const prefer_hasOwnProp_1 = require("./prefer-hasOwnProp");
const prefer_keys_1 = require("./prefer-keys");
const prefer_values_1 = require("./prefer-values");
exports.object = utils.prefixKeys("object/", {
    "no-unfreeze": no_unfreeze_1.noUnfreeze,
    "prefer-assign": prefer_assign_1.preferAssign,
    "prefer-clone": prefer_clone_1.preferClone,
    "prefer-defineProperty": prefer_defineProperty_1.preferDefineProperty,
    "prefer-entries": prefer_entries_1.preferEntries,
    "prefer-getPrototypeOf": prefer_getPrototypeOf_1.preferGetPrototypeOf,
    "prefer-hasOwnProp": prefer_hasOwnProp_1.preferHasOwnProp,
    "prefer-keys": prefer_keys_1.preferKeys,
    "prefer-values": prefer_values_1.preferValues
});
//# sourceMappingURL=index.js.map