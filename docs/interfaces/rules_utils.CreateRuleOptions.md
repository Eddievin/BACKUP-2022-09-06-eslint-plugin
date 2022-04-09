[ESLint plugin](../index.md) / [Exports](../modules.md) / [rules/utils](../modules/rules_utils.md) / CreateRuleOptions

# Interface: CreateRuleOptions<M, O, S\>

[rules/utils](../modules/rules_utils.md).CreateRuleOptions

## Type parameters

| Name | Type |
| :------ | :------ |
| `M` | extends `string` |
| `O` | extends `object` |
| `S` | extends `object` |

## Table of contents

### Properties

- [defaultOptions](rules_utils.CreateRuleOptions.md#defaultoptions)
- [defaultSubOptions](rules_utils.CreateRuleOptions.md#defaultsuboptions)
- [fixable](rules_utils.CreateRuleOptions.md#fixable)
- [isRuleOptions](rules_utils.CreateRuleOptions.md#isruleoptions)
- [isSubOptions](rules_utils.CreateRuleOptions.md#issuboptions)
- [messages](rules_utils.CreateRuleOptions.md#messages)
- [subOptionsKey](rules_utils.CreateRuleOptions.md#suboptionskey)

### Methods

- [create](rules_utils.CreateRuleOptions.md#create)

## Properties

### defaultOptions

• `Optional` `Readonly` **defaultOptions**: `Readonly`<`Partial`<`O`\>\>

___

### defaultSubOptions

• `Optional` `Readonly` **defaultSubOptions**: `Readonly`<`Partial`<`S`\>\>

___

### fixable

• `Optional` `Readonly` **fixable**: ``"whitespace"`` \| ``"code"``

___

### isRuleOptions

• `Readonly` **isRuleOptions**: `Guard`<`O`\>

___

### isSubOptions

• `Optional` `Readonly` **isSubOptions**: `Guard`<`S`\>

___

### messages

• `Readonly` **messages**: `Rec`<`M`, `string`\>

___

### subOptionsKey

• `Optional` `Readonly` **subOptionsKey**: `string`

## Methods

### create

▸ `Readonly` **create**(`context`): `RuleListener`

Creates rule listener.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `context` | [`Context`](rules_utils.Context.md)<`M`, `O`, `S`\> | Context. |

#### Returns

`RuleListener`

Rule listener.
