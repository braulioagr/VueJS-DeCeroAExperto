<template>
  <!-- component -->
  <!-- Create By Joker Banny -->
  <body class="bg-white">
    <!-- Header Navbar -->
    <TopMenu />

    <!-- Content -->
    <RouterView />

    <!-- Footer -->
    <CustomFooter />
  </body>
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router';
import CustomFooter from '../components/CustomFooter.vue';
import TopMenu from '../components/TopMenu.vue';
</script>
