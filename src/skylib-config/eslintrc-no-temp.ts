import * as utils from "../utils";
import { misc } from "../misc";

export const eslintrcNoTemp = utils.wrapRule(misc["no-restricted-syntax"], [
  {
    message: "Temp configurations",
    selector: "AssignmentExpression > ObjectExpression[properties.length>0]"
  }
]);
