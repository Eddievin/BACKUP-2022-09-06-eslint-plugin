/* eslint-disable @skylib/consistent-filename -- Postponed */

import * as utils from "../../../utils";
import { misc } from "../../../misc";

export const preferWritableIndexedObject = utils.wrapRule(
  misc["no-restricted-syntax"],
  [
    {
      message: 'Prefer "WritableIndexedObject" type',
      selector:
        "TSTypeReference[typeName.name=WritableRecord] > .typeParameters > .params:first-child > .typeName[name=PropertyKey]"
    }
  ]
);
