/* eslint-disable @skylib/consistent-filename -- Ok */

import * as utils from "../../../utils";
import { typescript } from "../../../typescript";

export const instanceOfAlwaysFalse = utils.wrapRule(
  typescript["typescript/no-restricted-syntax"],
  [
    {
      message: "Expecting type to include object, unknown",
      selector:
        "CallExpression[callee.object.name=/^(?:as|assert|is)$/u][callee.property.name=instanceOf] > .arguments:first-child",
      typeHasNoneOf: [
        utils.TypeGroup.any,
        utils.TypeGroup.object,
        utils.TypeGroup.unknown
      ]
    }
  ]
);
