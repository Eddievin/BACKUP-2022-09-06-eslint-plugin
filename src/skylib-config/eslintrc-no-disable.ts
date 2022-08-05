import * as utils from "../utils";
import { misc } from "../misc";

export const eslintrcNoDisable = utils.wrapRule(misc["no-restricted-syntax"], [
  {
    message: "Do not disable rules",
    selector:
      "Property[key.name=rules] > ObjectExpression > Property > Literal.value[value=off]"
  }
]);
