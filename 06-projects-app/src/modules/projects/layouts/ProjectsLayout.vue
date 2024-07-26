<template>
  <div class="flex flex-col">
    <TopMenu />
    <main class="flex flex-row">
      <!-- Side Menu -->
      <SideMenu />
      <!-- Router View -->
      <RouterView />
    </main>
  </div>
</template>

<script lang="ts" setup>
import TopMenu from '@common/components/TopMenu.vue';
import SideMenu from '@projects/components/SideMenu.vue';
</script>
