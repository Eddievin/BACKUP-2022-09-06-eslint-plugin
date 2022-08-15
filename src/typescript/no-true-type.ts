import * as utils from "../utils";
import { core } from "./core";

export const noTrueType = utils.wrapRule(core["no-restricted-syntax"], [
  {
    message: 'Use "boolean" type instead',
    selector:
      "TSPropertySignature[optional=true] > TSTypeAnnotation > TSLiteralType.typeAnnotation > Literal[value=true]"
  }
]);
