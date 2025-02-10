import { CircularProgressBarSetting } from "./circular-progress-bar-settings/circular-progress-bar-settings.model";
import "./circular-progress-bar.model";
import {
  CircularProgressBarAttribute,
  CircularProgressBarProperty,
  CircularProgressBarState,
} from "./circular-progress-bar.model";

export const DEFAULT_STATE: CircularProgressBarState = {
  value: 0,
  isAnimated: false,
  isHidden: false,
};

export const ATTRIBUTE_PROPERTY_MAPPING = new Map<
  CircularProgressBarAttribute,
  CircularProgressBarProperty
>([
  ["value", "value"],
  ["is-animated", "isAnimated"],
  ["is-hidden", "isHidden"],
]);

export const SETTING_ATTRIBUTE_MAPPING = new Map<
  CircularProgressBarSetting,
  CircularProgressBarAttribute
>([
  ["value", "value"],
  ["animate", "is-animated"],
  ["hide", "is-hidden"],
]);

export const DEFAULT_COLOR = "white";
