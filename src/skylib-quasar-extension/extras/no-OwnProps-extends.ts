/* eslint-disable @skylib/consistent-filename -- Postponed */

import * as utils from "../../utils";
import { misc } from "../../misc";

export const noOwnPropsExtends = utils.wrapRule(misc["no-restricted-syntax"], [
  {
    message: 'Do not extend "OwnProps" interface',
    selector:
      "TSInterfaceDeclaration[id.name=OwnProps] > TSInterfaceHeritage.extends"
  }
]);
