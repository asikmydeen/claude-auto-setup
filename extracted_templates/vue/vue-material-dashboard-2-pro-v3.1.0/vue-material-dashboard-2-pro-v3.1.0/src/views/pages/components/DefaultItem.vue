<template>
  <div class="d-flex">
    <div
      class="icon icon-shape icon-md text-center border-radius-md shadow-none"
      :class="`bg-gradient-${icon.color}`"
    >
      <i class="material-icons text-white opacity-10" aria-hidden="true">{{
        icon.component
      }}</i>
    </div>
    <div :class="isRTL ? 'me-3' : 'ms-3'">
      <div class="numbers">
        <h6 class="mb-1 text-dark text-sm">{{ title }}</h6>
        <span class="text-sm">{{ description }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "DefaultItem",
  props: {
    icon: {
      type: Object,
      default: () => {},
      component: String,
      color: String,
    },
    title: {
      type: String,
      default: "",
    },
    description: {
      type: String,
      default: "",
    },
  },
  computed: {
    ...mapState(["isRTL"]),
  },
};
</script>
