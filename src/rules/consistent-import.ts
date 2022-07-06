import * as utils from "./utils";
import {
  a,
  as,
  assert,
  createValidationObject,
  evaluate,
  is,
  s
} from "@skylib/functions";
import { AST_NODE_TYPES } from "@typescript-eslint/utils";
import minimatch from "minimatch";
import nodePath from "node:path";
import type { strings } from "@skylib/functions";
import type { TSESTree } from "@typescript-eslint/utils";
import type { RuleListener } from "@typescript-eslint/utils/dist/ts-eslint";

export const consistentImport = utils.createRule({
  create: (context): RuleListener => {
    const identifiers = new Set<string>();

    // eslint-disable-next-line @skylib/custom/prefer-readonly-array -- Postponed
    const importDeclarations: TSESTree.ImportDeclaration[] = [];

    return {
      [AST_NODE_TYPES.ImportDeclaration]: (node): void => {
        importDeclarations.push(node);
      },
      ":not(ImportDefaultSpecifier,ImportNamespaceSpecifier,ImportSpecifier,Property) > Identifier:not(.property)":
        (node: TSESTree.Identifier): void => {
          identifiers.add(node.name);
        },
      "Program:exit": (program: TSESTree.Program): void => {
        autoImportFn(program, context);
        checkImport(importDeclarations, identifiers, context);
      },
      "Property > Identifier.value": (node: TSESTree.Identifier): void => {
        identifiers.add(node.name);
      }
    };
  },
  defaultSubOptions: { altLocalNames: [] },
  fixable: "code",
  isRuleOptions: is.object,
  isSubOptions: evaluate(() => {
    const TypeVO = createValidationObject<Type>({
      default: "default",
      wildcard: "wildcard"
    });

    const isType = is.factory(is.enumeration, TypeVO);

    return is.object.factory<SubOptions>(
      {
        _id: is.string,
        altLocalNames: is.strings,
        source: is.string,
        type: isType
      },
      {
        autoImport: is.boolean,
        autoImportSource: is.string,
        localName: is.string,
        sourcePattern: is.string
      }
    );
  }),
  messages: {
    autoImport:
      'Run "eslint --fix" to add missing import statement(s) ({{ _id }})',
    invalidLocalName:
      "Expecting local name to be {{ expectedLocalName }} ({{ _id }})",
    missingImport: "Missing import statement ({{ _id }})",
    wildcardImportDisallowed: "Wildcard import disallowed ({{ _id }})",
    wildcardImportRequired: "Wildcard import required ({{ _id }})"
  },
  name: "consistent-import",
  subOptionsKey: "sources"
});

type Context = utils.Context<MessageId, object, SubOptions>;

type MessageId = utils.MessageId<typeof consistentImport>;

interface SubOptions {
  readonly _id: string;
  readonly altLocalNames: strings;
  readonly autoImport?: boolean;
  readonly autoImportSource?: string;
  readonly localName?: string;
  readonly source: string;
  readonly sourcePattern?: string;
  readonly type: Type;
}

type Type = "default" | "wildcard";

/**
 * Adds missing import statements.
 *
 * @param program - Program node.
 * @param context - Context.
 */
function autoImportFn(program: TSESTree.Program, context: Context): void {
  const fixes = new Set<string>();

  for (const subOptions of context.subOptionsArray) {
    const { autoImport, autoImportSource, localName } = {
      autoImport: false,
      autoImportSource: subOptions.source,
      localName: utils.getNameFromFilename(subOptions.source),
      ...subOptions
    };

    if (autoImport)
      for (const ref of context.scope.through)
        if (ref.identifier.name === localName) {
          context.report({ messageId: "missingImport", node: ref.identifier });

          switch (subOptions.type) {
            case "default":
              fixes.add(`import ${localName} from "${autoImportSource}";`);

              break;

            case "wildcard":
              fixes.add(`import * as ${localName} from "${autoImportSource}";`);
          }
        }
  }

  if (fixes.size > 0)
    context.report({
      fix: () => {
        const fix = a.fromIterable(fixes).join(context.eol);

        return [
          {
            range: program.range,
            text: `${fix}${context.eol}${context.getText(program)}`
          }
        ];
      },
      loc: context.locZero,
      messageId: "autoImport"
    });
}

