[ESLint plugin](../index.md) / [Exports](../modules.md) / [rules/utils](../modules/rules_utils.md) / Context

# Interface: Context<M, O, S\>

[rules/utils](../modules/rules_utils.md).Context

## Type parameters

| Name | Type |
| :------ | :------ |
| `M` | extends `string` |
| `O` | extends `object` |
| `S` | extends `object` |

## Table of contents

### Properties

- [checker](rules_utils.Context.md#checker)
- [code](rules_utils.Context.md#code)
- [eol](rules_utils.Context.md#eol)
- [id](rules_utils.Context.md#id)
- [locZero](rules_utils.Context.md#loczero)
- [options](rules_utils.Context.md#options)
- [package](rules_utils.Context.md#package)
- [path](rules_utils.Context.md#path)
- [scope](rules_utils.Context.md#scope)
- [source](rules_utils.Context.md#source)
- [subOptionsArray](rules_utils.Context.md#suboptionsarray)
- [toEsNode](rules_utils.Context.md#toesnode)
- [toTsNode](rules_utils.Context.md#totsnode)

### Methods

- [getLeadingTrivia](rules_utils.Context.md#getleadingtrivia)
- [getLocFromRange](rules_utils.Context.md#getlocfromrange)
- [getRangeWithLeadingTrivia](rules_utils.Context.md#getrangewithleadingtrivia)
- [getText](rules_utils.Context.md#gettext)
- [getTextWithLeadingTrivia](rules_utils.Context.md#gettextwithleadingtrivia)
- [getTypeDefinitions](rules_utils.Context.md#gettypedefinitions)
- [hasLeadingDocComment](rules_utils.Context.md#hasleadingdoccomment)
- [hasTrailingComment](rules_utils.Context.md#hastrailingcomment)
- [missingDocComment](rules_utils.Context.md#missingdoccomment)
- [report](rules_utils.Context.md#report)

## Properties

### checker

• `Readonly` **checker**: `TypeChecker`

___

### code

• `Readonly` **code**: `string`

___

### eol

• `Readonly` **eol**: `Eol`

___

### id

• `Readonly` **id**: `string`

___

### locZero

• `Readonly` **locZero**: `Position`

___

### options

• `Readonly` **options**: `O`

___

### package

• `Readonly` **package**: [`Package`](rules_utils.Package.md)

___

### path

• `Readonly` **path**: `string`

___

### scope

• `Readonly` **scope**: `Scope`

___

### source

• `Readonly` **source**: `SourceCode`

___

### subOptionsArray

• `Readonly` **subOptionsArray**: readonly `S`[]

___

### toEsNode

• `Readonly` **toEsNode**: <TValue\>(`key`: `TSNode` \| `TSToken`) => `TValue`

#### Type declaration

▸ <`TValue`\>(`key`): `TValue`

##### Type parameters

| Name | Type |
| :------ | :------ |
| `TValue` | extends `Node` |

##### Parameters

| Name | Type |
| :------ | :------ |
| `key` | `TSNode` \| `TSToken` |

##### Returns

`TValue`

___

### toTsNode

• `Readonly` **toTsNode**: <TKeyBase\>(`key`: `TKeyBase`) => `TSESTreeToTSNode`<`TKeyBase`\>

#### Type declaration

▸ <`TKeyBase`\>(`key`): `TSESTreeToTSNode`<`TKeyBase`\>

##### Type parameters

| Name | Type |
| :------ | :------ |
| `TKeyBase` | extends `Node` |

##### Parameters

| Name | Type |
| :------ | :------ |
| `key` | `TKeyBase` |

##### Returns

`TSESTreeToTSNode`<`TKeyBase`\>

## Methods

### getLeadingTrivia

▸ `Readonly` **getLeadingTrivia**(`node`): `string`

Gets leading trivia.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `node` | `Node` | Node. |

#### Returns

`string`

Leading trivia.

___

### getLocFromRange

▸ `Readonly` **getLocFromRange**(`range`): `SourceLocation`

Gets location from range.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `range` | [`ReadonlyRange`](../modules/rules_utils.md#readonlyrange) | Range. |

#### Returns

`SourceLocation`

Location.

___

### getRangeWithLeadingTrivia

▸ `Readonly` **getRangeWithLeadingTrivia**(`node`): `Range`

Gets range with leading trivia.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `node` | `Node` | Node. |

#### Returns

`Range`

Range.

___

### getText

▸ `Readonly` **getText**(`node`): `string`

Gets text.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `node` | `Node` \| `Comment` | Node. |

#### Returns

`string`

Text.

___

### getTextWithLeadingTrivia

▸ `Readonly` **getTextWithLeadingTrivia**(`node`): `string`

Gets text with leading trivia.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `node` | `Node` | Node. |

#### Returns

`string`

Text.

___

### getTypeDefinitions

▸ `Readonly` **getTypeDefinitions**(`types`): `string`

Gets type definitions as a string.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `types` | readonly `Type`[] | Types. |

#### Returns

`string`

Type definitions as a string.

___

### hasLeadingDocComment

▸ `Readonly` **hasLeadingDocComment**(`node`): `boolean`

Checks that node has leading doc comment.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `node` | `Node` | Node. |

#### Returns

`boolean`

_True_ if node has leading doc comment, _false_ otherwise.

___

### hasTrailingComment

▸ `Readonly` **hasTrailingComment**(`node`): `boolean`

Checks that node has trailing comment.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `node` | `Node` | Node. |

#### Returns

`boolean`

_True_ if node has trailing comment, _false_ otherwise.

___

### missingDocComment

▸ `Readonly` **missingDocComment**(`mixed`): `boolean`

Checks that signature or symbol is missing doc comment.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `mixed` | `Signature` \| `Symbol` | Signature or symbol. |

#### Returns

`boolean`

_True_ if signature or symbol is missing doc comment, _false_ otherwise.

___

### report

▸ `Readonly` **report**(`descriptor`): `void`

Reports error.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `descriptor` | `ReportDescriptor`<`M`\> | Descriptor. |

#### Returns

`void`
