<template>
  <div class="m-top-wrap">
    <k-block strong outline class="top-main">
      <h2 class="m-top-title text-[22px]">Recommend</h2>
      <section class="m-top-list-wrap flex flex-row">
        <div class="m-top-item flex-1" v-for="(item, index) of data" :key="index">
          <img class="rounded-3xl" :src="getImgBySize(item['im:image'])" alt="" />
          <p class="m-top-item__title">{{ item['im:name']['label'] }}</p>
          <p
            class="m-top-item__cate text-black text-opacity-55 dark:text-white dark:text-opacity-55"
          >
            {{ item['category']['attributes']['label'] }}
          </p>
        </div>
      </section>
    </k-block>
  </div>
</template>

<script setup lang="ts">
import { kBlock, kBlockTitle } from 'konsta/vue';
import { getTopList } from '../lib/api';
import { ref } from 'vue';
import { getImgBySize } from '../lib/utils';
let data = ref([]);
async function init() {
  const res = await getTopList();
  data.value = res.data.feed.entry;
  console.log('res', res);
}

init();
</script>

<style lang="scss">
.top-main {
  margin-bottom: 0;
  padding-right: 0;
  padding-left: 0;
  margin-top: 0;
  padding-top: 12px;
}

.m-top-title {
  margin-top: 0;
  background-color: rgb(255 255 255 / var(--tw-bg-opacity));
  padding: 0 20px;
  margin-bottom: 12px;

  @media (prefers-color-scheme: dark) {
    & {
      --tw-bg-opacity: 1;
      background-color: rgb(28 28 29 / var(--tw-bg-opacity));
    }
  }
}

.m-top-list-wrap {
  overflow-x: scroll;

  &::-webkit-scrollbar {
    display: none; /* Chrome Safari */
  }

  .m-top-item {
    margin-right: 24px;
    width: 100px;

    &:first-of-type {
      margin-left: 18px;
    }

    img {
      width: 100px;
      height: 100px;
      object-fit: cover;
      max-width: unset;
    }

    .m-top-item__title {
      margin-top: 10px;
      text-align: center;
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
      word-wrap: break-word;
    }

    .m-top-item__cate {
      margin-top: 2px;
      text-align: center;
    }
  }
}
</style>
