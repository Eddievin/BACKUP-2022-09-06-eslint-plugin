import * as utils from "../../utils";
import { typescript } from "../../typescript";

export const preferTruncate = utils.wrapRule(typescript["restrict-syntax"], [
  {
    message: 'Use "a.truncate" instead',
    selector:
      "AssignmentExpression[right.value=0] > MemberExpression.left > .object",
    typeIs: utils.TypeGroup.array
  }
]);
