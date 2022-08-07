import * as utils from "../../../utils";
import { misc } from "../../../misc";

export const preferKeys = utils.wrapRule(misc["no-restricted-syntax"], [
  {
    message: 'Prefer "o.keys" function',
    selector: "CallExpression > .callee[object.name=Object][property.name=keys]"
  }
]);
