import {
  MessageId,
  vueElementContentsSpacing
} from "@/rules/vue-element-contents-spacing";
import getCurrentLine from "get-current-line";
import { utils } from "@";

utils.testRule("vue-element-contents-spacing", vueElementContentsSpacing, [
  {
    name: `Test at line ${getCurrentLine().line}`,
    code: `
      <template>
        <p> {{ contents }}</p>
        <p>{{ contents }} </p>
      </template>
    `,
    output: `
      <template>
        <p>{{ contents }}</p>
        <p>{{ contents }}</p>
      </template>
    `,
    errors: [
      { line: 2, messageId: MessageId.removeSpaces },
      { line: 3, messageId: MessageId.removeSpaces }
    ]
  },
  {
    name: `Test at line ${getCurrentLine().line}`,
    code: `
      <template>
        <p> <span>contents</span></p>
        <p><span>contents</span> </p>
      </template>
    `,
    output: `
      <template>
        <p><span>contents</span></p>
        <p><span>contents</span></p>
      </template>
    `,
    errors: [
      { line: 2, messageId: MessageId.removeSpaces },
      { line: 3, messageId: MessageId.removeSpaces }
    ]
  },
  {
    name: `Test at line ${getCurrentLine().line}`,
    code: `
      <template>
        <p> {{
          contents
        }}</p>
        <p>{{
          contents
        }} </p>
      </template>
    `,
    output: `
      <template>
        <p> {{
          contents
        }} </p>
        <p> {{
          contents
        }} </p>
      </template>
    `,
    errors: [
      { line: 2, endLine: 4, messageId: MessageId.addSpaces },
      { line: 5, endLine: 7, messageId: MessageId.addSpaces }
    ]
  },
  {
    name: `Test at line ${getCurrentLine().line}`,
    code: `
      <template>
        <p> <span>
          contents
          contents
        </span></p>
        <p><span>
          contents
          contents
        </span> </p>
      </template>
    `,
    output: `
      <template>
        <p> <span>
          contents
          contents
        </span> </p>
        <p> <span>
          contents
          contents
        </span> </p>
      </template>
    `,
    errors: [
      { line: 2, endLine: 5, messageId: MessageId.addSpaces },
      { line: 6, endLine: 9, messageId: MessageId.addSpaces }
    ]
  }
]);
