import { defineStore } from "pinia";
import { computed, reactive, ref } from "vue";
import type { AdjustmentKey, FilterKey } from "../types/editor.ts";
import type { CropOperation } from "../types/cropper.ts";

export const useEditorStore = defineStore("editor", () => {
  const originalFile = ref<File | null>(null);
  const originalUrl = ref<string | null>(null);

  const hasImage = computed(() => originalFile.value !== null);

  const adjustments = reactive<Record<AdjustmentKey, number>>({
    brightness: 0,
    contrast: 0,
    saturation: 0,
  });

  const filters = reactive<Record<FilterKey, number>>({
    grayscale: 0,
    sepia: 0,
    invert: 0,
  });

  const previewFilter = computed(() => {
    return [
      `filter:`,
      `brightness(${100 + adjustments.brightness}%)`,
      `contrast(${100 + adjustments.contrast}%)`,
      `saturate(${100 + adjustments.saturation}%)`,
      `grayscale(${filters.grayscale}%)`,
      `sepia(${filters.sepia}%)`,
      `invert(${filters.invert}%)`,
    ].join(" ");
  });

  const isCropping = ref(false);

  const crop = ref<CropOperation | null>(null);

  const croppedPreviewUrl = ref<string | null>(null);

  function cancelCropping() {
    isCropping.value = false;
  }

  function startCropping() {
    isCropping.value = true;
  }

  function setCrop(value: CropOperation) {
    crop.value = value;
    isCropping.value = false;
  }

  function setCroppedPreview(url: string) {
    croppedPreviewUrl.value = url;
  }

  function setFile(file: File | null): void {
    if (originalUrl.value) {
      URL.revokeObjectURL(originalUrl.value);
    }

    originalFile.value = file;
    originalUrl.value = file ? URL.createObjectURL(file) : null;
  }

  function clearFile(): void {
    if (originalUrl.value) {
      URL.revokeObjectURL(originalUrl.value);
    }

    originalFile.value = null;
    originalUrl.value = null;
  }

  function resetEdits() {
    crop.value = null;
    croppedPreviewUrl.value = null;

    isCropping.value = false;

    adjustments.brightness = 0;
    adjustments.contrast = 0;
    adjustments.saturation = 0;

    filters.grayscale = 0;
    filters.sepia = 0;
    filters.invert = 0;
  }

  return {
    originalFile,
    originalUrl,
    hasImage,

    adjustments,
    filters,
    previewFilter,

    isCropping,
    crop,
    croppedPreviewUrl,
    setCrop,
    startCropping,
    cancelCropping,
    setCroppedPreview,

    setFile,
    clearFile,
    resetEdits,
  };
});
