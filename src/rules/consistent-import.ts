import * as _ from "@skylib/lodash-commonjs-es";
import * as utils from "./utils";
import type {
  RuleFix,
  RuleListener
} from "@typescript-eslint/utils/dist/ts-eslint";
import { a, assert, evaluate, is, s } from "@skylib/functions";
import { AST_NODE_TYPES } from "@typescript-eslint/utils";
import type { TSESTree } from "@typescript-eslint/utils";
import minimatch from "minimatch";
import nodePath from "node:path";
import type { strings } from "@skylib/functions";

export interface SubOptions {
  readonly _id: string;
  readonly altLocalNames: strings;
  readonly autoImport: boolean;
  readonly autoImportSource?: string;
  readonly localName?: string;
  readonly source: string;
  readonly sourcePattern?: string;
  readonly type: Type;
}

export enum MessageId {
  autoImport = "autoImport",
  invalidLocalName = "invalidLocalName",
  missingImport = "missingImport",
  wildcardImportDisallowed = "wildcardImportDisallowed",
  wildcardImportRequired = "wildcardImportRequired"
}

export enum Type {
  default = "default",
  wildcard = "wildcard"
}

export const isType = is.factory(is.enumeration, Type);

export const consistentImport = utils.createRule({
  name: "consistent-import",
  fixable: utils.Fixable.code,
  isSubOptions: is.object.factory<SubOptions>(
    {
      _id: is.string,
      altLocalNames: is.strings,
      autoImport: is.boolean,
      source: is.string,
      type: isType
    },
    {
      autoImportSource: is.string,
      localName: is.string,
      sourcePattern: is.string
    }
  ),
  defaultSubOptions: { altLocalNames: [], autoImport: false },
  subOptionsKey: "sources",
  messages: {
    [MessageId.autoImport]:
      'Run "eslint --fix" to add missing import statement(s)',
    [MessageId.invalidLocalName]:
      "Expecting local name to be {{expectedLocalName}} ({{_id}})",
    [MessageId.missingImport]: "Missing import statement",
    [MessageId.wildcardImportDisallowed]:
      "Wildcard import disallowed ({{_id}})",
    [MessageId.wildcardImportRequired]: "Wildcard import required ({{_id}})"
  },
  create: (context): RuleListener => {
    const identifiers = new Set<string>();

    // eslint-disable-next-line @skylib/custom/prefer-readonly-array -- Postponed
    const importDeclarations: TSESTree.ImportDeclaration[] = [];

    return {
      ":not(ImportDefaultSpecifier, ImportNamespaceSpecifier, ImportSpecifier, Property) > Identifier:not(.property)":
        (node: TSESTree.Identifier): void => {
          identifiers.add(node.name);
        },
      "ImportDeclaration": (node): void => {
        importDeclarations.push(node);
      },
      "Program:exit": (program: TSESTree.Program): void => {
        autoImportFn(program);
        checkImport();
      },
      "Property > Identifier.value": (node: TSESTree.Identifier): void => {
        identifiers.add(node.name);
      }
    };

    function autoImportFn(program: TSESTree.Program): void {
      const fixes = _.uniq(
        a.fromIterable(
          evaluate(function* (): Generator<string> {
            for (const subOptions of context.subOptionsArray) {
              const { autoImport, autoImportSource, localName } = {
                autoImportSource: subOptions.source,
                localName: utils.getIdentifierFromPath(subOptions.source),
                ...subOptions
              };

              if (autoImport)
                for (const ref of context.scope.through)
                  if (ref.identifier.name === localName) {
                    context.report({
                      messageId: MessageId.missingImport,
                      node: ref.identifier
                    });

                    switch (subOptions.type) {
                      case "default":
                        yield `import ${localName} from "${autoImportSource}";`;

                        break;

                      case "wildcard":
                        yield `import * as ${localName} from "${autoImportSource}";`;
                    }
                  }
            }
          })
        )
      );

      if (fixes.length > 0)
        context.report({
          fix: (): RuleFix => {
            const fix = a.fromIterable(fixes).join(context.eol);

            return {
              range: program.range,
              text: `${fix}${context.eol}${context.getText(program)}`
            };
          },
          loc: context.locZero,
          messageId: MessageId.autoImport
        });
    }

    function checkImport(): void {
      for (const node of importDeclarations) {
        const defaultSpecifier = node.specifiers.find(
          specifier => specifier.type === AST_NODE_TYPES.ImportDefaultSpecifier
        );

        const wildcardSpecifier = node.specifiers.find(
          specifier =>
            specifier.type === AST_NODE_TYPES.ImportNamespaceSpecifier
        );

        const source = normalizeSource(node.source.value);

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
                    messageId: MessageId.invalidLocalName,
                    node
                  });

              if (wildcardSpecifier)
                context.report({
                  data: { _id: subOptions._id },
                  messageId: MessageId.wildcardImportDisallowed,
                  node
                });

              break;

            case "wildcard":
              if (wildcardSpecifier)
                if (wildcardSpecifier.local.name === localName) {
                  // Valid name
                } else if (
                  identifiers.has(localName) &&
                  subOptions.altLocalNames.includes(
                    wildcardSpecifier.local.name
                  )
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
                    messageId: MessageId.invalidLocalName,
                    node
                  });
              else
                context.report({
                  data: { _id: subOptions._id },
                  messageId: MessageId.wildcardImportRequired,
                  node
                });
          }
        }
      }
    }

    function normalizeSource(source: string): string {
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
  }
});

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
  return identifiers.has(localName) && altLocalNames.length
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
