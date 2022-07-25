import * as utils from "../utils";
import { core } from "./core";

export const consistentSourceExtension = utils.wrapRule(
  core["restrict-syntax"],
  [
    {
      message: "Remove extension",
      selector: "Literal.source[value=/\\.(?:js|json|ts)$/u]"
    }
  ]
);
