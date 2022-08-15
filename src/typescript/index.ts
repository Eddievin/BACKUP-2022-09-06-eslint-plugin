import { consistentArrayTypeName } from "./consistent-array-type-name";
import { core } from "./core";
import { defineFunctionInOneStatement } from "./define-function-in-one-statement";
import { noComplexDeclaratorType } from "./no-complex-declarator-type";
import { noComplexReturnType } from "./no-complex-return-type";
import { noEmptyInterfaces } from "./no-empty-interfaces";
import { noNever } from "./no-never";
import { noShadow } from "./no-shadow";
import { noThisVoid } from "./no-this-void";
import { noTrueType } from "./no-true-type";
import { noUnsafeObjectAssign } from "./no-unsafe-object-assign";
import { o } from "@skylib/functions";
import { preferArrayTypeAlias } from "./prefer-array-type-alias";
import { preferEnum } from "./prefer-enum";
import { preferReadonlyArray } from "./prefer-readonly-array";
import { preferReadonlyMap } from "./prefer-ReadonlyMap";
import { preferReadonlyProperty } from "./prefer-readonly-property";
import { preferReadonlySet } from "./prefer-ReadonlySet";
import { requirePropTypeAnnotation } from "./require-prop-type-annotation";

export const typescript = o.prefixKeys(
  {
    ...core,
    "consistent-array-type-name": consistentArrayTypeName,
    "define-function-in-one-statement": defineFunctionInOneStatement,
    "no-complex-declarator-type": noComplexDeclaratorType,
    "no-complex-return-type": noComplexReturnType,
    "no-empty-interfaces": noEmptyInterfaces,
    "no-never": noNever,
    "no-shadow": noShadow,
    "no-this-void": noThisVoid,
    "no-true-type": noTrueType,
    "no-unsafe-object-assign": noUnsafeObjectAssign,
    "prefer-ReadonlyMap": preferReadonlyMap,
    "prefer-ReadonlySet": preferReadonlySet,
    "prefer-array-type-alias": preferArrayTypeAlias,
    "prefer-enum": preferEnum,
    "prefer-readonly-array": preferReadonlyArray,
    "prefer-readonly-property": preferReadonlyProperty,
    "require-prop-type-annotation": requirePropTypeAnnotation
  },
  "typescript/"
);
