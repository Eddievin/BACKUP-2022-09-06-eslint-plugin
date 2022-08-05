/* eslint-disable @skylib/consistent-filename -- Ok */

import * as utils from "../../utils";
import { misc } from "../../misc";

export const noWritable = utils.wrapRule(misc["no-restricted-syntax"], [
  {
    message: 'Prefer "Writable..." type',
    selector: [
      "TSTypeReference[typeName.name=Writable] > .typeParameters > .params:first-child > .typeName[name=IndexedObject]",
      "TSTypeReference[typeName.name=Writable] > .typeParameters > .params:first-child > .typeName[name=IndexedRecord]",
      "TSTypeReference[typeName.name=Writable] > .typeParameters > .params:first-child > .typeName[name=PartialRecord]",
      "TSTypeReference[typeName.name=Writable] > .typeParameters > .params:first-child > .typeName[name=Rec]"
    ]
  }
]);
