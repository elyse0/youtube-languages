<template>
  <section class="hero">
    <div class="hero-body">
      <p class="title">
        {{title}}
      </p>
      <p class="subtitle" v-if="subtitle.length">
        {{subtitle}}
      </p>
    </div>
  </section>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';

defineProps({
  title: {
    type: String,
    required: true,
  },
  subtitle: {
    type: String,
    default: '',
  },
});
</script>

<style scoped>

</style>
