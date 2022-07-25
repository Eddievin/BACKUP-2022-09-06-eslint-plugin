import * as utils from "../utils";
import { typescript } from "../typescript";

export const noComplexReturnType = utils.wrapRule(
  typescript["restrict-syntax"],
  [
    {
      checkReturnType: true,
      message: "Avoid complex return type",
      selector: `:not(Property[key.name=setup]) > :matches(${utils.selectors.function})`,
      typeIs: utils.TypeGroup.complex
    }
  ]
);
