/* eslint-disable @skylib/consistent-filename -- Ok */

import * as utils from "../../utils";
import { misc } from "../../misc";

export const preferWritableIndexedObject = utils.wrapRule(
  misc["restrict-syntax"],
  [
    {
      message: 'Prefer "WritableIndexedObject" type',
      selector:
        "TSTypeReference[typeName.name=WritableRecord] > .typeParameters > .params:first-child > .typeName[name=PropertyKey]"
    }
  ]
);
