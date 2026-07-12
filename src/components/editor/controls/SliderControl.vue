<script setup lang="ts">
import { computed } from "vue";

type Props = {
  label?: string;
  min?: number;
  max?: number;
  disabled?: boolean;
};

const props = withDefaults(defineProps<Props>(), {
  label: "Amount",
  min: -100,
  max: 100,
  disabled: false,
});

const model = defineModel<number>({
  default: 0,
});

const value = computed({
  get: () => model.value,
  set: (newValue) => {
    model.value = Math.min(props.max, Math.max(props.min, newValue));
  },
});
</script>

<template>
  <v-slider
    v-model="value"
    :label="label"
    :min="min"
    :max="max"
    step="1"
    hide-details
    color="primary"
    :disabled="disabled"
  >
    <template v-slot:append>
      <v-text-field
        v-model.number="value"
        density="compact"
        class="mb-2"
        type="number"
        :max="max"
        :min="min"
        variant="plain"
        hide-details
        :disabled="disabled"
      ></v-text-field>
    </template>
  </v-slider>
</template>

<style scoped lang="scss">
.v-text-field {
  max-width: 48px;
}

:deep(.v-slider__label) {
  width: 68px;
}
</style>
