import * as utils from "../../utils";
import { misc } from "../../misc";

export const preferThird = utils.wrapRule(misc["restrict-syntax"], [
  {
    message: 'Use "a.third" instead',
    selector:
      "CallExpression[callee.object.name=a][callee.property.name=get] > Literal.arguments:nth-child(2)[value=2]"
  }
]);
