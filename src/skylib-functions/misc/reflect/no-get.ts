import * as utils from "../../../utils";
import { misc } from "../../../misc";

export const noGet = utils.wrapRule(misc["no-restricted-syntax"], [
  {
    ignoreSelector: "CallExpression[callee.name=wrapProxyHandler] *",
    message: 'Use "o.get" function instead',
    selector: "CallExpression > .callee[object.name=reflect][property.name=get]"
  }
]);
