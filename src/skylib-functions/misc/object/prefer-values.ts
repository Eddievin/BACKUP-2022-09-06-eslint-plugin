import * as utils from "../../../utils";
import { misc } from "../../../misc";

export const preferValues = utils.wrapRule(misc["no-restricted-syntax"], [
  {
    message: 'Use "o.values" function instead',
    selector:
      "CallExpression > .callee[object.name=Object][property.name=values]"
  }
]);
