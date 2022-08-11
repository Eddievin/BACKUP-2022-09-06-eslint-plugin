/* eslint-disable @skylib/consistent-filename -- Postponed */

import * as utils from "../../utils";
import { misc } from "../../misc";

export const preferReadonlyMap = utils.wrapRule(misc["no-restricted-syntax"], [
  {
    message: 'Prefer "ReadonlyMap"',
    selector: "NewExpression > Identifier.callee[name=Map]"
  }
]);
