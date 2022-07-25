import * as utils from "../utils";
import { core } from "./core";

export const noIndexImport = utils.wrapRule(core["disallow-import"], [
  { disallow: ["."] }
]);
