import * as utils from "../../utils";
import { misc } from "../../misc";

export const preferValues = utils.wrapRule(misc["restrict-syntax"], [
  {
    message: 'Prefer "o.values" function',
    selector:
      "CallExpression > .callee[object.name=Object][property.name=values]"
  }
]);
