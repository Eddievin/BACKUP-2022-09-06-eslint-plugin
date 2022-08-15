import * as utils from "../utils";
import { core } from "./core";

export const preferReadonlyProperty = utils.wrapRule(
  core["no-restricted-syntax"],
  [
    {
      message: "Prefer readonly property",
      selector:
        ":matches(PropertyDefinition, TSPropertySignature)[readonly!=true]"
    }
  ]
);
