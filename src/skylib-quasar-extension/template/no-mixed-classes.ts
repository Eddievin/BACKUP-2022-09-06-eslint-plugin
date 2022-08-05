import * as utils from "../../utils";
import { misc } from "../../misc";

export const noMixedClasses = utils.wrapRule(misc["no-restricted-syntax"], [
  {
    message: "Do not mix module and static classes",
    selector:
      "VExpressionContainer > TemplateLiteral > MemberExpression > Identifier[name=$style]"
  }
]);
