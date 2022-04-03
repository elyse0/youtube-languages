<template>
  <div class="layout">
    <app-navbar></app-navbar>
    <div class="container is-fluid">
      <slot/>
    </div>
  </div>
</template>

<script setup lang="ts">
import AppNavbar from '@/components/layout/AppNavbar.vue';

</script>

<style scoped>

</style>
