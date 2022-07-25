/* eslint-disable @skylib/consistent-filename -- Ok */

import * as utils from "../../utils";
import { typescript } from "../../typescript";

export const indexedObjectAlwaysTrue = utils.wrapRule(
  typescript["restrict-syntax"],
  [
    {
      message: "Expecting type to be unknown",
      selector:
        "CallExpression[callee.object.name=/^(?:as|assert|is)$/u][callee.property.name=/^(?:indexedObject|indexedObjectU)$/u] > .arguments:first-child",
      typeIs: utils.TypeGroup.object
    }
  ]
);
