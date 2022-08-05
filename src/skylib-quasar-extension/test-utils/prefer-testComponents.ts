/* eslint-disable @skylib/consistent-filename -- Ok */

import * as utils from "../../utils";
import { misc } from "../../misc";

export const preferTestComponents = utils.wrapRule(
  misc["no-restricted-syntax"],
  [
    {
      message: 'Prefer "testComponents"',
      selector:
        "CallExpression[callee.object.name=wrapper][callee.property.name=findComponent] > MemberExpression.arguments:first-child > Identifier.object[name=components]"
    }
  ]
);
