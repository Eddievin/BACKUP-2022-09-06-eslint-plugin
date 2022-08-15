/* eslint-disable @skylib/consistent-filename -- Ok */

import * as utils from "../../utils";
import { misc } from "../../misc";

export const preferOwnProps = utils.wrapRule(misc["no-restricted-syntax"], [
  {
    message: 'Use "OwnProps" interface',
    selector:
      "TSInterfaceDeclaration[id.name=/^(?:Props|ParentProps)$/u] > TSInterfaceBody.body[body.length>0]"
  }
]);
