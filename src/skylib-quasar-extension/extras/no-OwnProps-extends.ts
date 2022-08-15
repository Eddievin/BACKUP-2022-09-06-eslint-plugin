/* eslint-disable @skylib/consistent-filename -- Ok */

import * as utils from "../../utils";
import { misc } from "../../misc";

export const noOwnPropsExtends = utils.wrapRule(misc["no-restricted-syntax"], [
  {
    message: 'No extends in "OwnProps" interface',
    selector:
      "TSInterfaceDeclaration[id.name=OwnProps] > TSInterfaceHeritage.extends"
  }
]);
