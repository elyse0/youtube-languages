import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';

import Homepage from '@/pages/Homepage.vue';
import LanguageYoutubeVideos from '@/pages/LanguageYoutubeVideos.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Homepage',
    component: Homepage,
  },
  {
    path: '/:language',
    name: 'LanguageYoutubeVideos',
    component: LanguageYoutubeVideos,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
