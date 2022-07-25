import * as utils from "../../utils";
import { misc } from "../../misc";

export const preferClone = utils.wrapRule(misc["restrict-syntax"], [
  {
    message: 'Prefer "o.clone" function',
    selector: "ObjectExpression[properties.length=1] > SpreadElement"
  }
]);
