import "./circular-progress-bar.model";
import {
  CircularProgressBarAttribute,
  CircularProgressBarValue,
} from "./circular-progress-bar.model";

export const DEFAULT_STATE: Record<CircularProgressBarValue, number | boolean> =
  {
    value: 0,
    isAnimated: false,
    isHidden: false,
  };

export const ATTRIBUTE_PROPERTY_MAPPING = new Map<
  CircularProgressBarAttribute,
  CircularProgressBarValue
>([
  ["value", "value"],
  ["is-animated", "isAnimated"],
  ["is-hidden", "isHidden"],
]);
