<template>
  <k-app theme="ios">
    <k-page>
      <m-header @search="search"></m-header>
      <m-top></m-top>
      <m-content ref="contentRef"></m-content>
    </k-page>
  </k-app>
</template>

<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
import { kApp, kPage, kNavbar, kBlock } from 'konsta/vue';
import MHeader from './components/header.vue';
import MTop from './components/top.vue';
import MContent from './components/content.vue';
import { ref } from 'vue';
const contentRef = ref();
function search(data: string) {
  contentRef?.value?.search(data);
}
</script>

<style scoped></style>
