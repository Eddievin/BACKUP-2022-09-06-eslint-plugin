import * as utils from "../utils";
import { core } from "./core";

export const preferReadonlyArray = utils.wrapRule(
  core["no-restricted-syntax"],
  [
    {
      message: "Prefer readonly array",
      selector: [
        ":not(TSTypeOperator[operator=readonly]) > :matches(TSArrayType, TSTupleType)",
        "TSTypeReference > Identifier[name=Array]"
      ]
    }
  ]
);
