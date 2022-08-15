import * as utils from "../../../utils";
import { misc } from "../../../misc";

export const noGet = utils.wrapRule(misc["no-restricted-syntax"], [
  {
    message: 'Use "reflect.get" function instead',
    selector:
      "CallExpression[callee.name=wrapProxyHandler] CallExpression > .callee[object.name=o][property.name=get]"
  }
]);
