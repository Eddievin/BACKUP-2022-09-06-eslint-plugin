import * as utils from "../../../utils";
import { misc } from "../../../misc";

export const preferString = utils.wrapRule(misc["no-restricted-syntax"], [
  {
    message: 'Use "cast.string" function instead',
    selector: "CallExpression > .callee[name=String]"
  }
]);
