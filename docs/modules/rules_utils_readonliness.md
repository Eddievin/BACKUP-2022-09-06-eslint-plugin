[ESLint plugin](../index.md) / [Exports](../modules.md) / rules/utils/readonliness

# Module: rules/utils/readonliness

## Table of contents

### Classes

- [Checker](../classes/rules_utils_readonliness.Checker.md)

### Interfaces

- [InvalidResult](../interfaces/rules_utils_readonliness.InvalidResult.md)
- [Options](../interfaces/rules_utils_readonliness.Options.md)
- [ValidResult](../interfaces/rules_utils_readonliness.ValidResult.md)

### Type aliases

- [Readonliness](rules_utils_readonliness.md#readonliness)
- [Result](rules_utils_readonliness.md#result)
- [SourceType](rules_utils_readonliness.md#sourcetype)

## Type aliases

### Readonliness

Ƭ **Readonliness**: ``"allDefinitelyReadonly"`` \| ``"allDefinitelyWritable"`` \| ``"allMaybeReadonly"`` \| ``"allMaybeWritable"`` \| ``"numberSignatureReadonly"`` \| ``"stringSignatureReadonly"``

___

### Result

Ƭ **Result**: [`InvalidResult`](../interfaces/rules_utils_readonliness.InvalidResult.md) \| [`ValidResult`](../interfaces/rules_utils_readonliness.ValidResult.md)

___

### SourceType

Ƭ **SourceType**: ``"numberSignature"`` \| ``"property"`` \| ``"stringSignature"``
