import * as utils from "../utils";
import { core } from "./core";

export const preferArrowStaticMethod = utils.wrapRule(
  core["no-restricted-syntax"],
  [
    {
      message: "Prefer arrow function",
      selector: "MethodDefinition[static=true]"
    }
  ]
);
