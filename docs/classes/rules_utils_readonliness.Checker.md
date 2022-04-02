[ESLint plugin](../index.md) / [Exports](../modules.md) / [rules/utils/readonliness](../modules/rules_utils_readonliness.md) / Checker

# Class: Checker<M, O, S\>

[rules/utils/readonliness](../modules/rules_utils_readonliness.md).Checker

## Type parameters

| Name | Type |
| :------ | :------ |
| `M` | extends `string` |
| `O` | extends `object` |
| `S` | extends `object` |

## Table of contents

### Constructors

- [constructor](rules_utils_readonliness.Checker.md#constructor)

### Properties

- [checker](rules_utils_readonliness.Checker.md#checker)
- [ignoreClasses](rules_utils_readonliness.Checker.md#ignoreclasses)
- [ignoreInterfaces](rules_utils_readonliness.Checker.md#ignoreinterfaces)
- [ignoreTypeParameters](rules_utils_readonliness.Checker.md#ignoretypeparameters)
- [ignoreTypes](rules_utils_readonliness.Checker.md#ignoretypes)
- [readonliness](rules_utils_readonliness.Checker.md#readonliness)
- [seenTypesPool](rules_utils_readonliness.Checker.md#seentypespool)

### Methods

- [checkMappedTypeNodes](rules_utils_readonliness.Checker.md#checkmappedtypenodes)
- [checkObjectType](rules_utils_readonliness.Checker.md#checkobjecttype)
- [checkProperties](rules_utils_readonliness.Checker.md#checkproperties)
- [checkSignatures](rules_utils_readonliness.Checker.md#checksignatures)
- [checkSubTypes](rules_utils_readonliness.Checker.md#checksubtypes)
- [checkType](rules_utils_readonliness.Checker.md#checktype)
- [checkTypeParameter](rules_utils_readonliness.Checker.md#checktypeparameter)
- [invalidReadonliness](rules_utils_readonliness.Checker.md#invalidreadonliness)
- [readonlyMappedTypeNode](rules_utils_readonliness.Checker.md#readonlymappedtypenode)
- [recurs](rules_utils_readonliness.Checker.md#recurs)

## Constructors

### constructor

• **new Checker**<`M`, `O`, `S`\>(`options`)

Creates class instance.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `M` | extends `string` |
| `O` | extends `object` |
| `S` | extends `object` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `options` | [`Options`](../interfaces/rules_utils_readonliness.Options.md)<`M`, `O`, `S`\> | Options. |

## Properties

### checker

• `Protected` **checker**: `TypeChecker`

___

### ignoreClasses

• `Protected` **ignoreClasses**: `boolean`

___

### ignoreInterfaces

• `Protected` **ignoreInterfaces**: `boolean`

___

### ignoreTypeParameters

• `Protected` **ignoreTypeParameters**: `boolean`

___

### ignoreTypes

• `Protected` **ignoreTypes**: `ReadonlySet`<`string`\>

___

### readonliness

• `Protected` **readonliness**: [`Readonliness`](../modules/rules_utils_readonliness.md#readonliness)

___

### seenTypesPool

• `Protected` **seenTypesPool**: `Set`<`Type`\>

## Methods

### checkMappedTypeNodes

▸ `Protected` **checkMappedTypeNodes**(`type`): [`Result`](../modules/rules_utils_readonliness.md#result)

Checks mapped type nodes.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `type` | `Type` | Type. |

#### Returns

[`Result`](../modules/rules_utils_readonliness.md#result)

Validation result.

___

### checkObjectType

▸ `Protected` **checkObjectType**(`type`, `restElement`): [`Result`](../modules/rules_utils_readonliness.md#result)

Checks object type.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `type` | `ObjectType` | Type. |
| `restElement` | `boolean` | Rest element. |

#### Returns

[`Result`](../modules/rules_utils_readonliness.md#result)

Validation result.

___

### checkProperties

▸ `Protected` **checkProperties**(`type`, `restElement`): [`Result`](../modules/rules_utils_readonliness.md#result)

Checks properties.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `type` | `ObjectType` | Type. |
| `restElement` | `boolean` | Rest element. |

#### Returns

[`Result`](../modules/rules_utils_readonliness.md#result)

Validation result.

___

### checkSignatures

▸ `Protected` **checkSignatures**(`type`, `restElement`): [`Result`](../modules/rules_utils_readonliness.md#result)

Checks signatures.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `type` | `ObjectType` | Type. |
| `restElement` | `boolean` | Rest element. |

#### Returns

[`Result`](../modules/rules_utils_readonliness.md#result)

Validation result.

___

### checkSubTypes

▸ `Protected` **checkSubTypes**(`type`, `subtypes`): [`Result`](../modules/rules_utils_readonliness.md#result)

Checks subtypes.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `type` | `Type` | Type. |
| `subtypes` | readonly `Type`[] | Subtypes. |

#### Returns

[`Result`](../modules/rules_utils_readonliness.md#result)

Validation result.

___

### checkType

▸ **checkType**(`type`, `restElement?`): [`Result`](../modules/rules_utils_readonliness.md#result)

Checks type.

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `type` | `Type` | `undefined` | Type. |
| `restElement` | `boolean` | `false` | Rest element. |

#### Returns

[`Result`](../modules/rules_utils_readonliness.md#result)

Validation result.

___

### checkTypeParameter

▸ `Protected` **checkTypeParameter**(`type`): [`Result`](../modules/rules_utils_readonliness.md#result)

Checks type parameter.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `type` | `TypeParameter` | Type. |

#### Returns

[`Result`](../modules/rules_utils_readonliness.md#result)

Validation result.

___

### invalidReadonliness

▸ `Protected` **invalidReadonliness**(`typeIsReadonly`, `sourceType`): `boolean`

Checks that type readonliness is invalid.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `typeIsReadonly` | `boolean` | Whether type is readonly. |
| `sourceType` | [`SourceType`](../modules/rules_utils_readonliness.md#sourcetype) | Source type. |

#### Returns

`boolean`

_True_ if type readonliness is invalid, _false_ otherwise.

___

### readonlyMappedTypeNode

▸ `Protected` **readonlyMappedTypeNode**(`node`): `boolean`

Checks that mapped type node is readonly.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `node` | `MappedTypeNode` | Node. |

#### Returns

`boolean`

_True_ if mapped type node is readonly, _false_ otherwise.

___

### recurs

▸ `Protected` **recurs**(`type`, `restElement?`): [`Result`](../modules/rules_utils_readonliness.md#result)

Checks type.

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `type` | `Type` | `undefined` | Type. |
| `restElement` | `boolean` | `false` | Rest element. |

#### Returns

[`Result`](../modules/rules_utils_readonliness.md#result)

Validation result.
