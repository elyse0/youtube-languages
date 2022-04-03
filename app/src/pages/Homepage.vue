<template>
  <AppLayout>
    <div class="homepage">
      <p>
        <router-link to="/french">French</router-link>
      </p>
      <p>
        <router-link to="/chinese">Chinese</router-link>
      </p>
    </div>
  </AppLayout>
</template>

<script setup lang="ts">
import AppLayout from '@/components/layout/AppLayout.vue';

</script>

<style>

</style>
