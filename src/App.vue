<script setup lang="ts">
import ImageUploader from "./components/ImageUploader.vue";
import { useEditorStore } from "./stores/editor.ts";
import { computed } from "vue";
import Editor from "./components/editor/Editor.vue";
import { storeToRefs } from "pinia";
import { downloadEditedImage } from "./utils/exportImage.ts";
import { downloadJson } from "./utils/exportJson.ts";

const editor = useEditorStore();

const { originalUrl, crop, adjustments, filters } = storeToRefs(editor);

async function exportImage() {
  if (!originalUrl.value) {
    return;
  }

  const operations = {
    crop: crop.value,
    adjustments: { ...adjustments.value },
    filters: { ...filters.value },
  };

  await downloadEditedImage({
    sourceUrl: originalUrl.value,
    crop: crop.value,
    effects: {
      ...adjustments.value,
      ...filters.value,
    },
  });

  downloadJson(operations);
}

const emptyState = computed(() => !editor.originalFile);
</script>

<template>
  <v-app>
    <v-app-bar :flat="emptyState">
      <template v-if="!emptyState" #prepend>
        <v-btn
          prepend-icon="mdi-delete-empty-outline"
          @click="editor.clearFile"
        >
          Clear
        </v-btn>
      </template>
      <template v-if="!emptyState" #append>
        <v-btn prepend-icon="mdi-restore" @click="editor.resetEdits">
          Reset
        </v-btn>

        <v-btn prepend-icon="mdi-tray-arrow-down" @click="exportImage">
          Export
        </v-btn>
      </template>
    </v-app-bar>
    <v-main>
      <ImageUploader v-if="emptyState" @image-selected="editor.setFile" />
      <Editor v-else />
    </v-main>
  </v-app>
</template>
