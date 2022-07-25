/* eslint-disable @skylib/consistent-filename -- Ok */

import * as utils from "../../utils";
import { misc } from "../../misc";

export const requireValidatePropsTypeParam = utils.wrapRule(
  misc["restrict-syntax"],
  [
    {
      message: 'Expecting "OwnProps" type parameter',
      selector: [
        "CallExpression[callee.name=validateProps] > TSTypeParameterInstantiation.typeParameters > TSTypeReference.params > TSQualifiedName.typeName > Identifier.right[name!=OwnProps]",
        "CallExpression[callee.name=validateProps][typeParameters=undefined]"
      ]
    }
  ]
);
