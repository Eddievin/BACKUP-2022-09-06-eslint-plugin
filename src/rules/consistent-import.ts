import minimatch from "minimatch";
import nodePath from "path";
import type { TSESTree } from "@typescript-eslint/utils";
import { AST_NODE_TYPES } from "@typescript-eslint/utils";

import * as a from "@skylib/functions/dist/array";
import * as assert from "@skylib/functions/dist/assertions";
import * as fn from "@skylib/functions/dist/function";
import * as is from "@skylib/functions/dist/guards";
import { createValidationObject } from "@skylib/functions/dist/helpers";
import * as s from "@skylib/functions/dist/string";
import type { strings } from "@skylib/functions/dist/types/core";

import * as utils from "./utils";

type Type = "default" | "wildcard";

const TypeVO = createValidationObject<Type>({
  default: "default",
  wildcard: "wildcard"
});

const isType = is.factory(is.enumeration, TypeVO);

interface SubOptions {
  readonly altLocalNames: strings;
  readonly autoImportSource?: string;
  readonly localName?: string;
  readonly sourcePattern: string;
  readonly type: Type;
}

const isSubOptions = is.object.of.factory<SubOptions>(
  {
    altLocalNames: is.strings,
    sourcePattern: is.string,
    type: isType
  },
  { autoImportSource: is.string, localName: is.string }
);

const rule = utils.createRule({
  create(context) {
    const identifiers = new Set<string>();

    const importDeclarations: TSESTree.ImportDeclaration[] = [];

    return {
      [AST_NODE_TYPES.ImportDeclaration](node): void {
        importDeclarations.push(node);
      },
      ":not(ImportDefaultSpecifier,ImportNamespaceSpecifier,ImportSpecifier,Property) > Identifier:not(.property)"(
        node: TSESTree.Identifier
      ): void {
        identifiers.add(node.name);
      },
      "Program:exit"(program: TSESTree.Program): void {
        autoImport(program, context);
        checkImport(importDeclarations, identifiers, context);
      },
      "Property > Identifier.value"(node: TSESTree.Identifier): void {
        identifiers.add(node.name);
      }
    };
  },
  defaultSubOptions: { altLocalNames: [] },
  fixable: "code",
  isRuleOptions: is.object,
  isSubOptions,
  messages: {
    autoImport: 'Run "eslint --fix" to add missing import statement(s)',
    invalidLocalName: "Expecting local name to be {{ expectedLocalName }}",
    missingImport: "Missing import statement",
    wildcardImportDisallowed: "Wildcard import disallowed",
    wildcardImportRequired: "Wildcard import required"
  },
  subOptionsKey: "sources"
});

export = rule;

/*
|*******************************************************************************
|* Private
|*******************************************************************************
|*/

type Context = utils.Context<MessageId, object, SubOptions>;

type MessageId = utils.MessageId<typeof rule>;

/**
 * Adds missing import statements.
 *
 * @param program - Program node.
 * @param context - Context.
 */
function autoImport(program: TSESTree.Program, context: Context): void {
  const fixes = new Set<string>();

  for (const subOptions of context.subOptionsArray) {
    const localName = getLocalName(subOptions);

    for (const ref of context.scope.through)
      if (ref.identifier.name === localName) {
        fixes.add(getFix(subOptions));
        context.report({ messageId: "missingImport", node: ref.identifier });
      }
  }

  if (fixes.size)
    context.report({
      fix() {
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

    const source = normalizeSource(node.source.value, context);

    assert.string(source);

    const subOptions = context.subOptionsArray.find(candidate =>
      minimatch(source, candidate.sourcePattern, { dot: true })
    );

    if (subOptions) {
      const localName = getLocalName(subOptions);

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
                  expectedLocalName: getExpectedLocalName(
                    identifiers,
                    subOptions
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
                  expectedLocalName: getExpectedLocalName(
                    identifiers,
                    subOptions
                  )
                },
                messageId: "invalidLocalName",
                node
              });
          else context.report({ messageId: "wildcardImportRequired", node });
      }
    } else {
      if (defaultSpecifier) {
        const localName = identifierFromPath(source);

        if (defaultSpecifier.local.name === localName) {
          // Valid name
        } else
          context.report({
            data: { expectedLocalName: `"${localName}"` },
            messageId: "invalidLocalName",
            node
          });
      }

      if (wildcardSpecifier)
        context.report({ messageId: "wildcardImportDisallowed", node });
    }
  }
}

/**
 * Gets expected local name.
 *
 * @param identifiers - Identifiers.
 * @param subOptions - Suboptions.
 * @returns Expected local name.
 */
function getExpectedLocalName(
  identifiers: ReadonlySet<string>,
  subOptions: SubOptions
): string {
  const localName = getLocalName(subOptions);

  return identifiers.has(localName) && subOptions.altLocalNames.length
    ? `"${subOptions.altLocalNames.join(", ")}"`
    : `"${localName}"`;
}

/**
 * Gets fix.
 *
 * @param subOptions - Suboptions.
 * @returns Fix.
 */
function getFix(subOptions: SubOptions): string {
  const localName = getLocalName(subOptions);

  const source = getSource(subOptions);

  switch (subOptions.type) {
    case "default":
      return `import ${localName} from "${source}";`;

    case "wildcard":
      return `import * as ${localName} from "${source}";`;
  }
}

/**
 * Gets local name.
 *
 * @param subOptions - Suboptions.
 * @returns Local name.
 */
function getLocalName(subOptions: SubOptions): string {
  return subOptions.localName ?? identifierFromPath(getSource(subOptions));
}

/**
 * Gets source.
 *
 * @param subOptions - Suboptions.
 * @returns Source.
 */
function getSource(subOptions: SubOptions): string {
  return subOptions.autoImportSource ?? subOptions.sourcePattern;
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
  source = fn.run(() => {
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
