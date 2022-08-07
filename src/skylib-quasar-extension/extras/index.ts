import * as utils from "../../utils";
import { checkPropsExtends } from "./check-Props-extends";
import { checkSlotsExtends } from "./check-Slots-extends";
import { noEmptyInterfaces } from "./no-empty-interfaces";
import { noOwnPropsExtends } from "./no-OwnProps-extends";
import { noOwnSlotsExtends } from "./no-OwnSlots-extends";
import { preferOwnProps } from "./prefer-OwnProps";
import { preferOwnSlots } from "./prefer-OwnSlots";
import { preferPropsInterface } from "./prefer-Props-interface";
import { preferSlotsInterface } from "./prefer-Slots-interface";

export const extras = utils.prefixKeys("extras/", {
  "check-Props-extends": checkPropsExtends,
  "check-Slots-extends": checkSlotsExtends,
  "no-OwnProps-extends": noOwnPropsExtends,
  "no-OwnSlots-extends": noOwnSlotsExtends,
  "no-empty-interfaces": noEmptyInterfaces,
  "prefer-OwnProps": preferOwnProps,
  "prefer-OwnSlots": preferOwnSlots,
  "prefer-Props-interface": preferPropsInterface,
  "prefer-Slots-interface": preferSlotsInterface
});
