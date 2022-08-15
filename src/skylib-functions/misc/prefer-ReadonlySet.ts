/* eslint-disable @skylib/consistent-filename -- Ok */

import * as utils from "../../utils";
import { misc } from "../../misc";

export const preferReadonlySet = utils.wrapRule(misc["no-restricted-syntax"], [
  {
    message: 'Use "ReadonlySet" instead',
    selector: "NewExpression > Identifier.callee[name=Set]"
  }
]);
