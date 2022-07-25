import * as utils from "../utils";
import { core } from "./core";

export const requirePropTypeAnnotation = utils.wrapRule(
  core["restrict-syntax"],
  [
    {
      message: "Expecting type annotation",
      selector: "PropertyDefinition[typeAnnotation=undefined][value=null]"
    }
  ]
);
