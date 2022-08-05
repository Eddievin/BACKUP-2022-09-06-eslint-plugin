/* eslint-disable @skylib/consistent-filename -- Ok */

import * as utils from "../../utils";
import { misc } from "../../misc";

export const preferGetPrototypeOf = utils.wrapRule(
  misc["no-restricted-syntax"],
  [
    {
      message: 'Prefer "o.getPrototypeOf" function',
      selector:
        "CallExpression > .callee[object.name=Object][property.name=getPrototypeOf]"
    }
  ]
);
