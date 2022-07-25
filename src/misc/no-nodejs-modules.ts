import * as utils from "../utils";
import { core } from "./core";

export const noNodejsModules = utils.wrapRule(core["disallow-import"], [
  { disallow: ["node:*"] }
]);
