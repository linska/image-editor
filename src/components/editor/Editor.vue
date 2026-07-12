<script setup lang="ts">
import { useDisplay } from "vuetify/framework";
import EditorControls from "./controls/EditorControls.vue";
import EditorPreview from "./EditorPreview.vue";
import { ref } from "vue";

const { mdAndUp } = useDisplay();

type ImagePreviewExpose = {
  applyCrop: () => void;
};

const previewRef = ref<ImagePreviewExpose | null>(null);

function applyCrop() {
  previewRef.value?.applyCrop();
}
</script>

<template>
  <div class="h-100 d-flex flex-column pa-0">
    <v-row no-gutters>
      <v-col cols="12" md="8" xl="9">
        <v-sheet color="grey" class="fill-height pa-4">
          <EditorPreview ref="previewRef" />
        </v-sheet>
      </v-col>

      <v-col v-if="mdAndUp" md="4" xl="3">
        <EditorControls @apply-crop="applyCrop" />
      </v-col>
    </v-row>

    <EditorControls v-if="!mdAndUp" mobile @apply-crop="applyCrop" />
  </div>
</template>

<style scoped lang="scss"></style>
