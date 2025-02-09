export type CircularProgressBarState = Record<
  CircularProgressBarProperty,
  number | boolean
>;

export type CircularProgressBarAttribute =
  | "value"
  | "is-animated"
  | "is-hidden";

export type CircularProgressBarProperty = "value" | "isAnimated" | "isHidden";
