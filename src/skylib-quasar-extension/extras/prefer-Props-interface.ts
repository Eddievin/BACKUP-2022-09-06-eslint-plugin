/* eslint-disable @skylib/consistent-filename -- Postponed */

import * as utils from "../../utils";
import { misc } from "../../misc";

export const preferPropsInterface = utils.wrapRule(
  misc["no-restricted-syntax"],
  [
    {
      message: "Use interface",
      selector: "TSTypeAliasDeclaration > Identifier.id[name=Props]"
    }
  ]
);
