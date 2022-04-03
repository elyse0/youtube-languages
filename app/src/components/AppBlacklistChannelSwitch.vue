<template>
  <AppSwitch v-model="selectedValue"
             label="Blacklisted"
             variant="danger"
             @input="blacklistChannel"
  />
</template>

<script setup lang="ts">
import { defineProps, ref } from 'vue';

import YoutubeVideoService from '@/services/YoutubeVideoService';

import AppSwitch from '@/components/ui/AppSwitch.vue';

const props = defineProps({
  channelId: {
    type: String,
    required: true,
  },
  token: {
    type: String,
    required: true,
  },
});

const selectedValue = ref<boolean>(false);

const blacklistChannel = async (switchValue: boolean) => {
  if (!switchValue) {
    return;
  }

  const blacklisted = await YoutubeVideoService.banChannel(props.channelId, props.token);

  if (!blacklisted) {
    selectedValue.value = false;
    console.log('Error blacklisting channel');
  }
};
</script>

<style scoped>

</style>
