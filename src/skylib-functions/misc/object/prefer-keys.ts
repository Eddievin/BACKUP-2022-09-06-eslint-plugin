import * as utils from "../../../utils";
import { misc } from "../../../misc";

export const preferKeys = utils.wrapRule(misc["no-restricted-syntax"], [
  {
    message: 'Use "o.keys" function instead',
    selector: "CallExpression > .callee[object.name=Object][property.name=keys]"
  }
]);
