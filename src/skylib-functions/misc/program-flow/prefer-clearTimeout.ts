/* eslint-disable @skylib/consistent-filename -- Ok */

import * as utils from "../../../utils";
import { misc } from "../../../misc";

export const preferClearTimeout = utils.wrapRule(misc["no-restricted-syntax"], [
  {
    message: 'Use "programFlow.clearTimeout" function instead',
    selector: "CallExpression > .callee[name=clearTimeout]"
  }
]);
