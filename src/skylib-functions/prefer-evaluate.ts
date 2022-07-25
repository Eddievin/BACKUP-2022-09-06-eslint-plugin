import * as utils from "../utils";
import { misc } from "../misc";

export const preferEvaluate = utils.wrapRule(misc["restrict-syntax"], [
  {
    message: 'Use "evaluate" instead',
    selector:
      "CallExpression[arguments.length=0] > ArrowFunctionExpression.callee"
  }
]);
