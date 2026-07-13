<script setup lang="ts">
import ImageUploader from "./components/ImageUploader.vue";
import { useEditorStore } from "./stores/editor.ts";
import { computed } from "vue";
import Editor from "./components/editor/Editor.vue";
import Header from "./components/Header.vue";

const editor = useEditorStore();

const emptyState = computed(() => !editor.originalFile);
</script>

<template>
  <v-app>
    <Header/>
    <v-main>
      <ImageUploader v-if="emptyState" @image-selected="editor.setFile" />
      <Editor v-else />
    </v-main>
  </v-app>
</template>
