/* eslint-disable @skylib/consistent-filename -- Ok */

import * as utils from "../../../utils";
import { typescript } from "../../../typescript";

export const mixedFromIncludeArray = utils.wrapRule(
  typescript["typescript/no-restricted-syntax"],
  [
    {
      message: "Expecting type to include array",
      selector:
        "CallExpression[callee.object.name=a][callee.property.name=fromMixed] > .arguments:first-child",
      typeHasNoneOf: [utils.TypeGroup.array]
    }
  ]
);
