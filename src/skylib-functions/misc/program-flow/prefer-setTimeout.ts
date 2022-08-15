/* eslint-disable @skylib/consistent-filename -- Ok */

import * as utils from "../../../utils";
import { misc } from "../../../misc";

export const preferSetTimeout = utils.wrapRule(misc["no-restricted-syntax"], [
  {
    message: 'Use "programFlow.setTimeout" function instead',
    selector: "CallExpression > .callee[name=setTimeout]"
  }
]);
