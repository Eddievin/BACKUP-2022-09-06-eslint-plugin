import * as utils from "../../../utils";
import { misc } from "../../../misc";

export const noSet = utils.wrapRule(misc["no-restricted-syntax"], [
  {
    message: 'Prefer "o.set" function',
    selector: "CallExpression > .callee[object.name=reflect][property.name=set]"
  }
]);
