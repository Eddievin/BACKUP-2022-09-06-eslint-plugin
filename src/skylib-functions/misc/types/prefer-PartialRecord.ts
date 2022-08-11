/* eslint-disable @skylib/consistent-filename -- Postponed */

import * as utils from "../../../utils";
import { misc } from "../../../misc";

export const preferPartialRecord = utils.wrapRule(
  misc["no-restricted-syntax"],
  [
    {
      message: 'Prefer "PartialRecord" type',
      selector:
        "TSTypeReference[typeName.name=Partial] > .typeParameters > .params:first-child > .typeName[name=Rec]"
    }
  ]
);
