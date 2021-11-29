[ESLint plugin](../index.md) / [Exports](../modules.md) / rules/utils

# Module: rules/utils

## Table of contents

### Namespaces

- [createFileMatcher](rules_utils.createFileMatcher.md)

### Interfaces

- [Context](../interfaces/rules_utils.Context.md)
- [CreateRuleOptions](../interfaces/rules_utils.CreateRuleOptions.md)
- [GetSelectorsOptions](../interfaces/rules_utils.GetSelectorsOptions.md)
- [InvalidTestCase](../interfaces/rules_utils.InvalidTestCase.md)
- [Package](../interfaces/rules_utils.Package.md)
- [ValidTestCase](../interfaces/rules_utils.ValidTestCase.md)

### Type aliases

- [Matcher](rules_utils.md#matcher)
- [MessageId](rules_utils.md#messageid)
- [ReadonlyRange](rules_utils.md#readonlyrange)

### Variables

- [base](rules_utils.md#base)

### Functions

- [buildChildNodesMap](rules_utils.md#buildchildnodesmap)
- [createFileMatcher](rules_utils.md#createfilematcher)
- [createMatcher](rules_utils.md#creatematcher)
- [createRule](rules_utils.md#createrule)
- [getComments](rules_utils.md#getcomments)
- [getNodeId](rules_utils.md#getnodeid)
- [getPackage](rules_utils.md#getpackage)
- [getSelectors](rules_utils.md#getselectors)
- [getTypeName](rules_utils.md#gettypename)
- [getTypeNames](rules_utils.md#gettypenames)
- [isAdjacentNodes](rules_utils.md#isadjacentnodes)
- [isPackage](rules_utils.md#ispackage)
- [stripBase](rules_utils.md#stripbase)
- [testRule](rules_utils.md#testrule)

## Type aliases

### Matcher

Ƭ **Matcher**: (`str`: `string`) => `boolean`

#### Type declaration

▸ (`str`): `boolean`

##### Parameters

| Name | Type |
| :------ | :------ |
| `str` | `string` |

##### Returns

`boolean`

___

### MessageId

Ƭ **MessageId**<`T`\>: `T` extends `RuleModule`<infer I, infer \_O\> ? `I` : `never`

#### Type parameters

| Name |
| :------ |
| `T` |

___

### ReadonlyRange

Ƭ **ReadonlyRange**: readonly [`number`, `number`]

## Variables

### base

• **base**: `string`

## Functions

### buildChildNodesMap

▸ **buildChildNodesMap**(`node`, `mutableChildNodesMap`): `void`

Adds node to child nodes map.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `node` | `Node` | Node. |
| `mutableChildNodesMap` | `Map`<`string`, `Node`[]\> | Child nodes map. |

#### Returns

`void`

___

### createFileMatcher

▸ **createFileMatcher**(`patterns`, `defVal`, `options`): [`Matcher`](rules_utils.md#matcher)

Creates file matcher.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `patterns` | readonly `string`[] | Patterns. |
| `defVal` | `boolean` | Default value. |
| `options` | `Readonly`<`IOptions`\> | Minimatch options. |

#### Returns

[`Matcher`](rules_utils.md#matcher)

Matcher.

___

### createMatcher

▸ **createMatcher**(`patterns`): [`Matcher`](rules_utils.md#matcher)

Creates matcher.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `patterns` | readonly `string`[] | RegExp patterns. |

#### Returns

[`Matcher`](rules_utils.md#matcher)

Matcher.

___

### createRule

▸ **createRule**<`M`, `O`, `S`\>(`options`): `RuleModule`<`M`, readonly `unknown`[]\>

Creates rule listenter.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `M` | extends `string` |
| `O` | extends `object` |
| `S` | extends `object` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `options` | [`CreateRuleOptions`](../interfaces/rules_utils.CreateRuleOptions.md)<`M`, `O`, `S`\> | Options. |

#### Returns

`RuleModule`<`M`, readonly `unknown`[]\>

Rule listenter.

___

### getComments

▸ **getComments**(`program`): `TSESTree.Comment`[]

Gets program comments.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `program` | `Program` | Program. |

#### Returns

`TSESTree.Comment`[]

Comments.

___

### getNodeId

▸ **getNodeId**(`node`): `string`

Generates node ID.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `node` | `undefined` \| `Node` | Node. |

#### Returns

`string`

Node ID.

___

### getPackage

▸ **getPackage**(`path?`): [`Package`](../interfaces/rules_utils.Package.md)

Parses package file.

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `path` | `string` | `"package.json"` | Path. |

#### Returns

[`Package`](../interfaces/rules_utils.Package.md)

Package file data.

___

### getSelectors

▸ **getSelectors**(`options`, `defaultSelectors`): `string`

Gets selectors as a string.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `options` | [`GetSelectorsOptions`](../interfaces/rules_utils.GetSelectorsOptions.md) | Options. |
| `defaultSelectors` | readonly `string`[] | Default selectors. |

#### Returns

`string`

Selectors as a string.

___

### getTypeName

▸ **getTypeName**(`type`): `string`

Gets type name.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `type` | `Type` | Type. |

#### Returns

`string`

Type name.

___

### getTypeNames

▸ **getTypeNames**(`types`): `string`

Gets type names as a string.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `types` | readonly `Type`[] | Types. |

#### Returns

`string`

Type names as a string.

___

### isAdjacentNodes

▸ **isAdjacentNodes**(`node1`, `node2`, `childNodesMap`): `boolean`

Checks if two nodes are adjacent.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `node1` | `Node` | Node 1. |
| `node2` | `Node` | Node 2. |
| `childNodesMap` | `ReadonlyMap`<`string`, readonly `Node`[]\> | Child nodes map. |

#### Returns

`boolean`

_True_ if two nodes are adjacent, _false_ otherwise.

___

### isPackage

▸ `Const` **isPackage**(`value`): value is Package

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `unknown` |

#### Returns

value is Package

___

### stripBase

▸ **stripBase**(`path`, `replacement?`): `string`

Strips base path.

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `path` | `string` | `undefined` | Path. |
| `replacement` | `string` | `""` | Replacement. |

#### Returns

`string`

Stripped path.

___

### testRule

▸ **testRule**<`M`\>(`name`, `rule`, `invalid`, `valid?`): `void`

Runs test.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `M` | extends `string` |

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `name` | `string` | `undefined` | Rule name. |
| `rule` | `RuleModule`<`M`, readonly [`object`], `RuleListener`\> | `undefined` | Rule. |
| `invalid` | readonly [`InvalidTestCase`](../interfaces/rules_utils.InvalidTestCase.md)<`M`\>[] | `undefined` | Invalid tests. |
| `valid` | readonly [`ValidTestCase`](../interfaces/rules_utils.ValidTestCase.md)[] | `[]` | Valid tests. |

#### Returns

`void`
