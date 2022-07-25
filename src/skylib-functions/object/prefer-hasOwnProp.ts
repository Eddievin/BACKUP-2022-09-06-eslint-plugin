/* eslint-disable @skylib/consistent-filename -- Ok */

import * as utils from "../../utils";
import { misc } from "../../misc";

export const preferHasOwnProp = utils.wrapRule(misc["restrict-syntax"], [
  {
    message: 'Prefer "o.hasOwnProp" function',
    selector:
      "CallExpression > .callee[object.object.object.name=Object][object.object.property.name=prototype][object.property.name=hasOwnProperty][property.name=call]"
  }
]);
