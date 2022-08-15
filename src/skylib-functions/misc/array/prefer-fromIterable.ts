/* eslint-disable @skylib/consistent-filename -- Postponed */

import * as utils from "../../../utils";
import { misc } from "../../../misc";

export const preferFromIterable = utils.wrapRule(misc["no-restricted-syntax"], [
  {
    message: 'Use "a.fromIterable" function instead',
    selector: "ArrayExpression[elements.length=1] > SpreadElement"
  }
]);
