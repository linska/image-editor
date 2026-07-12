<script setup lang="ts">
import SliderControl from "./SliderControl.vue";
import { sliderActions, sliderFilters } from "../../../constants/editor";

import { useEditorStore } from "../../../stores/editor";
import { storeToRefs } from "pinia";

const editorStore = useEditorStore();

const { isCropping, adjustments, filters } = storeToRefs(editorStore);

const emit = defineEmits<{
  "apply-crop": [];
}>();
</script>

<template>
  <v-sheet class="h-100 pa-4">
    <section class="editor-section">
      <h2 class="text-subtitle-1 font-weight-bold mb-4">Crop</h2>

      <div class="d-flex align-center ga-3">
        <v-btn
          v-if="!isCropping"
          color="primary"
          prepend-icon="mdi-crop"
          @click="editorStore.startCropping"
        >
          Crop
        </v-btn>

        <template v-else>
          <v-btn variant="outlined" @click="editorStore.cancelCropping">
            Cancel
          </v-btn>

          <v-btn color="primary" @click="emit('apply-crop')"> Apply </v-btn>
        </template>
      </div>
    </section>

    <v-divider class="my-5" />

    <section class="editor-section">
      <h2 class="text-subtitle-1 font-weight-bold mb-2">Adjustments</h2>

      <SliderControl
        v-for="action in sliderActions"
        :key="action.key"
        v-model="adjustments[action.key]"
        :label="action.name"
        :disabled="isCropping"
        class="my-5"
      />
    </section>

    <v-divider class="my-5" />

    <section class="editor-section">
      <h2 class="text-subtitle-1 font-weight-bold mb-2">Filters</h2>

      <SliderControl
        v-for="filter in sliderFilters"
        :key="filter.key"
        v-model="filters[filter.key]"
        :label="filter.name"
        :min="0"
        :disabled="isCropping"
        class="my-5"
      />
    </section>
  </v-sheet>
</template>
