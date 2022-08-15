/* eslint-disable @skylib/consistent-filename -- Ok */

import * as utils from "../../utils";
import { misc } from "../../misc";

export const noOwnSlotsExtends = utils.wrapRule(misc["no-restricted-syntax"], [
  {
    message: 'No extends in "OwnSlots" interface',
    selector:
      "TSInterfaceDeclaration[id.name=OwnSlots] > TSInterfaceHeritage.extends"
  }
]);
