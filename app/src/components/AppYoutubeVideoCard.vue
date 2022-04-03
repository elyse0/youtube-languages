<template>
  <div class="card">
    <div class="card-image">
      <a :href="getChannelLink(video.channelId)" target="_blank">
        <figure class="image is-16by9">
          <img v-lazy="video.thumbnailUrl" alt="Placeholder image">
        </figure>
      </a>
    </div>
    <div class="card-content">
      <div class="media">
        <div class="media-content">
          <p class="title is-6">{{ video.title }}</p>
          <p class="subtitle is-6">@{{ video.channelTitle }}</p>
        </div>
      </div>

      <div class="content">
        <div class="description hide-overflown-text">
          {{ video.description }}
        </div>
        <br>
        <div class="date is-pulled-right">
          {{ getReadableDate(video.publishedAt) }}
        </div>
      </div>

      <AppBlacklistChannelSwitch
        v-if="showBlacklistChannelSwitch"
        :channel-id="video.channelId"
        :token="token"
      />

    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, defineProps } from 'vue';

import { IVideo } from '@/types/YoutubeApi';

import { getChannelLink } from '@/util/youtube';
import { getReadableDate } from '@/util/date';

import AppBlacklistChannelSwitch from '@/components/AppBlacklistChannelSwitch.vue';

const props = defineProps({
  video: {
    // @ts-ignore
    type: IVideo,
    required: true,
  },
  token: {
    type: String,
    default: null,
  },
  permissions: {
    type: Array,
    default: null,
  },
});

const showBlacklistChannelSwitch = computed(() => props.token && props.permissions.includes('create:ban'));

</script>

<style scoped>
.hide-overflown-text, div.media-content > p {
  white-space: normal;
  overflow: hidden;
  text-overflow: ellipsis;
}

.card {
  width: 280px;
  float: left;
  margin: 10px;
}

.title {
  height: 4ch;
}

.subtitle {
  height: 2ch;
}

.description {
  height: 5ch;
}
</style>
