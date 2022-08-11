/* eslint-disable @skylib/consistent-filename -- Postponed */

import * as utils from "../utils";
import { core } from "./core";

export const preferReadonlySet = utils.wrapRule(core["no-restricted-syntax"], [
  {
    message: "Prefer readonly set",
    selector: "TSTypeReference > Identifier[name=Set]"
  }
]);
