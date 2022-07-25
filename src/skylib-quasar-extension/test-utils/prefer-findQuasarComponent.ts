/* eslint-disable @skylib/consistent-filename -- Ok */

import * as utils from "../../utils";
import { misc } from "../../misc";

export const preferFindQuasarComponent = utils.wrapRule(
  misc["restrict-syntax"],
  [
    {
      message: 'Use "findQuasarComponent" function',
      selector:
        "CallExpression[arguments.0.name=/^Q/u] > MemberExpression.callee[object.name=wrapper][property.name=findComponent]"
    }
  ]
);
