import * as utils from "../utils";
import { core } from "./core";

export const preferReadonlyArray = utils.wrapRule(core["restrict-syntax"], [
  {
    message: "Prefer readonly array",
    selector: [
      `:not(TSTypeOperator[operator=readonly]) > :matches(${utils.selectors.arrayType})`,
      "TSTypeReference > Identifier[name=Array]"
    ]
  }
]);
