import * as utils from "../../utils";
import { typescript } from "../../typescript";

export const booleanAlwaysFalse = utils.wrapRule(
  typescript["no-restricted-syntax"],
  [
    {
      message: "Expecting type to include boolean or unknown",
      selector:
        "CallExpression[callee.object.name=/^(?:as|assert|is)$/u][callee.property.name=/^(?:boolean|booleanU)$/u] > .arguments:first-child",
      typeHasNoneOf: [
        utils.TypeGroup.any,
        utils.TypeGroup.boolean,
        utils.TypeGroup.unknown
      ]
    }
  ]
);
