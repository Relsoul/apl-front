<template>
  <k-list strong-ios outline-ios class="content-main">
    <div v-show="loading" class="flex-center">
      <k-preloader style="text-align: center" class="k-color-brand-red" />
    </div>

    <div v-show="data && data.length">
      <k-list-item
        v-for="(item, index) of data"
        :chevron-material="false"
        :title="item['im:name']?.label"
        class="content-item hairline-b"
        mediaClass="content-item__img"
        :key="index"
        :dividers="false"
      >
        <template #text>
          <p class="content-item__category">{{ item['category']['attributes']['label'] }}</p>
          <div class="star-list">
            <div
              class="star-item"
              :key="index"
              v-for="(subItem, index) of generateStar(item.lookup.averageUserRating)"
            >
              <template v-if="subItem.isFullStar">
                <svg
                  id="sv"
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="#f3cb4c"
                  class="bi bi-star-fill"
                  viewBox="0 0 16 16"
                >
                  <path
                    id="cp"
                    stroke="#f3cb4c"
                    d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"
                  />
                </svg>
              </template>
              <template v-else>
                <div
                  class="star-item-mask"
                  :style="{
                    width: subItem.width,
                  }"
                ></div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="transparent"
                  class="bi bi-star-fill"
                  viewBox="0 0 16 16"
                >
                  <path
                    id="cp"
                    stroke="#f3cb4c"
                    d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"
                  />
                </svg>
              </template>
            </div>
            <span>({{ item.lookup.userRatingCount }})</span>
          </div>
        </template>
        <template #media>
          <div class="content-item-media-wrap">
            <p
              class="content-item__index text-black text-opacity-55 dark:text-white dark:text-opacity-55"
            >
              {{ index + 1 }}
            </p>
            <img
              class="material:rounded-full ios:w-20 material:w-10"
              :class="{ 'rounded-full': index % 2 !== 0, 'rounded-lg': index % 2 === 0 }"
              :src="getImgBySize(item['im:image'])"
              width="80"
              alt="demo"
            />
          </div>
        </template>
      </k-list-item>
    </div>
    <div v-show="!data || !data.length">
      <p class="flex-center">暂未搜索到数据</p>
    </div>
  </k-list>
</template>

<script lang="ts">
export default {
  name: 'content',
};
</script>
<script lang="ts" setup>
import { ref, defineExpose } from 'vue';
import { getContentList, getLookUpByIds } from '../lib/api';
import { kList, kListItem, kPreloader } from 'konsta/vue';
import { getImgBySize } from '../lib/utils';
import * as _ from 'lodash';

let data = ref<any[]>([]);
let loading = ref(true);
let originData: any[] = [];
async function init() {
  const res = await getContentList(100);

  // 填充id
  const ids = res.data.feed.entry.map((n: any) => {
    return n.id.attributes['im:id'];
  });
  const loopUpRes = await getLookUpByIds(ids);
  for (let i of loopUpRes.data.results) {
    const find: any = res.data.feed.entry.find((n: any) => {
      return Number(n.id.attributes['im:id']) === Number(i.trackId);
    });
    find.lookup = i;
  }

  data.value = res.data.feed.entry;
  originData = res.data.feed.entry;
  loading.value = false;

  console.log('data', data.value);

  console.log('content res', res);
  console.log('loopUpRes ', loopUpRes);
}

function fract(num: number) {
  return num - Math.trunc(num);
}

function generateStar(averageUserRating: number) {
  let _arr = [];
  let lock = false;
  for (let i = 1; i <= 5; i++) {
    let _obj = {
      isFullStar: true,
      width: '0',
    };
    if (i >= averageUserRating) {
      _obj.isFullStar = false;
      if (lock === false) {
        lock = true;
        const width = 16 * (Math.ceil(1 / fract(averageUserRating)) / 10);
        _obj.width = width + 'px';
      }
    }
    _arr.push(_obj);
  }
  return _arr;
}

function _search(txt: string) {
  console.log('search', txt);

  txt = txt.trim();
  if (!txt) {
    data.value = originData;
    return;
  }

  const filter = originData.filter(n => {
    return (
      n['im:name'].label.toLowerCase().includes(txt) ||
      n['summary']['label'].toLowerCase().includes(txt) ||
      n['im:artist']['label'].toLowerCase().includes(txt)
    );
  });
  data.value = filter;
}

const debounceSearch = _.debounce(_search, 220);

function search(txt: string) {
  debounceSearch(txt);
}

defineExpose({
  search,
});

init();
</script>

<style lang="scss">
.content-main {
  margin-top: 0;
}

.content-item-media-wrap {
  display: flex;
  align-items: center;

  .content-item__index {
    font-size: 16px;
    margin-right: 20px;
  }
}

.flex-center {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50vh;
}

.star-list {
  margin-top: 10px;
  display: flex;
  align-items: center;
}

.star-item {
  position: relative;
  overflow: hidden;
  display: inline-block;
  margin-right: 3px;
}

.star-item-mask {
  position: absolute;
  background: #f3cb4c;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
  clip-path: url(#clip02);
}

.content-item {
  position: relative;

  &::after {
    left: 20px;
    width: calc(100% - 20px);
  }

  .content-item__category {
    margin-top: 10px;
  }

  .content-item__img {
  }
}
</style>
