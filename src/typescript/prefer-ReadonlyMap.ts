/* eslint-disable @skylib/consistent-filename -- Ok */

import * as utils from "../utils";
import { core } from "./core";

export const preferReadonlyMap = utils.wrapRule(core["restrict-syntax"], [
  {
    message: "Prefer readonly map",
    selector: "TSTypeReference > Identifier[name=Map]"
  }
]);
