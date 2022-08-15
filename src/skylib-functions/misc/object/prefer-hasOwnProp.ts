/* eslint-disable @skylib/consistent-filename -- Postponed */

import * as utils from "../../../utils";
import { misc } from "../../../misc";

export const preferHasOwnProp = utils.wrapRule(misc["no-restricted-syntax"], [
  {
    message: 'Use "o.hasOwnProp" function instead',
    selector:
      "CallExpression > .callee[object.object.object.name=Object][object.object.property.name=prototype][object.property.name=hasOwnProperty][property.name=call]"
  }
]);
