/* eslint-disable @skylib/consistent-filename -- Ok */

import * as utils from "../../utils";
import { misc } from "../../misc";

export const checkSlotsExtends = utils.wrapRule(misc["restrict-syntax"], [
  {
    message: 'Extend "OwnSlots" or "PluginSlots" interface',
    selector: [
      "TSInterfaceDeclaration[id.name=Slots][extends.length=1] > TSInterfaceHeritage.extends:first-child > Identifier.expression[name!=OwnSlots][name!=ParentSlots][name!=PluginSlots]",
      "TSInterfaceDeclaration[id.name=Slots][extends.length=2] > TSInterfaceHeritage.extends:first-child > Identifier.expression[name!=ParentSlots][name!=PluginSlots]",
      "TSInterfaceDeclaration[id.name=Slots][extends.length=2] > TSInterfaceHeritage.extends:nth-child(2) > Identifier.expression[name!=OwnSlots][name!=PluginSlots]",
      "TSInterfaceDeclaration[id.name=Slots][extends.length=3] > TSInterfaceHeritage.extends:first-child > Identifier.expression[name!=ParentSlots]",
      "TSInterfaceDeclaration[id.name=Slots][extends.length=3] > TSInterfaceHeritage.extends:nth-child(2) > Identifier.expression[name!=PluginSlots]",
      "TSInterfaceDeclaration[id.name=Slots][extends.length=3] > TSInterfaceHeritage.extends:nth-child(3) > Identifier.expression[name!=OwnSlots]",
      "TSInterfaceDeclaration[id.name=Slots][extends.length>3]"
    ]
  }
]);
