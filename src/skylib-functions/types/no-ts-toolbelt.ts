import * as utils from "../../utils";
import { misc } from "../../misc";

export const noTsToolbelt = utils.wrapRule(misc["restrict-syntax"], [
  {
    message: 'Prefer "@skylib/functions" type',
    selector: [
      "ImportDeclaration > Literal.source[value=ts-toolbelt/out/Object/FilterKeys]",
      "ImportDeclaration > Literal.source[value=ts-toolbelt/out/Object/Optional]",
      "ImportDeclaration > Literal.source[value=ts-toolbelt/out/Object/OptionalKeys]",
      "ImportDeclaration > Literal.source[value=ts-toolbelt/out/Object/Readonly]",
      "ImportDeclaration > Literal.source[value=ts-toolbelt/out/Object/ReadonlyKeys]",
      "ImportDeclaration > Literal.source[value=ts-toolbelt/out/Object/Required]",
      "ImportDeclaration > Literal.source[value=ts-toolbelt/out/Object/RequiredKeys]",
      "ImportDeclaration > Literal.source[value=ts-toolbelt/out/Object/Writable]",
      "ImportDeclaration > Literal.source[value=ts-toolbelt/out/Object/WritableKeys]"
    ]
  }
]);
