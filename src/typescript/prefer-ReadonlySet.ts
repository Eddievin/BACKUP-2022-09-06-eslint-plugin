/* eslint-disable @skylib/consistent-filename -- Ok */

import * as utils from "../utils";
import { core } from "./core";

export const preferReadonlySet = utils.wrapRule(core["restrict-syntax"], [
  {
    message: "Prefer readonly set",
    selector: "TSTypeReference > Identifier[name=Set]"
  }
]);
