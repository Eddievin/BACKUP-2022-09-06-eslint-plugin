import * as utils from "../../utils";
import { misc } from "../../misc";

export const preferAssign = utils.wrapRule(misc["no-restricted-syntax"], [
  {
    message: 'Prefer "o.assign" function',
    selector:
      "CallExpression > .callee[object.name=Object][property.name=assign]"
  }
]);
