<template>
  <k-list class="m-header-main" inset-ios strong-ios>
    <k-list-input
      :colors="{
        outlineBorderIos: 'rounded-2xl m-header-border',
        outlineBorderFocusIos: 'm-header-border',
      }"
      class="m-header-list-input"
      @input="search"
      outline
      floating-label
      type="text"
      placeholder="Search"
    >
      <template #media>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          class="bi bi-search"
          viewBox="0 0 16 16"
        >
          <path
            d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"
          />
        </svg>
      </template>
    </k-list-input>
  </k-list>
</template>
<script lang="ts" setup>
import { kListInput, kList } from 'konsta/vue';
import { defineEmits } from 'vue';
const emits = defineEmits(['search']);

interface InputEvent extends Event {
  target: HTMLInputElement;
}
const search = (event: InputEvent) => {
  emits('search', event.target.value);
};
</script>

<style lang="scss">
.m-header-main {
  margin: 0;
  border-radius: 0;
  position: sticky;
  top: 0;
  z-index: 999;

  .bi-search {
    --tw-text-opacity: 0.4;
    fill: rgb(0 0 0 / var(--tw-text-opacity));
    margin-left: 10px;
    margin-right: -10px;

    @media (prefers-color-scheme: dark) {
      & {
        --tw-bg-opacity: 0.22;
        fill: #a3a3a5;
      }
    }
  }

  .m-header-list-input {
    .m-header-border {
      background-color: rgb(239 239 244 / var(--tw-bg-opacity));
      border-color: transparent !important;

      @media (prefers-color-scheme: dark) {
        & {
          --tw-bg-opacity: 0.45;
          background-color: rgb(239 239 244 / var(--tw-bg-opacity));
        }
      }
    }

    & > div {
      margin-left: 10px;
      margin-right: 10px;
    }
  }
}
</style>
