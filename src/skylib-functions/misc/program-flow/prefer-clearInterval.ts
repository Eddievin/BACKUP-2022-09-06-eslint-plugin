/* eslint-disable @skylib/consistent-filename -- Ok */

import * as utils from "../../../utils";
import { misc } from "../../../misc";

export const preferClearInterval = utils.wrapRule(
  misc["no-restricted-syntax"],
  [
    {
      message: 'Use "programFlow.clearInterval" function instead',
      selector: "CallExpression > .callee[name=clearInterval]"
    }
  ]
);
