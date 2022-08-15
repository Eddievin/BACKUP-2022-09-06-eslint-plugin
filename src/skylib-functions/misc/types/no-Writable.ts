/* eslint-disable @skylib/consistent-filename -- Postponed */

import * as utils from "../../../utils";
import { misc } from "../../../misc";

export const noWritable = utils.wrapRule(misc["no-restricted-syntax"], [
  {
    message: 'Use "Writable..." type instead',
    selector:
      "TSTypeReference[typeName.name=Writable] > .typeParameters > .params:first-child > .typeName[name=/^(?:IndexedObject|IndexedRecord|PartialRecord|Rec)$/u]"
  }
]);
