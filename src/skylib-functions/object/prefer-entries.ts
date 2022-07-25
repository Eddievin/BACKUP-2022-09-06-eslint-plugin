import * as utils from "../../utils";
import { misc } from "../../misc";

export const preferEntries = utils.wrapRule(misc["restrict-syntax"], [
  {
    message: 'Prefer "o.entries" function',
    selector:
      "CallExpression > .callee[object.name=Object][property.name=entries]"
  }
]);
