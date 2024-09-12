<template>
  <FullScreenLoader v-if="authStore.authStatus === AuthStatus.Checking" />
  <RouterView v-else />
  <VueQueryDevtools />
</template>
<script setup lang="ts">
import { AuthStatus } from '@auth/constants';
import { useAuthStore } from '@auth/stores';
import FullScreenLoader from '@common/components/FullScreenLoader.vue';
import { VueQueryDevtools } from '@tanstack/vue-query-devtools';
import { useRoute, useRouter } from 'vue-router';

const authStore = useAuthStore();
const router = useRouter();
const route = useRoute();

authStore.$subscribe(
  (_, state) => {
    if (state.authStatus === AuthStatus.Checking) {
      authStore.checkAuthStatus();
    }

    if (route.path.includes('/auth') && state.authStatus === AuthStatus.Authenticated) {
      router.replace({ name: 'home' });
      return;
    }
  },
  {
    immediate: true,
  },
);
</script>
