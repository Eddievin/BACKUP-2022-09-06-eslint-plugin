import { rules, utils } from "@";
import getCurrentLine from "get-current-line";

const rule = rules["vue/sort-v-bind"];

const MessageId = utils.getMessageId(rule);

utils.testRule("sort-v-bind", rule, [
  {
    name: `Test at line ${getCurrentLine().line}`,
    code: `
      <template>
        <slot v-bind="obj" prop="abc" @click="click"></slot>
        <slot prop="abc" v-bind="obj" @click="click"></slot>
        <slot prop="abc" @click="click" v-bind="obj"></slot>
        <slot prop="abc" @click="click"></slot>
      </template>
    `,
    errors: [{ line: 2, messageId: MessageId.incorrectSortingOrder }]
  }
]);
