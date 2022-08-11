/* eslint-disable @skylib/consistent-filename -- Postponed */

import * as utils from "../../utils";
import { misc } from "../../misc";

export const checkPropsExtends = utils.wrapRule(misc["no-restricted-syntax"], [
  {
    message: "Incorrect extends",
    selector: [
      "TSInterfaceDeclaration[id.name=Props][extends.length=1] > TSInterfaceHeritage.extends:first-child > Identifier.expression[name!=OwnProps][name!=ParentProps][name!=PluginProps]",
      "TSInterfaceDeclaration[id.name=Props][extends.length=2] > TSInterfaceHeritage.extends:first-child > Identifier.expression[name!=ParentProps][name!=PluginProps]",
      "TSInterfaceDeclaration[id.name=Props][extends.length=2] > TSInterfaceHeritage.extends:nth-child(2) > Identifier.expression[name!=OwnProps][name!=PluginProps]",
      "TSInterfaceDeclaration[id.name=Props][extends.length=3] > TSInterfaceHeritage.extends:first-child > Identifier.expression[name!=ParentProps]",
      "TSInterfaceDeclaration[id.name=Props][extends.length=3] > TSInterfaceHeritage.extends:nth-child(2) > Identifier.expression[name!=PluginProps]",
      "TSInterfaceDeclaration[id.name=Props][extends.length=3] > TSInterfaceHeritage.extends:nth-child(3) > Identifier.expression[name!=OwnProps]",
      "TSInterfaceDeclaration[id.name=Props][extends.length>3]"
    ]
  }
]);
