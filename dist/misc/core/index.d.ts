export declare const core: {
    readonly "comment-spacing": import("@typescript-eslint/utils/dist/ts-eslint/Rule").RuleModule<import("./comment-spacing").MessageId, [object & {}], import("@typescript-eslint/utils/dist/ts-eslint/Rule").RuleListener>;
    readonly "consistent-empty-lines": import("@typescript-eslint/utils/dist/ts-eslint/Rule").RuleModule<import("./consistent-empty-lines").MessageId, [object & {
        readonly rules?: readonly Partial<import("./consistent-empty-lines").SubOptions & import("../../utils").SharedOptions2>[];
    }], import("@typescript-eslint/utils/dist/ts-eslint/Rule").RuleListener>;
    readonly "consistent-enum-members": import("@typescript-eslint/utils/dist/ts-eslint/Rule").RuleModule<import("./consistent-enum-members").MessageId, [Partial<{
        selector: never[];
    }> & {}], import("@typescript-eslint/utils/dist/ts-eslint/Rule").RuleListener>;
    readonly "consistent-filename": import("@typescript-eslint/utils/dist/ts-eslint/Rule").RuleModule<import("./consistent-filename").MessageId, [Partial<import("./consistent-filename").Options> & {
        readonly overrides?: readonly Partial<import("./consistent-filename").SubOptions & import("../../utils").SharedOptions2>[];
    }], import("@typescript-eslint/utils/dist/ts-eslint/Rule").RuleListener>;
    readonly "consistent-import": import("@typescript-eslint/utils/dist/ts-eslint/Rule").RuleModule<import("./consistent-import").MessageId, [object & {
        readonly sources?: readonly Partial<import("./consistent-import").SubOptions & import("../../utils").SharedOptions2>[];
    }], import("@typescript-eslint/utils/dist/ts-eslint/Rule").RuleListener>;
    readonly "consistent-optional-props": import("@typescript-eslint/utils/dist/ts-eslint/Rule").RuleModule<import("./consistent-optional-props").MessageId, [Partial<import("./consistent-optional-props").Options> & {
        readonly overrides?: readonly Partial<import("./consistent-optional-props").SubOptions & import("../../utils").SharedOptions2>[];
    }], import("@typescript-eslint/utils/dist/ts-eslint/Rule").RuleListener>;
    readonly "disallow-import": import("@typescript-eslint/utils/dist/ts-eslint/Rule").RuleModule<import("./disallow-import").MessageId, [Partial<import("./disallow-import").Options> & {}], import("@typescript-eslint/utils/dist/ts-eslint/Rule").RuleListener>;
    readonly "export-all-name": import("@typescript-eslint/utils/dist/ts-eslint/Rule").RuleModule<import("./export-all-name").MessageId, [object & {}], import("@typescript-eslint/utils/dist/ts-eslint/Rule").RuleListener>;
    readonly "match-filename": import("@typescript-eslint/utils/dist/ts-eslint/Rule").RuleModule<import("./match-filename").MessageId, [Partial<import("./match-filename").Options> & {}], import("@typescript-eslint/utils/dist/ts-eslint/Rule").RuleListener>;
    readonly "no-expression-empty-lines": import("@typescript-eslint/utils/dist/ts-eslint/Rule").RuleModule<import("./no-expression-empty-lines").MessageId, [object & {}], import("@typescript-eslint/utils/dist/ts-eslint/Rule").RuleListener>;
    readonly "no-self-import": import("@typescript-eslint/utils/dist/ts-eslint/Rule").RuleModule<import("./no-self-import").MessageId, [Partial<import("./no-self-import").Options> & {}], import("@typescript-eslint/utils/dist/ts-eslint/Rule").RuleListener>;
    readonly "no-sibling-import": import("@typescript-eslint/utils/dist/ts-eslint/Rule").RuleModule<import("./no-sibling-import").MessageId, [Partial<import("./no-sibling-import").Options> & {}], import("@typescript-eslint/utils/dist/ts-eslint/Rule").RuleListener>;
    readonly "object-format": import("@typescript-eslint/utils/dist/ts-eslint/Rule").RuleModule<import("./object-format").MessageId, [Partial<import("./object-format").Options> & {}], import("@typescript-eslint/utils/dist/ts-eslint/Rule").RuleListener>;
    readonly "only-export-name": import("@typescript-eslint/utils/dist/ts-eslint/Rule").RuleModule<import("./only-export-name").MessageId, [object & {}], import("@typescript-eslint/utils/dist/ts-eslint/Rule").RuleListener>;
    readonly "prefer-only-export": import("@typescript-eslint/utils/dist/ts-eslint/Rule").RuleModule<import("./prefer-only-export").MessageId, [Partial<import("./prefer-only-export").Options> & {}], import("@typescript-eslint/utils/dist/ts-eslint/Rule").RuleListener>;
    readonly "require-jsdoc": import("@typescript-eslint/utils/dist/ts-eslint/Rule").RuleModule<import("./require-jsdoc").MessageId, [Partial<import("./require-jsdoc").Options> & {}], import("@typescript-eslint/utils/dist/ts-eslint/Rule").RuleListener>;
    readonly "require-syntax": import("@typescript-eslint/utils/dist/ts-eslint/Rule").RuleModule<import("./require-syntax").MessageId, [Partial<import("./require-syntax").Options> & {}], import("@typescript-eslint/utils/dist/ts-eslint/Rule").RuleListener>;
    readonly "restrict-syntax": import("@typescript-eslint/utils/dist/ts-eslint/Rule").RuleModule<import("./restrict-syntax").MessageId, [Partial<import("./restrict-syntax").Options> & {}], import("@typescript-eslint/utils/dist/ts-eslint/Rule").RuleListener>;
    readonly "sort-array": import("@typescript-eslint/utils/dist/ts-eslint/Rule").RuleModule<import("../../utils/sort.internal").MessageId | import("./sort-array").MessageId, [Partial<import("./sort-array").Options> & {}], import("@typescript-eslint/utils/dist/ts-eslint/Rule").RuleListener>;
    readonly "sort-class-members": import("@typescript-eslint/utils/dist/ts-eslint/Rule").RuleModule<import("../../utils/sort.internal").MessageId, [Partial<import("./sort-class-members").Options> & {}], import("@typescript-eslint/utils/dist/ts-eslint/Rule").RuleListener>;
    readonly "sort-keys": import("@typescript-eslint/utils/dist/ts-eslint/Rule").RuleModule<import("../../utils/sort.internal").MessageId | import("./sort-keys").MessageId, [object & {
        readonly overrides?: readonly Partial<import("./sort-keys").SubOptions & import("../../utils").SharedOptions2>[];
    }], import("@typescript-eslint/utils/dist/ts-eslint/Rule").RuleListener>;
    readonly "sort-statements": import("@typescript-eslint/utils/dist/ts-eslint/Rule").RuleModule<import("../../utils/sort.internal").MessageId, [Partial<import("./sort-statements").Options> & {}], import("@typescript-eslint/utils/dist/ts-eslint/Rule").RuleListener>;
    readonly "switch-case-spacing": import("@typescript-eslint/utils/dist/ts-eslint/Rule").RuleModule<import("./switch-case-spacing").MessageId, [object & {}], import("@typescript-eslint/utils/dist/ts-eslint/Rule").RuleListener>;
    readonly "template-literal-format": import("@typescript-eslint/utils/dist/ts-eslint/Rule").RuleModule<import("./template-literal-format").MessageId, [object & {}], import("@typescript-eslint/utils/dist/ts-eslint/Rule").RuleListener>;
    readonly wrap: import("@typescript-eslint/utils/dist/ts-eslint/Rule").RuleModule<import("./wrap").MessageId, [Partial<import("./wrap").Options> & {}], import("@typescript-eslint/utils/dist/ts-eslint/Rule").RuleListener>;
};
//# sourceMappingURL=index.d.ts.map