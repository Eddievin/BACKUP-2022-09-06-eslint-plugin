import * as utils from "../utils";
import { misc } from "../misc";

export const sortArray = utils.wrapRule(misc["sort-array"], [
  {
    selector: [
      "Property[key.name=files] > ArrayExpression",
      "Property[key.name=/^(?:allow|disallow|filesToLint|filesToSkip|pattern|propertyPattern|selector)$/u] > ArrayExpression"
    ]
  }
]);
