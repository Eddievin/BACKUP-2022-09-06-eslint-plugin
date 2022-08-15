import * as utils from "../../../utils";
import { misc } from "../../../misc";

export const preferClone = utils.wrapRule(misc["no-restricted-syntax"], [
  {
    message: 'Use "o.clone" function instead',
    selector: "ObjectExpression[properties.length=1] > SpreadElement"
  }
]);
