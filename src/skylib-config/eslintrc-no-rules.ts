import * as utils from "../utils";
import { misc } from "../misc";

export const eslintrcNoRules = utils.wrapRule(misc["no-restricted-syntax"], [
  {
    message: "Rules section is disallowed",
    selector: "Property > Identifier.key[name=rules]"
  }
]);