/**
 * Checks import.
 *
 * @param importDeclarations - Import declarations.
 * @param identifiers - Identifiers.
 * @param context - Context.
 */
function checkImport(
  importDeclarations: readonly TSESTree.ImportDeclaration[],
  identifiers: ReadonlySet<string>,
  context: Context
): void {
  for (const node of importDeclarations) {
    const defaultSpecifier = node.specifiers.find(
      specifier => specifier.type === AST_NODE_TYPES.ImportDefaultSpecifier
    );

    const wildcardSpecifier = node.specifiers.find(
      specifier => specifier.type === AST_NODE_TYPES.ImportNamespaceSpecifier
    );

    const source = as.string(normalizeSource(node.source.value, context));

    const subOptions = context.subOptionsArray.find(candidate =>
      minimatch(source, candidate.sourcePattern ?? candidate.source, {
        dot: true
      })
    );

    if (subOptions) {
      const localName = subOptions.localName ?? identifierFromPath(source);

      switch (subOptions.type) {
        case "default":
          if (defaultSpecifier)
            if (defaultSpecifier.local.name === localName) {
              // Valid name
            } else if (
              identifiers.has(localName) &&
              subOptions.altLocalNames.includes(defaultSpecifier.local.name)
            ) {
              // Valid alt name
            } else
              context.report({
                data: {
                  _id: subOptions._id,
                  expectedLocalName: getExpectedLocalName(
                    localName,
                    subOptions.altLocalNames,
                    identifiers
                  )
                },
                messageId: "invalidLocalName",
                node
              });

          if (wildcardSpecifier)
            context.report({ messageId: "wildcardImportDisallowed", node });

          break;

        case "wildcard":
          if (wildcardSpecifier)
            if (wildcardSpecifier.local.name === localName) {
              // Valid name
            } else if (
              identifiers.has(localName) &&
              subOptions.altLocalNames.includes(wildcardSpecifier.local.name)
            ) {
              // Valid alt name
            } else
              context.report({
                data: {
                  _id: subOptions._id,
                  expectedLocalName: getExpectedLocalName(
                    localName,
                    subOptions.altLocalNames,
                    identifiers
                  )
                },
                messageId: "invalidLocalName",
                node
              });
          else context.report({ messageId: "wildcardImportRequired", node });
      }
    }
  }
}

/**
 * Gets expected local name.
 *
 * @param localName - Local name.
 * @param altLocalNames - Alt names.
 * @param identifiers - Identifiers.
 * @returns Expected local name.
 */
function getExpectedLocalName(
  localName: string,
  altLocalNames: strings,
  identifiers: ReadonlySet<string>
): string {
  return identifiers.has(localName) && altLocalNames.length > 0
    ? `"${altLocalNames.join(", ")}"`
    : `"${localName}"`;
}

/**
 * Creates identifier from path.
 *
 * @param path - Path.
 * @returns Identifier.
 */
function identifierFromPath(path: string): string {
  return nodePath
    .basename(path)
    .split(".")
    .filter(part => part.length)
    .slice(0, 1)
    .join(",")
    .replace(/\W\w/gu, substr => substr.slice(1, 2).toUpperCase())
    .replace(/\W/gu, "");
}

/**
 * Gets normalized source.
 *
 * @param source - Source.
 * @param context - Context.
 * @returns Normalized source.
 */
function normalizeSource(source: string, context: Context): string {
  source = evaluate(() => {
    if (source === "@") {
      assert.not.empty(context.package.name, "Missing package name");

      return `${context.package.name}`;
    }

    if (source.startsWith("@/")) {
      assert.not.empty(context.package.name, "Missing package name");

      const path = `src/${source.slice(2)}`;

      return `${context.package.name}/${path}`;
    }

    if (
      source === "." ||
      source === ".." ||
      source.startsWith("./") ||
      source.startsWith("../")
    ) {
      assert.not.empty(context.package.name, "Missing package name");

      const path = utils.stripBase(
        nodePath.join(nodePath.dirname(context.path), source)
      );

      return `${context.package.name}/${path}`;
    }

    return source;
  });

  return s.path.canonicalize(source);
}
