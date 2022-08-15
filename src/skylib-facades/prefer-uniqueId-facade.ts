/* eslint-disable @skylib/consistent-filename -- Ok */

import * as utils from "../utils";
import { misc } from "../misc";

export const preferUniqueIdFacade = utils.wrapRule(
  misc["no-restricted-syntax"],
  [
    {
      message: 'Use "uniqueId" facade instead',
      selector:
        "CallExpression > MemberExpression.callee[object.name=_][property.name=uniqueId]"
    }
  ]
);
