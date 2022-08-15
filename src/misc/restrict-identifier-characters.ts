import * as utils from "../utils";
import { core } from "./core";

export const restrictIdentifierCharacters = utils.wrapRule(
  core["no-restricted-syntax"],
  [
    {
      message: "Identifier must consist of english characters and dollar sign",
      selector: "Identifier[name=/[^$\\w]/u]"
    }
  ]
);
