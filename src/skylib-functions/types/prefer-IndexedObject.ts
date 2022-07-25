/* eslint-disable @skylib/consistent-filename -- Ok */

import * as utils from "../../utils";
import { misc } from "../../misc";

export const preferIndexedObject = utils.wrapRule(misc["restrict-syntax"], [
  {
    message: 'Prefer "IndexedObject" type',
    selector:
      "TSTypeReference[typeName.name=Rec] > .typeParameters > .params:first-child > .typeName[name=PropertyKey]"
  }
]);
