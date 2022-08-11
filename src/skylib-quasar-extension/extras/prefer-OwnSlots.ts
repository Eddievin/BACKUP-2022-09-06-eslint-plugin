/* eslint-disable @skylib/consistent-filename -- Postponed */

import * as utils from "../../utils";
import { misc } from "../../misc";

export const preferOwnSlots = utils.wrapRule(misc["no-restricted-syntax"], [
  {
    message: 'Use "OwnSlots" interface',
    selector:
      "TSInterfaceDeclaration[id.name=/^(?:Slots|ParentSlots)$/u] > TSInterfaceBody.body > .body"
  }
]);
