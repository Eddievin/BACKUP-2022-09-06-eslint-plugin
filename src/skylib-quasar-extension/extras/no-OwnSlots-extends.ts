/* eslint-disable @skylib/consistent-filename -- Postponed */

import * as utils from "../../utils";
import { misc } from "../../misc";

export const noOwnSlotsExtends = utils.wrapRule(misc["no-restricted-syntax"], [
  {
    message: 'Do not extend "OwnSlots" interface',
    selector:
      "TSInterfaceDeclaration[id.name=OwnSlots] > TSInterfaceHeritage.extends"
  }
]);
