import * as utils from "../utils";
import { core } from "./core";

export const noAtSignInternalImport = utils.wrapRule(core["disallow-import"], [
  { disallow: ["@/**"] }
]);
