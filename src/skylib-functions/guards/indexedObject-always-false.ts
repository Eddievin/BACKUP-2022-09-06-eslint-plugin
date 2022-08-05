/* eslint-disable @skylib/consistent-filename -- Ok */

import * as utils from "../../utils";
import { typescript } from "../../typescript";

export const indexedObjectAlwaysFalse = utils.wrapRule(
  typescript["no-restricted-syntax"],
  [
    {
      message: "Expecting type to be unknown",
      selector:
        "CallExpression[callee.object.name=/^(?:as|assert|is)$/u][callee.property.name=/^(?:indexedObject|indexedObjectU)$/u] > .arguments:first-child",
      typeHasNoneOf: [
        utils.TypeGroup.any,
        utils.TypeGroup.object,
        utils.TypeGroup.unknown
      ]
    }
  ]
);
