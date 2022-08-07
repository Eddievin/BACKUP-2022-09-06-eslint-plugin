/* eslint-disable @skylib/consistent-filename -- Ok */

import * as utils from "../../../utils";
import { misc } from "../../../misc";

export const preferSetInterval = utils.wrapRule(misc["no-restricted-syntax"], [
  {
    message: 'Prefer "programFlow.setInterval" function',
    selector: "CallExpression > .callee[name=setInterval]"
  }
]);
