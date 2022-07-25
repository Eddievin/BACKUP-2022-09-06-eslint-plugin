/* eslint-disable @skylib/consistent-filename -- Ok */

import * as utils from "../../utils";
import { misc } from "../../misc";

export const preferClearTimeout = utils.wrapRule(misc["restrict-syntax"], [
  {
    message: 'Prefer "programFlow.clearTimeout" function',
    selector: "CallExpression > .callee[name=clearTimeout]"
  }
]);
