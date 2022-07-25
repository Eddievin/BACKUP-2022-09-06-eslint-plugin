import * as utils from "../utils";
import { core } from "./core";

export const noAtSignImport = utils.wrapRule(core["disallow-import"], [
  { disallow: ["@"] }
]);
