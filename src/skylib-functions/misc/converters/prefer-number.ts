import * as utils from "../../../utils";
import { misc } from "../../../misc";

export const preferNumber = utils.wrapRule(misc["no-restricted-syntax"], [
  {
    message: 'Use "cast.number" function instead',
    selector: "CallExpression > .callee[name=Number]"
  }
]);
