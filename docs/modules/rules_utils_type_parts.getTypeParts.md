[ESLint plugin](../index.md) / [Exports](../modules.md) / [rules/utils/type-parts](rules_utils_type_parts.md) / getTypeParts

# Namespace: getTypeParts

[rules/utils/type-parts](rules_utils_type_parts.md).getTypeParts

## Table of contents

### Variables

- [typeofFix](rules_utils_type_parts.getTypeParts.md#typeoffix)

## Variables

### typeofFix

• **typeofFix**: <M, O, S\>(`node`: `Node`, `context`: [`Context`](../interfaces/rules_utils.Context.md)<`M`, `O`, `S`\>) => readonly [`TypePart`](rules_utils_type_parts.md#typepart)[]

#### Type declaration

▸ <`M`, `O`, `S`\>(`node`, `context`): readonly [`TypePart`](rules_utils_type_parts.md#typepart)[]

Gets type parts.

##### Type parameters

| Name | Type |
| :------ | :------ |
| `M` | extends `string` |
| `O` | extends `object` |
| `S` | extends `object` |

##### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `node` | `Node` | Node. |
| `context` | [`Context`](../interfaces/rules_utils.Context.md)<`M`, `O`, `S`\> | Context. |

##### Returns

readonly [`TypePart`](rules_utils_type_parts.md#typepart)[]

Type parts.
