<script setup lang="ts">
import { storeToRefs } from "pinia";

import { useEditorStore } from "../../stores/editor";
import { useImageCropper } from "../../composables/useImageCropper";

const editorStore = useEditorStore();

const { originalUrl, isCropping, croppedPreviewUrl, previewFilter } =
  storeToRefs(editorStore);

const { workspace: _workspace, cropperContainer: _cropperContainer, frameStyle, getCropResult } =
  useImageCropper({
    sourceUrl: originalUrl,
    isCropping,
  });

async function applyCrop(): Promise<void> {
  const result = await getCropResult();

  if (!result) {
    return;
  }

  editorStore.setCroppedPreview(result.previewUrl);
  editorStore.setCrop(result.operation);
}

defineExpose({
  applyCrop,
});
</script>

<template>
  <div ref="_workspace" class="image-preview">
    <div
      v-if="isCropping"
      ref="_cropperContainer"
      class="image-preview__cropper"
      :style="frameStyle"
    />

    <img
      v-else-if="originalUrl"
      :src="croppedPreviewUrl || originalUrl"
      alt="Edited image preview"
      class="image-preview__image"
      :style="previewFilter"
    />
  </div>
</template>

<style scoped lang="scss">
.image-preview {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  overflow: hidden;

  &__image {
    display: block;
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;
  }

  &__cropper {
    flex: 0 0 auto;
    overflow: hidden;
  }

  :deep(cropper-canvas) {
    width: 100%;
    height: 100%;
  }
}
</style>
