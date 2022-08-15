import * as ruleTemplates from "../../rule-templates";
import * as utils from "../../utils";
import { is, typedef } from "@skylib/functions";
import type { RuleListener } from "@typescript-eslint/utils/dist/ts-eslint";

export interface Options {
  readonly exportMatchingFilename: boolean;
  readonly selector: utils.Selector;
}

export enum MessageId {
  invalidExport = "invalidExport"
}

export const preferOnlyExport = utils.createRule({
  name: "prefer-only-export",
  vue: true,
  isOptions: is.object.factory<Options>(
    { exportMatchingFilename: is.boolean, selector: utils.isSelector },
    {}
  ),
  defaultOptions: { exportMatchingFilename: false, selector: [] },
  messages: { [MessageId.invalidExport]: "Expecting only export" },
  create: context => {
    const { exportMatchingFilename, selector: mixedSelector } = context.options;

    const selector = utils.selector(mixedSelector);

    let activated = false;

    return utils.mergeListeners(
      selector
        ? typedef<RuleListener>({
            [selector]: () => {
              activated = true;
            }
          })
        : {},
      ruleTemplates.export(ctx => {
        const { identifiers, onlyExport } = ctx;

        if (
          exportMatchingFilename &&
          identifiers.some(
            node =>
              node.name ===
              context.identifierFromPath(context.filename, node.name)
          )
        )
          activated = true;

        if (activated)
          if (onlyExport) {
            // Valid
          } else
            for (const node of identifiers)
              context.report({ messageId: MessageId.invalidExport, node });
      })
    );
  }
});
