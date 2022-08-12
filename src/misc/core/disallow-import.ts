import * as utils from "../../utils";
import { is } from "@skylib/functions";
import type { strings } from "@skylib/functions";

export enum MessageId {
  disallowedSource = "disallowedSource"
}

export const disallowImport = utils.createRule({
  name: "disallow-import",
  isOptions: is.object.factory<Options>(
    { allow: is.strings, disallow: is.strings },
    {}
  ),
  defaultOptions: { allow: [], disallow: [] },
  messages: {
    [MessageId.disallowedSource]: "Import from this source is not allowed"
  },
  create: context => {
    const matcher = utils.createFileMatcher(context.options, false, {
      dot: true
    });

    return utils.ruleTemplates.source(ctx => {
      if (matcher(ctx.source))
        context.report({
          messageId: MessageId.disallowedSource,
          node: ctx.node
        });
    });
  }
});

export interface Options {
  readonly allow: strings;
  readonly disallow: strings;
}
