/* eslint-disable @skylib/consistent-filename -- Postponed */

import * as utils from "../../../utils";
import { misc } from "../../../misc";

// eslint-disable-next-line @skylib/max-identifier-blocks -- Postponed
export const requireValidateEmitTypeParam = utils.wrapRule(
  misc["no-restricted-syntax"],
  [
    {
      message: 'Expecting "OwnProps" type parameter',
      selector: [
        "CallExpression[callee.name=validateEmit] > TSTypeParameterInstantiation > TSTypeReference > TSQualifiedName.typeName > Identifier.right[name!=OwnProps]",
        "CallExpression[callee.name=validateEmit][typeParameters=undefined]"
      ]
    }
  ]
);
