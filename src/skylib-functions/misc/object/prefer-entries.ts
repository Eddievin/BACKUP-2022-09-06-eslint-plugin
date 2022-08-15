import * as utils from "../../../utils";
import { misc } from "../../../misc";

export const preferEntries = utils.wrapRule(misc["no-restricted-syntax"], [
  {
    message: 'Use "o.entries" function instead',
    selector:
      "CallExpression > .callee[object.name=Object][property.name=entries]"
  }
]);
