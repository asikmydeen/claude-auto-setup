<template>
  <nav aria-label="breadcrumb">
    <ol
      class="px-0 pt-1 pb-0 mb-0 bg-transparent breadcrumb"
      :class="isRTL ? '' : ' me-sm-6'"
    >
      <li class="text-sm breadcrumb-item" :class="color">
        <a v-if="isRTL" :class="color" class="opacity-5 ps-2" href="#"
          >لوحات القيادة</a
        >
        <a v-else :class="color" class="opacity-8" href="#">Pages</a>
      </li>
      <li
        class="text-sm breadcrumb-item active"
        :class="color"
        aria-current="page"
      >
        {{ currentRouteName }}
      </li>
    </ol>
    <h6 class="mb-0 font-weight-bolder" :class="color">
      {{ currentRouteName }}
    </h6>
  </nav>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "Breadcrumbs",
  props: {
    color: {
      type: String,
      default: "text-dark",
    },
  },
  computed: {
    ...mapState(["isRTL"]),
    currentRouteName() {
      return this.$route.name;
    },
  },
};
</script>
