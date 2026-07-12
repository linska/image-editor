import type {
  AdjustmentKey,
  EditorAction,
  FilterKey,
  SliderConfig,
} from "../types/editor";

export const editor: EditorAction[] = [
  {
    key: "crop",
    name: "Crop",
    icon: "mdi-crop",
  },
  {
    key: "adjust",
    name: "Adjust",
    icon: "mdi-tune-variant",
  },
  {
    key: "filter",
    name: "Filter",
    icon: "mdi-auto-fix",
  },
];

export const sliderActions = [
  {
    key: "brightness",
    name: "Brightness",
  },
  {
    key: "contrast",
    name: "Contrast",
  },
  {
    key: "saturation",
    name: "Saturation",
  },
] as const satisfies readonly SliderConfig<AdjustmentKey>[];

export const sliderFilters = [
  {
    key: "grayscale",
    name: "Grayscale",
  },
  {
    key: "sepia",
    name: "Sepia",
  },
  {
    key: "invert",
    name: "Invert",
  },
] as const satisfies readonly SliderConfig<FilterKey>[];
