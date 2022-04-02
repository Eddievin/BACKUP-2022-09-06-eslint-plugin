[ESLint plugin](../index.md) / [Exports](../modules.md) / [rules/utils](../modules/rules_utils.md) / InvalidTestCase

# Interface: InvalidTestCase<M\>

[rules/utils](../modules/rules_utils.md).InvalidTestCase

## Type parameters

| Name | Type |
| :------ | :------ |
| `M` | extends `string` |

## Hierarchy

- `InvalidTestCase`<`M`, readonly [`object`]\>

  ↳ **`InvalidTestCase`**

## Table of contents

### Properties

- [code](rules_utils.InvalidTestCase.md#code)
- [env](rules_utils.InvalidTestCase.md#env)
- [errors](rules_utils.InvalidTestCase.md#errors)
- [filename](rules_utils.InvalidTestCase.md#filename)
- [globals](rules_utils.InvalidTestCase.md#globals)
- [name](rules_utils.InvalidTestCase.md#name)
- [only](rules_utils.InvalidTestCase.md#only)
- [options](rules_utils.InvalidTestCase.md#options)
- [output](rules_utils.InvalidTestCase.md#output)
- [parser](rules_utils.InvalidTestCase.md#parser)
- [parserOptions](rules_utils.InvalidTestCase.md#parseroptions)
- [settings](rules_utils.InvalidTestCase.md#settings)

## Properties

### code

• `Readonly` **code**: `string`

Code for the test case.

#### Inherited from

BaseInvalidTestCase.code

___

### env

• `Optional` `Readonly` **env**: `Readonly`<`Record`<`string`, `boolean`\>\>

Environments for the test case.

#### Inherited from

BaseInvalidTestCase.env

___

### errors

• `Readonly` **errors**: readonly `TestCaseError`<`M`\>[]

Expected errors.

#### Inherited from

BaseInvalidTestCase.errors

___

### filename

• `Optional` `Readonly` **filename**: `string`

The fake filename for the test case. Useful for rules that make assertion about filenames.

#### Inherited from

BaseInvalidTestCase.filename

___

### globals

• `Optional` `Readonly` **globals**: `Record`<`string`, ``true`` \| ``"readonly"`` \| ``"writable"`` \| ``"off"``\>

The additional global variables.

#### Inherited from

BaseInvalidTestCase.globals

___

### name

• **name**: `string`

#### Overrides

BaseInvalidTestCase.name

___

### only

• `Optional` `Readonly` **only**: `boolean`

Run this case exclusively for debugging in supported test frameworks.

#### Inherited from

BaseInvalidTestCase.only

___

### options

• `Optional` `Readonly` **options**: readonly [`object`]

Options for the test case.

#### Inherited from

BaseInvalidTestCase.options

___

### output

• `Optional` `Readonly` **output**: ``null`` \| `string`

The expected code after autofixes are applied. If set to `null`, the test runner will assert that no autofix is suggested.

#### Inherited from

BaseInvalidTestCase.output

___

### parser

• `Optional` `Readonly` **parser**: `string`

The absolute path for the parser.

#### Inherited from

BaseInvalidTestCase.parser

___

### parserOptions

• `Optional` `Readonly` **parserOptions**: `Readonly`<`ParserOptions`\>

Options for the parser.

#### Inherited from

BaseInvalidTestCase.parserOptions

___

### settings

• `Optional` `Readonly` **settings**: `Readonly`<`SharedConfigurationSettings`\>

Settings for the test case.

#### Inherited from

BaseInvalidTestCase.settings
