import * as utils from "../../../utils";
import { misc } from "../../../misc";

export const noSet = utils.wrapRule(misc["no-restricted-syntax"], [
  {
    ignoreSelector: "CallExpression[callee.name=wrapProxyHandler] *",
    message: 'Use "o.set" function instead',
    selector: "CallExpression > .callee[object.name=reflect][property.name=set]"
  }
]);
