import {
  computed,
  nextTick,
  onBeforeUnmount,
  onMounted,
  ref,
  watch,
  type Ref,
} from "vue";
import Cropper from "cropperjs";

import type { CropOperation } from "../types/cropper";

type UseImageCropperOptions = {
  sourceUrl: Ref<string | null>;
  isCropping: Ref<boolean>;
};

export function useImageCropper({
  sourceUrl,
  isCropping,
}: UseImageCropperOptions) {
  const workspace = ref<HTMLDivElement | null>(null);
  const cropperContainer = ref<HTMLDivElement | null>(null);

  const imageWidth = ref(0);
  const imageHeight = ref(0);
  const frameWidth = ref(0);
  const frameHeight = ref(0);

  let cropper: Cropper | null = null;
  let resizeObserver: ResizeObserver | null = null;

  const frameStyle = computed(() => ({
    width: `${frameWidth.value}px`,
    height: `${frameHeight.value}px`,
  }));

  function calculateFrameSize(): void {
    if (!workspace.value || !imageWidth.value || !imageHeight.value) {
      return;
    }

    const availableWidth = workspace.value.clientWidth;
    const availableHeight = workspace.value.clientHeight;

    const scale = Math.min(
      availableWidth / imageWidth.value,
      availableHeight / imageHeight.value,
    );

    frameWidth.value = imageWidth.value * scale;
    frameHeight.value = imageHeight.value * scale;
  }

  async function loadImageDimensions(url: string): Promise<void> {
    const image = new Image();

    image.src = url;
    await image.decode();

    imageWidth.value = image.naturalWidth;
    imageHeight.value = image.naturalHeight;

    calculateFrameSize();
  }

  async function createCropper(): Promise<void> {
    if (!isCropping.value || !sourceUrl.value || !cropperContainer.value) {
      return;
    }

    cropper?.destroy();

    const image = new Image();

    image.src = sourceUrl.value;
    image.alt = "Uploaded image";

    cropper = new Cropper(image, {
      container: cropperContainer.value,
    });
  }

  function destroyCropper(): void {
    cropper?.destroy();
    cropper = null;
  }

  function normalize(value: number, total: number): number {
    return Math.min(1, Math.max(0, value / total));
  }

  async function getCropResult(): Promise<{
    operation: CropOperation;
    previewUrl: string;
  } | null> {
    const selection = cropper?.getCropperSelection();
    const canvasElement = cropper?.getCropperCanvas();

    if (!selection || !canvasElement) {
      return null;
    }

    const canvasWidth = canvasElement.clientWidth;
    const canvasHeight = canvasElement.clientHeight;

    if (!canvasWidth || !canvasHeight) {
      return null;
    }

    const operation: CropOperation = {
      x: normalize(selection.x, canvasWidth),
      y: normalize(selection.y, canvasHeight),
      width: normalize(selection.width, canvasWidth),
      height: normalize(selection.height, canvasHeight),
    };

    const canvas = await selection.$toCanvas();

    return {
      operation,
      previewUrl: canvas.toDataURL("image/png"),
    };
  }

  watch(
    sourceUrl,
    async (url) => {
      if (!url) {
        return;
      }

      await loadImageDimensions(url);
    },
    { immediate: true },
  );

  watch(
    isCropping,
    async (cropping) => {
      if (!cropping) {
        destroyCropper();
        return;
      }

      await nextTick();
      await createCropper();
    },
    { flush: "post" },
  );

  onMounted(() => {
    resizeObserver = new ResizeObserver(calculateFrameSize);

    if (workspace.value) {
      resizeObserver.observe(workspace.value);
    }
  });

  onBeforeUnmount(() => {
    resizeObserver?.disconnect();
    destroyCropper();
  });

  return {
    workspace,
    cropperContainer,
    frameStyle,
    getCropResult,
  };
}
