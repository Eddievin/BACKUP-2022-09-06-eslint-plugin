import * as utils from "../rules/utils";
import { matchFilename } from "../rules/match-filename";

export { MessageId } from "../rules/match-filename";

export const classMatchFilename = utils.wrapRule(matchFilename, [
  {
    format: utils.casing.Format.pascalCase,
    selector: "ClassDeclaration > Identifier.id"
  }
]);
