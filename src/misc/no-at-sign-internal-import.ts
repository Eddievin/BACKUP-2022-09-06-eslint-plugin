import * as utils from "../utils";
import { core } from "./core";

// eslint-disable-next-line @skylib/max-identifier-blocks -- Postponed
export const noAtSignInternalImport = utils.wrapRule(core["disallow-import"], [
  { disallow: ["@/**"] }
]);
