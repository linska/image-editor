<script setup lang="ts">
import { computed, ref } from "vue";
import { storeToRefs } from "pinia";

import SliderControl from "./SliderControl.vue";

import type { EditorAction } from "../../../types/editor";
import {
  editor as editorTools,
  sliderActions,
  sliderFilters,
} from "../../../constants/editor";
import { useEditorStore } from "../../../stores/editor";

const emit = defineEmits<{
  "apply-crop": [];
}>();

const editorStore = useEditorStore();
const { adjustments, filters } = storeToRefs(editorStore);

const activeTool = ref<EditorAction["key"]>();

const controlSheetActive = computed({
  get: () => activeTool.value === "adjust" || activeTool.value === "filter",
  set: (isOpen) => {
    if (!isOpen) {
      activeTool.value = undefined;
    }
  },
});

const cropSheetActive = computed({
  get: () => activeTool.value === "crop",
  set: (isOpen) => {
    if (!isOpen) {
      cancelCrop();
    }
  },
});

function selectTool(tool: EditorAction["key"]): void {
  activeTool.value = tool;

  if (tool === "crop") {
    editorStore.startCropping();
  }
}

function closeActiveTool(): void {
  activeTool.value = undefined;
}

function cancelCrop(): void {
  editorStore.cancelCropping();
  closeActiveTool();
}

function applyCrop(): void {
  emit("apply-crop");
  closeActiveTool();
}
</script>

<template>
  <v-sheet class="editor-controls--mobile">
    <v-bottom-navigation v-model="activeTool" grow color="primary">
      <v-btn
        v-for="action in editorTools"
        :key="action.key"
        :value="action.key"
        :prepend-icon="action.icon"
        @click="selectTool(action.key)"
      >
        {{ action.name }}
      </v-btn>
    </v-bottom-navigation>

    <v-bottom-sheet v-model="cropSheetActive" :scrim="false" z-index="100">
      <v-card min-height="120">
        <v-card-actions class="justify-end ga-2">
          <v-btn variant="outlined" @click="cancelCrop"> Cancel </v-btn>

          <v-btn color="primary" variant="flat" @click="applyCrop">
            Apply
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-bottom-sheet>

    <v-bottom-sheet v-model="controlSheetActive" :scrim="false" z-index="100">
      <v-card min-height="210">
        <v-card-actions
          v-if="activeTool === 'adjust'"
          class="flex-column align-stretch"
        >
          <SliderControl
            v-for="action in sliderActions"
            :key="action.key"
            v-model="adjustments[action.key]"
            :label="action.name"
          />
        </v-card-actions>

        <v-card-actions
          v-else-if="activeTool === 'filter'"
          class="flex-column align-stretch"
        >
          <SliderControl
            v-for="filter in sliderFilters"
            :key="filter.key"
            v-model="filters[filter.key]"
            :label="filter.name"
            :min="0"
          />
        </v-card-actions>
      </v-card>
    </v-bottom-sheet>
  </v-sheet>
</template>
