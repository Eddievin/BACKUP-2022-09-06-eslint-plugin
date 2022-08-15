import * as utils from "../utils";
import { core } from "./core";

export const preferArrayTypeAlias = utils.wrapRule(
  core["no-restricted-syntax"],
  [
    {
      checkArrayType: true,
      ignoreSelector: [
        "TSTypeAliasDeclaration > .typeAnnotation",
        "TSTypeAliasDeclaration > .typeAnnotation *"
      ],
      message: "Prefer alias for array type",
      selector: [
        "TSArrayType",
        "TSTupleType[elementTypes.length>0]",
        "TSTypeReference[typeName.name=Array]",
        "TSTypeReference[typeName.name=ReadonlyArray]"
      ],
      typeIsNoneOf: [utils.TypeGroup.any, utils.TypeGroup.parameter]
    }
  ]
);
