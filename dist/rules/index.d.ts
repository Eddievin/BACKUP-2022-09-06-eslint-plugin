import * as utils from "./utils";
export * as utils from "./utils";
export declare const rules: {
    "array-callback-return-type": import("@typescript-eslint/utils/dist/ts-eslint/Rule").RuleModule<import("./array-callback-return-type").MessageId, [Partial<object & utils.SharedOptions1> & {}], import("@typescript-eslint/utils/dist/ts-eslint/Rule").RuleListener>;
    "consistent-empty-lines": import("@typescript-eslint/utils/dist/ts-eslint/Rule").RuleModule<import("./consistent-empty-lines").MessageId, [Partial<object & utils.SharedOptions1> & {
        readonly rules?: readonly Partial<import("./consistent-empty-lines").SubOptions & utils.SharedOptions2>[];
    }], import("@typescript-eslint/utils/dist/ts-eslint/Rule").RuleListener>;
    "consistent-filename": import("@typescript-eslint/utils/dist/ts-eslint/Rule").RuleModule<import("./consistent-filename").MessageId, [Partial<import("./consistent-filename").Options & utils.SharedOptions1> & {
        readonly overrides?: readonly Partial<import("./consistent-filename").SubOptions & utils.SharedOptions2>[];
    }], import("@typescript-eslint/utils/dist/ts-eslint/Rule").RuleListener>;
    "consistent-group-empty-lines": import("@typescript-eslint/utils/dist/ts-eslint/Rule").RuleModule<import("./consistent-group-empty-lines").MessageId, [Partial<object & utils.SharedOptions1> & {
        readonly rules?: readonly Partial<import("./consistent-group-empty-lines").SubOptions & utils.SharedOptions2>[];
    }], import("@typescript-eslint/utils/dist/ts-eslint/Rule").RuleListener>;
    "consistent-import": import("@typescript-eslint/utils/dist/ts-eslint/Rule").RuleModule<import("./consistent-import").MessageId, [Partial<object & utils.SharedOptions1> & {
        readonly sources?: readonly Partial<import("./consistent-import").SubOptions & utils.SharedOptions2>[];
    }], import("@typescript-eslint/utils/dist/ts-eslint/Rule").RuleListener>;
    "consistent-optional-props": import("@typescript-eslint/utils/dist/ts-eslint/Rule").RuleModule<import("./consistent-optional-props").MessageId.combined | import("./consistent-optional-props").MessageId.optional | import("./consistent-optional-props").MessageId.optionalId | import("./consistent-optional-props").MessageId.undefined | import("./consistent-optional-props").MessageId.undefinedId | "combinedId", [Partial<import("./consistent-optional-props").Options & utils.SharedOptions1> & {
        readonly overrides?: readonly Partial<import("./consistent-optional-props").SubOptions & utils.SharedOptions2>[];
    }], import("@typescript-eslint/utils/dist/ts-eslint/Rule").RuleListener>;
    custom: import("@typescript-eslint/utils/dist/ts-eslint/Rule").RuleModule<import("./custom").MessageId, [Partial<import("./custom").Options & utils.SharedOptions1> & {}], import("@typescript-eslint/utils/dist/ts-eslint/Rule").RuleListener>;
    "disallow-import": import("@typescript-eslint/utils/dist/ts-eslint/Rule").RuleModule<import("./disallow-import").MessageId, [Partial<import("./disallow-import").Options & utils.SharedOptions1> & {
        readonly exclusions?: readonly Partial<import("./disallow-import").SubOptions & utils.SharedOptions2>[];
    }], import("@typescript-eslint/utils/dist/ts-eslint/Rule").RuleListener>;
    "empty-lines-around-comment": import("@typescript-eslint/utils/dist/ts-eslint/Rule").RuleModule<import("./empty-lines-around-comment").MessageId, [Partial<object & utils.SharedOptions1> & {}], import("@typescript-eslint/utils/dist/ts-eslint/Rule").RuleListener>;
    "exhaustive-switch": import("@typescript-eslint/utils/dist/ts-eslint/Rule").RuleModule<import("./exhaustive-switch").MessageId, [Partial<object & utils.SharedOptions1> & {}], import("@typescript-eslint/utils/dist/ts-eslint/Rule").RuleListener>;
    "export-all-name": import("@typescript-eslint/utils/dist/ts-eslint/Rule").RuleModule<import("./export-all-name").MessageId, [Partial<object & utils.SharedOptions1> & {}], import("@typescript-eslint/utils/dist/ts-eslint/Rule").RuleListener>;
    "match-filename": import("@typescript-eslint/utils/dist/ts-eslint/Rule").RuleModule<import("./match-filename").MessageId, [Partial<import("./match-filename").Options & utils.SharedOptions1> & {}], import("@typescript-eslint/utils/dist/ts-eslint/Rule").RuleListener>;
    "no-expression-empty-lines": import("@typescript-eslint/utils/dist/ts-eslint/Rule").RuleModule<import("./no-expression-empty-lines").MessageId, [Partial<object & utils.SharedOptions1> & {}], import("@typescript-eslint/utils/dist/ts-eslint/Rule").RuleListener>;
    "no-inferrable-types": import("@typescript-eslint/utils/dist/ts-eslint/Rule").RuleModule<import("./no-inferrable-types").MessageId, [Partial<object & utils.SharedOptions1> & {}], import("@typescript-eslint/utils/dist/ts-eslint/Rule").RuleListener>;
    "no-multi-type-tuples": import("@typescript-eslint/utils/dist/ts-eslint/Rule").RuleModule<import("./no-multi-type-tuples").MessageId, [Partial<object & utils.SharedOptions1> & {}], import("@typescript-eslint/utils/dist/ts-eslint/Rule").RuleListener>;
    "no-self-import": import("@typescript-eslint/utils/dist/ts-eslint/Rule").RuleModule<import("./no-self-import").MessageId, [Partial<import("./no-self-import").Options & utils.SharedOptions1> & {}], import("@typescript-eslint/utils/dist/ts-eslint/Rule").RuleListener>;
    "no-unsafe-object-assignment": import("@typescript-eslint/utils/dist/ts-eslint/Rule").RuleModule<import("./no-unsafe-object-assignment").MessageId, [Partial<object & utils.SharedOptions1> & {}], import("@typescript-eslint/utils/dist/ts-eslint/Rule").RuleListener>;
    "object-format": import("@typescript-eslint/utils/dist/ts-eslint/Rule").RuleModule<import("./object-format").MessageId, [Partial<import("./object-format").Options & utils.SharedOptions1> & {}], import("@typescript-eslint/utils/dist/ts-eslint/Rule").RuleListener>;
    "only-export-name": import("@typescript-eslint/utils/dist/ts-eslint/Rule").RuleModule<import("./only-export-name").MessageId, [Partial<object & utils.SharedOptions1> & {}], import("@typescript-eslint/utils/dist/ts-eslint/Rule").RuleListener>;
    "prefer-only-export": import("@typescript-eslint/utils/dist/ts-eslint/Rule").RuleModule<import("./prefer-only-export").MessageId, [Partial<object & utils.SharedOptions1> & {}], import("@typescript-eslint/utils/dist/ts-eslint/Rule").RuleListener>;
    "primary-export-only": import("@typescript-eslint/utils/dist/ts-eslint/Rule").RuleModule<import("./primary-export-only").MessageId, [Partial<object & utils.SharedOptions1> & {}], import("@typescript-eslint/utils/dist/ts-eslint/Rule").RuleListener>;
    "require-jsdoc": import("@typescript-eslint/utils/dist/ts-eslint/Rule").RuleModule<import("./require-jsdoc").MessageId, [Partial<import("./require-jsdoc").Options & utils.SharedOptions1> & {}], import("@typescript-eslint/utils/dist/ts-eslint/Rule").RuleListener>;
    "sort-array": import("@typescript-eslint/utils/dist/ts-eslint/Rule").RuleModule<import("./utils/sort.internal").MessageId | import("./sort-array").MessageId, [Partial<import("./sort-array").Options & utils.SharedOptions1> & {}], import("@typescript-eslint/utils/dist/ts-eslint/Rule").RuleListener>;
    "sort-class-members": import("@typescript-eslint/utils/dist/ts-eslint/Rule").RuleModule<import("./sort-class-members").MessageId, [Partial<import("./sort-class-members").Options & utils.SharedOptions1> & {}], import("@typescript-eslint/utils/dist/ts-eslint/Rule").RuleListener>;
    "sort-keys": import("@typescript-eslint/utils/dist/ts-eslint/Rule").RuleModule<import("./utils/sort.internal").MessageId | import("./sort-keys").MessageId, [Partial<object & utils.SharedOptions1> & {
        readonly overrides?: readonly Partial<import("./sort-keys").SubOptions & utils.SharedOptions2>[];
    }], import("@typescript-eslint/utils/dist/ts-eslint/Rule").RuleListener>;
    "statements-order": import("@typescript-eslint/utils/dist/ts-eslint/Rule").RuleModule<import("./statements-order").MessageId, [Partial<import("./statements-order").Options & utils.SharedOptions1> & {}], import("@typescript-eslint/utils/dist/ts-eslint/Rule").RuleListener>;
    "switch-case-empty-lines": import("@typescript-eslint/utils/dist/ts-eslint/Rule").RuleModule<import("./switch-case-empty-lines").MessageId, [Partial<object & utils.SharedOptions1> & {}], import("@typescript-eslint/utils/dist/ts-eslint/Rule").RuleListener>;
    "template-literal-format": import("@typescript-eslint/utils/dist/ts-eslint/Rule").RuleModule<import("./template-literal-format").MessageId, [Partial<object & utils.SharedOptions1> & {}], import("@typescript-eslint/utils/dist/ts-eslint/Rule").RuleListener>;
};
//# sourceMappingURL=index.d.ts.map