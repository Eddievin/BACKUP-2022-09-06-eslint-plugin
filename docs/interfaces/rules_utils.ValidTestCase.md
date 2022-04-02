[ESLint plugin](../index.md) / [Exports](../modules.md) / [rules/utils](../modules/rules_utils.md) / ValidTestCase

# Interface: ValidTestCase

[rules/utils](../modules/rules_utils.md).ValidTestCase

## Hierarchy

- `ValidTestCase`<readonly [`object`]\>

  ↳ **`ValidTestCase`**

## Table of contents

### Properties

- [code](rules_utils.ValidTestCase.md#code)
- [env](rules_utils.ValidTestCase.md#env)
- [filename](rules_utils.ValidTestCase.md#filename)
- [globals](rules_utils.ValidTestCase.md#globals)
- [name](rules_utils.ValidTestCase.md#name)
- [only](rules_utils.ValidTestCase.md#only)
- [options](rules_utils.ValidTestCase.md#options)
- [parser](rules_utils.ValidTestCase.md#parser)
- [parserOptions](rules_utils.ValidTestCase.md#parseroptions)
- [settings](rules_utils.ValidTestCase.md#settings)

## Properties

### code

• `Readonly` **code**: `string`

Code for the test case.

#### Inherited from

BaseValidTestCase.code

___

### env

• `Optional` `Readonly` **env**: `Readonly`<`Record`<`string`, `boolean`\>\>

Environments for the test case.

#### Inherited from

BaseValidTestCase.env

___

### filename

• `Optional` `Readonly` **filename**: `string`

The fake filename for the test case. Useful for rules that make assertion about filenames.

#### Inherited from

BaseValidTestCase.filename

___

### globals

• `Optional` `Readonly` **globals**: `Record`<`string`, ``true`` \| ``"readonly"`` \| ``"writable"`` \| ``"off"``\>

The additional global variables.

#### Inherited from

BaseValidTestCase.globals

___

### name

• **name**: `string`

#### Overrides

BaseValidTestCase.name

___

### only

• `Optional` `Readonly` **only**: `boolean`

Run this case exclusively for debugging in supported test frameworks.

#### Inherited from

BaseValidTestCase.only

___

### options

• `Optional` `Readonly` **options**: readonly [`object`]

Options for the test case.

#### Inherited from

BaseValidTestCase.options

___

### parser

• `Optional` `Readonly` **parser**: `string`

The absolute path for the parser.

#### Inherited from

BaseValidTestCase.parser

___

### parserOptions

• `Optional` `Readonly` **parserOptions**: `Readonly`<`ParserOptions`\>

Options for the parser.

#### Inherited from

BaseValidTestCase.parserOptions

___

### settings

• `Optional` `Readonly` **settings**: `Readonly`<`SharedConfigurationSettings`\>

Settings for the test case.

#### Inherited from

BaseValidTestCase.settings
