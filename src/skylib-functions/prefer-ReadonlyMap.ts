/* eslint-disable @skylib/consistent-filename -- Ok */

import * as utils from "../utils";
import { misc } from "../misc";

export const preferReadonlyMap = utils.wrapRule(misc["restrict-syntax"], [
  {
    message: 'Prefer "ReadonlyMap"',
    selector: "NewExpression > Identifier.callee[name=Map]"
  }
]);
