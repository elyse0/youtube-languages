<template>
  <AppLayout>
    <AppHero title="Youtube videos"/>

    <div class="app-selectors">
      <div class="app-search">
        <o-field>
          <o-input v-model="searchTitle" placeholder="Search title"></o-input>
        </o-field>
      </div>

      <o-datepicker v-model="selectedDateRange"
                    range
                    :min-date="calendar.minDate"
                    :max-date="calendar.maxDate"
                    icon="calendar"
                    placeholder="Click to select..."
      />

      <o-tooltip label="Reset calendar">
        <a @click="onResetCalendarClick">
          <o-icon icon="calendar-refresh" size="is-medium"/>
        </a>
      </o-tooltip>
    </div>

    <o-field>
      <o-switch v-model="showBlacklisted">
        Show blacklisted channels
      </o-switch>
    </o-field>

    <div v-if="youtubeVideos" class="cards-view">
      <AppYoutubeVideoCard
        v-for="(video) in youtubeVideos"
        :key="video._id"
        :video="video"
        :token="token"
        :permissions="permissions"
        lazy
      />
    </div>

  </AppLayout>
</template>

<script setup lang="ts">
import {
  ref, reactive, onMounted, watch,
} from 'vue';
import { useRoute } from 'vue-router';

import { useAuth0 } from '@auth0/auth0-vue';
import jwtDecode from 'jwt-decode';

import { IVideo } from '@/types/YoutubeApi';

import AppLayout from '@/components/layout/AppLayout.vue';
import AppHero from '@/components/ui/AppHero.vue';
import AppYoutubeVideoCard from '@/components/AppYoutubeVideoCard.vue';

import YoutubeVideoService, { GetVideosRequest } from '@/services/YoutubeVideoService';

// Authentication
const token = ref<string | null>(null);
const permissions = ref<string[] | null>(null);

// App
const language = ref<string>('');

const youtubeVideos = ref<IVideo[]>([]);

const calendar = reactive({
  minDate: new Date('2021-12-06'),
  maxDate: new Date(),
});

const selectedDateRange = ref<string[]>([]);

const showBlacklisted = ref<boolean>(false);

const searchTitle = ref<string>('');

const getVideos = async () => {
  if (!selectedDateRange.value.length && !searchTitle.value.length) {
    return;
  }

  // @ts-ignore
  const afterDate = selectedDateRange.value ? selectedDateRange.value[0] : undefined;
  // @ts-ignore
  const beforeDate = selectedDateRange.value ? selectedDateRange.value[1] : undefined;

  const request: GetVideosRequest = {
    language: language.value,
    afterDate,
    beforeDate,
    blacklisted: !showBlacklisted.value,
    title: searchTitle.value.length ? searchTitle.value : undefined,
  };

  const retrievedVideos = await YoutubeVideoService.getVideos(request);

  if (retrievedVideos) {
    youtubeVideos.value = retrievedVideos;
  }
};

const onResetCalendarClick = () => {
  selectedDateRange.value = [];
};

const syncVideos = async () => {
  youtubeVideos.value = [];
  await getVideos();
};

watch(searchTitle, async () => {
  await syncVideos();
});

watch(selectedDateRange, async () => {
  await syncVideos();
});

watch(showBlacklisted, async () => {
  await syncVideos();
});

onMounted(async () => {
  const route = useRoute();

  const languageParam = route.params.language;
  if (typeof languageParam === 'string') {
    language.value = languageParam;
  }

  const accessToken = await useAuth0().getAccessTokenSilently();
  if (accessToken) {
    token.value = accessToken;
    const decodedToken = jwtDecode(accessToken);

    // @ts-ignore
    permissions.value = decodedToken.permissions ?? null;
  }
});
</script>

<style scoped>
div.app-selectors {
  display: flex;
  align-items: center;
  justify-content: center;
}

div.app-selectors > div {
  margin: 0 10px 0 10px;
}

div.vd-wrapper {
  max-width: 350px;
  border-style: dotted;
  border-color: black;
}

div.cards-view {
  display: flex;
  flex-flow: row wrap;
  justify-content: space-around;
}

div.cards-view > div.card {
  margin: 10px 0;
}

</style>
