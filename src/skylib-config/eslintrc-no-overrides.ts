import * as utils from "../utils";
import { misc } from "../misc";

export const eslintrcNoOverrides = utils.wrapRule(
  misc["no-restricted-syntax"],
  [
    {
      message: "Overrides section is disallowed",
      selector: "Property > Identifier.key[name=overrides]"
    }
  ]
);
