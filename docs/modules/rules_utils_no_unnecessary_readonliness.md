[ESLint plugin](../index.md) / [Exports](../modules.md) / rules/utils/no-unnecessary-readonliness

# Module: rules/utils/no-unnecessary-readonliness

## Table of contents

### Functions

- [createRule](rules_utils_no_unnecessary_readonliness.md#createrule)

## Functions

### createRule

▸ **createRule**<`M`, `T`\>(`isTypeToCheck`, `readonliness`, `messageId`, `message`): `RuleModule`<`M`, `unknowns`\>

Creates rule.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `M` | extends `string` |
| `T` | extends `string` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `isTypeToCheck` | `Guard`<`T`\> | Guard. |
| `readonliness` | [`Readonliness`](rules_utils_readonliness.md#readonliness) | Readonliness that triggers error. |
| `messageId` | `M` | Message ID. |
| `message` | `string` | Message. |

#### Returns

`RuleModule`<`M`, `unknowns`\>

Rule module.
