import * as utils from "../utils";
import { core } from "./core";

export const requirePropTypeAnnotation = utils.wrapRule(
  core["no-restricted-syntax"],
  [
    {
      message: "Expecting type annotation",
      selector: "PropertyDefinition[typeAnnotation=undefined][value=null]"
    }
  ]
);
