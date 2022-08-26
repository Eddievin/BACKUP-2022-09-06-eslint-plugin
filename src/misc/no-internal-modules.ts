import * as utils from "../utils";
import { core } from "./core";

export const noInternalModules = utils.wrapRule(core["disallow-import"], [
  { allow: "@/**", disallow: ["./*/**", "[^@]*/**", "@*/*/**"] }
]);
