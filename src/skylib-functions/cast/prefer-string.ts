import * as utils from "../../utils";
import { misc } from "../../misc";

export const preferString = utils.wrapRule(misc["restrict-syntax"], [
  {
    message: 'Prefer "cast.string" function',
    selector: "CallExpression > .callee[name=String]"
  }
]);
