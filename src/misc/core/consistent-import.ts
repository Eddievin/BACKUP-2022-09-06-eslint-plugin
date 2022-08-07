import * as _ from "@skylib/lodash-commonjs-es";
import * as utils from "../../utils";
import type {
  RuleFix,
  RuleListener
} from "@typescript-eslint/utils/dist/ts-eslint";
import { a, is } from "@skylib/functions";
import { AST_NODE_TYPES } from "@typescript-eslint/utils";
import type { TSESTree } from "@typescript-eslint/utils";
import minimatch from "minimatch";
import type { strings } from "@skylib/functions";

export interface SubOptions {
  readonly _id: string;
  readonly altLocalNames: strings;
  readonly autoImport: boolean;
  readonly autoImportSource?: string;
  readonly localName?: string;
  readonly source: string;
  readonly sourcePattern?: string;
  readonly wildcard: boolean;
}

export enum MessageId {
  autoImport = "autoImport",
  invalidLocalName = "invalidLocalName",
  wildcardDisallowed = "wildcardDisallowed",
  wildcardRequired = "wildcardRequired"
}

export const consistentImport = utils.createRule({
  name: "consistent-import",
  fixable: utils.Fixable.code,
  isSubOptions: is.object.factory<SubOptions>(
    {
      _id: is.string,
      altLocalNames: is.strings,
      autoImport: is.boolean,
      source: is.string,
      wildcard: is.boolean
    },
    {
      autoImportSource: is.string,
      localName: is.string,
      sourcePattern: is.string
    }
  ),
  defaultSubOptions: { altLocalNames: [], autoImport: false, wildcard: false },
  subOptionsKey: "sources",
  messages: {
    [MessageId.autoImport]:
      'Run "eslint --fix" to add missing import statement(s)',
    [MessageId.invalidLocalName]:
      "Expecting local name to be: {{expectedLocalName}} ({{_id}})",
    [MessageId.wildcardDisallowed]: "Wildcard import disallowed ({{_id}})",
    [MessageId.wildcardRequired]: "Wildcard import required ({{_id}})"
  },
  create: (context): RuleListener => {
    const eol = context.eol;

    const identifiers = new Set<string>();

    // eslint-disable-next-line @skylib/custom/prefer-readonly-array -- Postponed
    const importDeclarations: TSESTree.ImportDeclaration[] = [];

    return {
      ":not(ImportDefaultSpecifier, ImportNamespaceSpecifier, ImportSpecifier, Property) > Identifier":
        (node: TSESTree.Identifier) => {
          identifiers.add(node.name);
        },
      "ExportAllDeclaration": node => {
        if (node.exported) {
          const subOptions = findSubOptions(node.source);

          if (subOptions) {
            const { _id, localName, wildcard } = subOptions;

            if (wildcard)
              if (node.exported.name === localName) {
                // Valid name
              } else
                context.report({
                  data: { _id, expectedLocalName: localName },
                  messageId: MessageId.invalidLocalName,
                  node
                });
            else
              context.report({
                data: { _id },
                messageId: MessageId.wildcardDisallowed,
                node
              });
          }
        }
      },
      "ExportNamedDeclaration": node => {
        if (node.source) {
          const subOptions = findSubOptions(node.source);

          if (subOptions) {
            const { _id, localName, wildcard } = subOptions;

            if (wildcard)
              context.report({
                data: { _id },
                messageId: MessageId.wildcardRequired,
                node
              });
            else {
              const specifier = node.specifiers.find(
                candidate => candidate.local.name === "default"
              );

              if (specifier)
                if (specifier.exported.name === localName) {
                  // Valid name
                } else
                  context.report({
                    data: { _id, expectedLocalName: localName },
                    messageId: MessageId.invalidLocalName,
                    node
                  });
            }
          }
        }
      },
      "ImportDeclaration": node => {
        importDeclarations.push(node);
      },
      "Program:exit": (node: TSESTree.Program) => {
        lintAutoImport(node);
        lintConsistentImport();
      },
      "Property > Identifier.value": (node: TSESTree.Identifier) => {
        identifiers.add(node.name);
      }
    };

    function expectedLocalName(
      localName: string,
      altLocalNames: strings
    ): string {
      return identifiers.has(localName) && altLocalNames.length
        ? altLocalNames.join(", ")
        : localName;
    }

    function findSubOptions(
      node: TSESTree.StringLiteral
    ): SubOptionsExtended | undefined {
      const source = context.normalizeSource(node.value);

      const subOptions = a.reverse(context.subOptionsArray).find(candidate =>
        minimatch(source, candidate.sourcePattern ?? candidate.source, {
          dot: true
        })
      );

      return subOptions
        ? { localName: utils.getIdentifierFromPath(source), ...subOptions }
        : undefined;
    }

    function lintAutoImport(node: TSESTree.Program): void {
      const fixes = _.uniq(
        context.subOptionsArray.flatMap(subOptions => {
          const { autoImport, autoImportSource, localName, wildcard } = {
            autoImportSource: subOptions.source,
            localName: utils.getIdentifierFromPath(subOptions.source),
            ...subOptions
          };

          return autoImport
            ? context.scope.through
                .map(ref => {
                  if (ref.identifier.name === localName) {
                    context.report({
                      messageId: MessageId.autoImport,
                      node: ref.identifier
                    });

                    return wildcard
                      ? `import * as ${localName} from "${autoImportSource}";`
                      : `import ${localName} from "${autoImportSource}";`;
                  }

                  return undefined;
                })
                .filter(is.not.empty)
            : [];
        })
      );

      if (fixes.length)
        context.report({
          fix: (): RuleFix => {
            const fix = fixes.join(eol);

            return {
              range: [node.range[0], node.range[0]],
              text: `${fix}${eol}`
            };
          },
          loc: context.locZero,
          messageId: MessageId.autoImport
        });
    }

    function lintConsistentImport(): void {
      for (const node of importDeclarations) {
        const subOptions = findSubOptions(node.source);

        if (subOptions) {
          const { _id, altLocalNames, localName, wildcard } = subOptions;

          const defaultSpecifier = node.specifiers.find(
            specifier =>
              specifier.type === AST_NODE_TYPES.ImportDefaultSpecifier
          );

          const wildcardSpecifier = node.specifiers.find(
            specifier =>
              specifier.type === AST_NODE_TYPES.ImportNamespaceSpecifier
          );

          if (wildcard)
            if (wildcardSpecifier)
              if (wildcardSpecifier.local.name === localName) {
                // Valid name
              } else if (
                identifiers.has(localName) &&
                altLocalNames.includes(wildcardSpecifier.local.name)
              ) {
                // Valid alt name
              } else
                context.report({
                  data: {
                    _id,
                    expectedLocalName: expectedLocalName(
                      localName,
                      altLocalNames
                    )
                  },
                  messageId: MessageId.invalidLocalName,
                  node
                });
            else
              context.report({
                data: { _id },
                messageId: MessageId.wildcardRequired,
                node
              });
          else {
            if (defaultSpecifier)
              if (defaultSpecifier.local.name === localName) {
                // Valid name
              } else if (
                identifiers.has(localName) &&
                altLocalNames.includes(defaultSpecifier.local.name)
              ) {
                // Valid alt name
              } else
                context.report({
                  data: {
                    _id,
                    expectedLocalName: expectedLocalName(
                      localName,
                      altLocalNames
                    )
                  },
                  messageId: MessageId.invalidLocalName,
                  node
                });

            if (wildcardSpecifier)
              context.report({
                data: { _id },
                messageId: MessageId.wildcardDisallowed,
                node
              });
          }
        }
      }
    }
  }
});

interface SubOptionsExtended extends SubOptions {
  readonly localName: string;
}
