import * as utils from "../utils";
import { core } from "./core";

export const preferArrayTypeAlias = utils.wrapRule(
  core["no-restricted-syntax"],
  [
    {
      checkArrayType: true,
      ignoreSelector: [
        "TSTypeAliasDeclaration > .typeAnnotation:matches(TSArrayType, TSTupleType, TSTypeReference)",
        "TSTypeAliasDeclaration > .typeAnnotation :matches(TSArrayType, TSTupleType, TSTypeReference)"
      ],
      message: "Prefer alias for array type",
      selector:
        "TSArrayType, TSTupleType[elementTypes.length > 0], TSTypeReference[typeName.name=/^(?:Array|ReadonlyArray)$/u]",
      typeIsNoneOf: [utils.TypeGroup.any, utils.TypeGroup.parameter]
    }
  ]
);
