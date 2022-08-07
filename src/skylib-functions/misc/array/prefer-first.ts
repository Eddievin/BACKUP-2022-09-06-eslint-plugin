import * as utils from "../../../utils";
import { misc } from "../../../misc";

export const preferFirst = utils.wrapRule(misc["no-restricted-syntax"], [
  {
    message: 'Use "a.first" instead',
    selector:
      "CallExpression[callee.object.name=a][callee.property.name=get] > Literal.arguments:nth-child(2)[value=0]"
  }
]);
