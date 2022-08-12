import * as utils from "../utils";
import { misc } from "../misc";

export const sortArray = utils.wrapRule(misc["sort-array"], [
  {
    selector:
      "Property[key.name=/^(?:allow|disallow|files|filesToLint|filesToSkip|ignoreSelector|pattern|propertyPattern|selector)$/u] > ArrayExpression",
    triggerByComment: false
  }
]);
