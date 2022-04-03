<template>
  <div class="app-navbar">
    <div class="session">
      <o-button v-if="!user" variant="success" outlined @click="onSignin">Sign in</o-button>
      <o-button v-if="user" variant="danger" outlined @click="onLogout">Logout</o-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAuth0 } from '@auth0/auth0-vue';

const { loginWithRedirect, logout, user } = useAuth0();

const onSignin = async (): Promise<void> => {
  await loginWithRedirect();
};

const onLogout = (): void => {
  logout();
};

</script>

<style scoped>
div.app-navbar {
  display: flex;
  margin: 10px
}

div.session {
  margin-left: auto;
}
</style>
