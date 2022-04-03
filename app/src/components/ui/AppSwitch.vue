<template>
  <o-switch v-model="modelValue" :variant="variant">
    {{ label }}
  </o-switch>
</template>

<script setup lang="ts">
import {
  defineEmits, defineProps, ref, watch,
} from 'vue';

defineProps({
  variant: {
    type: String,
    required: true,
  },
  label: {
    type: String,
    required: true,
  },
});

const emit = defineEmits(['input']);

const modelValue = ref<boolean>(false);

watch(modelValue, () => {
  emit('input', modelValue.value);
});
</script>

<style scoped>

</style>
