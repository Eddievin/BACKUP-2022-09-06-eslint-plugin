import * as utils from "../../../utils";
import { noMixedClasses } from "./no-mixed-classes";
import { preferLabelProp } from "./prefer-label-prop";
import { preferLangVar } from "./prefer-lang-var";
import { preferMBtn } from "./prefer-m-btn";
import { preferMCard } from "./prefer-m-card";
import { preferMCardActions } from "./prefer-m-card-actions";
import { preferMCardSection } from "./prefer-m-card-section";
import { preferMExpansionItem } from "./prefer-m-expansion-item";
import { preferMField } from "./prefer-m-field";
import { preferMForm } from "./prefer-m-form";
import { preferMInput } from "./prefer-m-input";
import { preferMItem } from "./prefer-m-item";
import { preferMKnob } from "./prefer-m-knob";
import { preferMMenu } from "./prefer-m-menu";
import { preferMOptionGroup } from "./prefer-m-option-group";
import { preferMPopupProxy } from "./prefer-m-popup-proxy";
import { preferMSelect } from "./prefer-m-select";
import { preferMToggle } from "./prefer-m-toggle";
import { preferMTooltip } from "./prefer-m-tooltip";
import { sortVBind } from "./sort-v-bind";

export const template = utils.prefixKeys("template/", {
  "no-mixed-classes": noMixedClasses,
  "prefer-label-prop": preferLabelProp,
  "prefer-lang-var": preferLangVar,
  "prefer-m-btn": preferMBtn,
  "prefer-m-card": preferMCard,
  "prefer-m-card-actions": preferMCardActions,
  "prefer-m-card-section": preferMCardSection,
  "prefer-m-expansion-item": preferMExpansionItem,
  "prefer-m-field": preferMField,
  "prefer-m-form": preferMForm,
  "prefer-m-input": preferMInput,
  "prefer-m-item": preferMItem,
  "prefer-m-knob": preferMKnob,
  "prefer-m-menu": preferMMenu,
  "prefer-m-option-group": preferMOptionGroup,
  "prefer-m-popup-proxy": preferMPopupProxy,
  "prefer-m-select": preferMSelect,
  "prefer-m-toggle": preferMToggle,
  "prefer-m-tooltip": preferMTooltip,
  "sort-v-bind": sortVBind
});
