/* eslint-disable @skylib/consistent-filename -- Ok */

import * as utils from "../../../utils";
import { misc } from "../../../misc";

export const preferFromIterable = utils.wrapRule(misc["no-restricted-syntax"], [
  {
    message: 'Prefer "a.fromIterable" function',
    selector: "ArrayExpression[elements.length=1] > SpreadElement"
  }
]);
