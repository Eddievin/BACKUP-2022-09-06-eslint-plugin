/* eslint-disable @skylib/consistent-filename -- Ok */

import * as utils from "../../utils";
import { misc } from "../../misc";

export const preferIndexedRecord = utils.wrapRule(
  misc["no-restricted-syntax"],
  [
    {
      message: 'Prefer "IndexedRecord" type',
      selector:
        "TSTypeReference[typeName.name=Rec] > .typeParameters > TSStringKeyword.params:first-child"
    }
  ]
);
