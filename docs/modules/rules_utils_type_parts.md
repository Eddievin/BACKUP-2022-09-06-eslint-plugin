[ESLint plugin](../index.md) / [Exports](../modules.md) / rules/utils/type-parts

# Module: rules/utils/type-parts

## Table of contents

### Namespaces

- [getTypeParts](rules_utils_type_parts.getTypeParts.md)

### Type aliases

- [TypePart](rules_utils_type_parts.md#typepart)

### Functions

- [getTypeParts](rules_utils_type_parts.md#gettypeparts)
- [getTypePartsWithTypeofFix](rules_utils_type_parts.md#gettypepartswithtypeoffix)

## Type aliases

### TypePart

Ƭ **TypePart**: `number` \| `string` \| `ts.Type` \| `undefined`

## Functions

### getTypeParts

▸ **getTypeParts**<`M`, `O`, `S`\>(`node`, `context`): readonly [`TypePart`](rules_utils_type_parts.md#typepart)[]

Gets type parts.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `M` | extends `string` |
| `O` | extends `object` |
| `S` | extends `object` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `node` | `Node` | Node. |
| `context` | [`Context`](../interfaces/rules_utils.Context.md)<`M`, `O`, `S`\> | Context. |

#### Returns

readonly [`TypePart`](rules_utils_type_parts.md#typepart)[]

Type parts.

___

### getTypePartsWithTypeofFix

▸ **getTypePartsWithTypeofFix**<`M`, `O`, `S`\>(`node`, `context`): readonly [`TypePart`](rules_utils_type_parts.md#typepart)[]

Gets type parts.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `M` | extends `string` |
| `O` | extends `object` |
| `S` | extends `object` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `node` | `Node` | Node. |
| `context` | [`Context`](../interfaces/rules_utils.Context.md)<`M`, `O`, `S`\> | Context. |

#### Returns

readonly [`TypePart`](rules_utils_type_parts.md#typepart)[]

Type parts.
