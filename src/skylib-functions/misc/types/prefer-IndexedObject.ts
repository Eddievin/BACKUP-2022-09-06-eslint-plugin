/* eslint-disable @skylib/consistent-filename -- Ok */

import * as utils from "../../../utils";
import { misc } from "../../../misc";

export const preferIndexedObject = utils.wrapRule(
  misc["no-restricted-syntax"],
  [
    {
      message: 'Use "IndexedObject" type instead',
      selector:
        "TSTypeReference[typeName.name=Rec] > TSTypeParameterInstantiation > TSTypeReference:first-child > Identifier.typeName[name=PropertyKey]"
    }
  ]
);
