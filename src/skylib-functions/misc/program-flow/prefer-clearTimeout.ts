/* eslint-disable @skylib/consistent-filename -- Postponed */

import * as utils from "../../../utils";
import { misc } from "../../../misc";

export const preferClearTimeout = utils.wrapRule(misc["no-restricted-syntax"], [
  {
    message: 'Prefer "programFlow.clearTimeout" function',
    selector: "CallExpression > .callee[name=clearTimeout]"
  }
]);
