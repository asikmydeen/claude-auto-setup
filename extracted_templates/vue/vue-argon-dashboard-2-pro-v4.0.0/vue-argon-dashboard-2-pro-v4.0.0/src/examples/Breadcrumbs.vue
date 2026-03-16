<script setup>
import { computed } from "vue";
import { useStore } from "vuex";

const store = useStore();
const isRTL = computed(() => store.state.isRTL);
const isNavFixed = computed(() => store.state.isNavFixed);

defineProps({
  currentPage: {
    type: String,
    default: "",
  },
  currentDirectory: {
    type: String,
    default: "",
  },
});
</script>
<template>
  <nav aria-label="breadcrumb">
    <ol
      class="px-0 pt-1 pb-0 mb-0 bg-transparent breadcrumb"
      :class="!isRTL && 'me-sm-6'"
    >
      <li class="text-sm breadcrumb-item" :class="isRTL && 'ps-2'">
        <a :class="isNavFixed ? 'text-dark' : 'text-white'">
          <i class="ni ni-box-2"></i>
        </a>
      </li>
      <li
        class="text-sm breadcrumb-item"
        :class="isNavFixed ? 'text-dark' : 'text-white'"
      >
        <a
          v-if="isRTL"
          class="opacity-8 ps-2"
          :class="isNavFixed ? 'text-dark' : 'text-white'"
          href="#"
          >لوحات القيادة</a
        >
        <a
          v-else
          :class="`${isNavFixed ? 'text-dark' : 'text-white'}`"
          href="#"
          >{{ currentDirectory }}</a
        >
      </li>
      <li
        class="text-sm breadcrumb-item active"
        :class="isNavFixed ? 'text-dark' : 'text-white'"
        aria-current="page"
      >
        {{ currentPage }}
      </li>
    </ol>
    <h6
      class="mb-0 font-weight-bolder"
      :class="isNavFixed ? 'text-dark' : 'text-white'"
    >
      {{ currentPage }}
    </h6>
  </nav>
</template>
