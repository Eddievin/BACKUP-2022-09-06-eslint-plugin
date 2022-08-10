"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.extras = void 0;
const tslib_1 = require("tslib");
const utils = tslib_1.__importStar(require("../../utils"));
const check_Props_extends_1 = require("./check-Props-extends");
const check_Slots_extends_1 = require("./check-Slots-extends");
const no_empty_interfaces_1 = require("./no-empty-interfaces");
const no_OwnProps_extends_1 = require("./no-OwnProps-extends");
const no_OwnSlots_extends_1 = require("./no-OwnSlots-extends");
const prefer_OwnProps_1 = require("./prefer-OwnProps");
const prefer_OwnSlots_1 = require("./prefer-OwnSlots");
const prefer_Props_interface_1 = require("./prefer-Props-interface");
const prefer_Slots_interface_1 = require("./prefer-Slots-interface");
exports.extras = utils.prefixKeys("extras/", {
    "check-Props-extends": check_Props_extends_1.checkPropsExtends,
    "check-Slots-extends": check_Slots_extends_1.checkSlotsExtends,
    "no-OwnProps-extends": no_OwnProps_extends_1.noOwnPropsExtends,
    "no-OwnSlots-extends": no_OwnSlots_extends_1.noOwnSlotsExtends,
    "no-empty-interfaces": no_empty_interfaces_1.noEmptyInterfaces,
    "prefer-OwnProps": prefer_OwnProps_1.preferOwnProps,
    "prefer-OwnSlots": prefer_OwnSlots_1.preferOwnSlots,
    "prefer-Props-interface": prefer_Props_interface_1.preferPropsInterface,
    "prefer-Slots-interface": prefer_Slots_interface_1.preferSlotsInterface
});
//# sourceMappingURL=index.js.map