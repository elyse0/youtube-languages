import { createApp } from 'vue';

import App from '@/App.vue';

import Oruga from '@oruga-ui/oruga-next';
import { bulmaConfig } from '@oruga-ui/theme-bulma';

import '@oruga-ui/theme-bulma/dist/bulma.css';

// Import Material design icons
import '@mdi/font/css/materialdesignicons.css';

import VueLazyLoad from 'vue3-lazyload';

import { createAuth0 } from '@auth0/auth0-vue';

import router from '@/router';

const authClient = createAuth0({
  domain: process.env.VUE_APP_AUTH0_DOMAIN,
  client_id: process.env.VUE_APP_AUTH0_CLIENT_ID,
  redirect_uri: process.env.VUE_APP_AUTH0_REDIRECT_URI,
  audience: process.env.VUE_APP_AUTH0_AUDIENCE,
});

createApp(App)
  .use(Oruga, bulmaConfig)
  .use(VueLazyLoad)
  .use(authClient)
  .use(router)
  .mount('#app');
