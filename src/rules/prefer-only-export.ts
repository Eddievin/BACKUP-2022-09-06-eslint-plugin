import * as utils from "../utils";
import { a, is } from "@skylib/functions";

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
    const { exportMatchingFilename, selector: mixed } = context.options;

    const selector = a.fromMixed(mixed).join(", ");

    let activated = false;

    return utils.ruleTemplates.export(
      ctx => {
        if (
          exportMatchingFilename &&
          ctx.identifiers.some(
            node =>
              node.name === utils.getIdentifierFromPath(context.path, node.name)
          )
        )
          activated = true;

        if (activated)
          if (ctx.onlyExport) {
            // Valid
          } else
            for (const node of ctx.identifiers)
              context.report({ messageId: MessageId.invalidExport, node });
      },
      selector
        ? {
            [selector]: () => {
              activated = true;
            }
          }
        : {}
    );
  }
});
