/* eslint-disable @skylib/consistent-filename -- Postponed */

import * as utils from "../../../utils";
import { misc } from "../../../misc";

export const preferGetPrototypeOf = utils.wrapRule(
  misc["no-restricted-syntax"],
  [
    {
      message: 'Use "o.getPrototypeOf" function instead',
      selector:
        "CallExpression > .callee[object.name=Object][property.name=getPrototypeOf]"
    }
  ]
);
