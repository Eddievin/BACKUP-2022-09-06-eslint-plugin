import * as utils from "../../../utils";
import { misc } from "../../../misc";

export const preferAssign = utils.wrapRule(misc["no-restricted-syntax"], [
  {
    message: 'Use "o.assign" function instead',
    selector:
      "CallExpression > .callee[object.name=Object][property.name=assign]"
  }
]);
