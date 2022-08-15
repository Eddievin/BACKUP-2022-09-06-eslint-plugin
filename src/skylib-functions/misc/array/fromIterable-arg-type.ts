/* eslint-disable @skylib/consistent-filename -- Ok */

import * as utils from "../../../utils";
import { typescript } from "../../../typescript";

export const fromIterableArgType = utils.wrapRule(
  typescript["typescript/no-restricted-syntax"],
  [
    {
      message: "Unnecessary with array type",
      selector:
        "CallExpression[callee.object.name=a][callee.property.name=fromIterable] > .arguments:first-child",
      typeIs: utils.TypeGroup.array
    }
  ]
);
