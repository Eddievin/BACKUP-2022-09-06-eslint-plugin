/* eslint-disable @skylib/consistent-filename -- Postponed */

import * as utils from "../utils";
import { core } from "./core";

export const preferReadonlyMap = utils.wrapRule(core["no-restricted-syntax"], [
  {
    message: "Prefer readonly map",
    selector: "TSTypeReference > Identifier[name=Map]"
  }
]);
