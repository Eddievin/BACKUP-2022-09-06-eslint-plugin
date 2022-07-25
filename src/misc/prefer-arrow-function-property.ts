import * as utils from "../utils";
import { core } from "./core";

export const preferArrowFunctionProperty = utils.wrapRule(
  core["restrict-syntax"],
  [
    {
      message: "Prefer arrow function",
      selector: "Property > FunctionExpression.value"
    }
  ]
);
