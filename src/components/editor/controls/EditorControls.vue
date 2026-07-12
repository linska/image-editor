<script setup lang="ts">
import EditorControlsMobile from "./EditorControlsMobile.vue";
import EditorControlsDesktop from "./EditorControlsDesktop.vue";

type Props = {
  mobile?: boolean;
};

withDefaults(defineProps<Props>(), {
  mobile: false,
});

const emit = defineEmits<{
  "apply-crop": [];
}>();

function handleApplyCrop() {
  emit("apply-crop");
}
</script>

<template>
  <EditorControlsMobile v-if="mobile" @apply-crop="handleApplyCrop" />
  <EditorControlsDesktop v-else @apply-crop="handleApplyCrop" />
</template>

<style scoped lang="scss"></style>
