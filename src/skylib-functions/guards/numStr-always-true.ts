/* eslint-disable @skylib/consistent-filename -- Ok */

import * as utils from "../../utils";
import { typescript } from "../../typescript";

export const numStrAlwaysTrue = utils.wrapRule(typescript["restrict-syntax"], [
  {
    message: "Expecting type to include number, string or unknown",
    selector:
      "CallExpression[callee.object.name=/^(?:as|assert|is)$/u][callee.property.name=/^(?:numStr|numStrU)$/u] > .arguments:first-child",
    typeIsOneOf: [utils.TypeGroup.number, utils.TypeGroup.string]
  }
]);
