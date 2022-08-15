import * as utils from "../../../utils";
import { misc } from "../../../misc";

export const preferClone = utils.wrapRule(misc["no-restricted-syntax"], [
  {
    message: 'Use "a.clone" function instead',
    selector: "ArrayExpression[elements.length=1] > SpreadElement"
  }
]);
