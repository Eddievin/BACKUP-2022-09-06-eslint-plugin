[ESLint plugin](../index.md) / [Exports](../modules.md) / [rules/utils](rules_utils.md) / createFileMatcher

# Namespace: createFileMatcher

[rules/utils](rules_utils.md).createFileMatcher

## Table of contents

### Functions

- [disallowAllow](rules_utils.createFileMatcher.md#disallowallow)

## Functions

### disallowAllow

▸ **disallowAllow**(`disallow`, `allow`, `defVal`, `options`): [`Matcher`](../interfaces/rules_utils.Matcher.md)

Creates file matcher.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `disallow` | readonly `string`[] | Disallow patterns. |
| `allow` | readonly `string`[] | Allow patterns. |
| `defVal` | `boolean` | Default value. |
| `options` | `Readonly`<`IOptions`\> | Minimatch options. |

#### Returns

[`Matcher`](../interfaces/rules_utils.Matcher.md)

Matcher.
