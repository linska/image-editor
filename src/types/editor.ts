export type Tool =
  | "crop"
  | "brightness"
  | "contrast"
  | "saturation"
  | "grayscale"
  | "sepia"
  | "invert";

export type EditorAction = {
  key: Tool | "adjust" | "filter";
  name: string;
  icon: string;
};

export type AdjustmentKey = "brightness" | "contrast" | "saturation";

export type FilterKey = "grayscale" | "sepia" | "invert";

export type SliderConfig<TKey extends string> = {
  key: TKey;
  name: string;
  min?: number;
  max?: number;
};
