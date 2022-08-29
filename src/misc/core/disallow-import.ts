import * as ruleTemplates from "../../rule-templates";
import * as utils from "../../utils";
import { is } from "@skylib/functions";
import type { strings } from "@skylib/functions";

export interface Options {
  // eslint-disable-next-line no-warning-comments -- Wait for @skylib/functions update
  // fixme
  readonly allow: strings | string;
  readonly disallow: strings | string;
}

export enum MessageId {
  disallowedSource = "disallowedSource"
}

export const disallowImport = utils.createRule({
  name: "disallow-import",
  vue: true,
  isOptions: is.object.factory<Options>(
    { allow: utils.isStringOrStrings, disallow: utils.isStringOrStrings },
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

    return ruleTemplates.source(ctx => {
      if (matcher(ctx.source))
        context.report({
          messageId: MessageId.disallowedSource,
          node: ctx.node
        });
    });
  }
});
