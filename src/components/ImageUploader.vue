<script setup lang="ts">
import { ref } from "vue";

const emit = defineEmits<{
  (e: "image-selected", file: File): void;
}>();

type Props = {
  title?: string;
  text?: string | string[];
  browseText?: string;
  dropText?: string;
};

withDefaults(defineProps<Props>(), {
  title: "Edit image",
  text: () => [
    "Upload an image, crop it, adjust colors, and export the result.",
    "Edit your image online.",
  ],
  browseText: "Select image",
  dropText: "or drop image here",
});

const isDragging = ref(false);
const fileInput = ref<HTMLInputElement | null>(null);

function openFileDialog() {
  fileInput.value?.click();
}

function handleFile(file?: File) {
  if (!file) {
    return;
  }

  if (!file.type.startsWith("image/")) {
    return;
  }

  emit("image-selected", file);
}

function handleInputChange(event: Event) {
  const input = event.target as HTMLInputElement;
  handleFile(input.files?.[0]);

  input.value = "";
}

function handleDrop(event: DragEvent) {
  isDragging.value = false;

  const file = event.dataTransfer?.files[0];
  handleFile(file);
}
</script>

<template>
  <v-sheet
    class="upload-zone fill-height d-flex flex-column align-center pa-8 text-center"
    :class="{ 'upload-zone--active': isDragging }"
    @dragenter.prevent="isDragging = true"
    @dragover.prevent
    @dragleave.prevent="isDragging = false"
    @drop.prevent="handleDrop"
  >
    <h1 class="upload-zone__title text-primary my-5">{{ title }}</h1>

    <p
      v-for="line in Array.isArray(text) ? text : [text]"
      :key="line"
      class="upload-zone__text"
    >
      {{ line }}
    </p>

    <v-btn
      class="mt-16 mb-4 upload-zone__action"
      color="primary"
      size="x-large"
      rounded="lg"
      @click="openFileDialog"
    >
      {{ browseText }}
    </v-btn>

    <p class="upload-zone__hint d-flex align-center ga-2">
      {{ dropText }}
      <v-icon size="18" icon="mdi-cloud-upload-outline" />
    </p>

    <input
      ref="fileInput"
      class="upload-zone__input"
      type="file"
      accept="image/*"
      @change="handleInputChange"
    />
  </v-sheet>
</template>

<style scoped lang="scss">
.upload-zone {
  transition: background-color 0.2s ease;

  &--active {
    background-color: rgba(var(--v-theme-primary), 0.18);
  }

  &__input {
    display: none;
  }
}
</style>
