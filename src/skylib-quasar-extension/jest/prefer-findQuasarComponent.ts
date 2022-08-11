/* eslint-disable @skylib/consistent-filename -- Postponed */

import * as utils from "../../utils";
import { misc } from "../../misc";

export const preferFindQuasarComponent = utils.wrapRule(
  misc["no-restricted-syntax"],
  [
    {
      message: 'Use "findQuasarComponent" function',
      selector:
        "CallExpression[arguments.0.name=/^Q/u] > MemberExpression.callee[object.name=wrapper][property.name=findComponent]"
    }
  ]
);
