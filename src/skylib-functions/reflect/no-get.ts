import * as utils from "../../utils";
import { misc } from "../../misc";

export const noGet = utils.wrapRule(misc["no-restricted-syntax"], [
  {
    message: 'Prefer "o.get" function',
    selector: "CallExpression > .callee[object.name=reflect][property.name=get]"
  }
]);
