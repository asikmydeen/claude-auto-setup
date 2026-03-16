<template>
  <div class="card">
    <div class="card-header pb-0">
      <div class="d-flex">
        <p>{{ title }}</p>
        <div :class="isRTL ? 'me-auto' : 'ms-auto'">
          <material-badge :color="badge.color">{{ badge.text }}</material-badge>
        </div>
      </div>
    </div>
    <div class="card-body pt-0">
      <p class="mb-0">{{ description }}</p>
    </div>
  </div>
</template>

<script>
import MaterialBadge from "@/components/MaterialBadge.vue";
import { mapState } from "vuex";

export default {
  name: "InfoCard",
  components: {
    MaterialBadge,
  },
  props: {
    title: {
      type: String,
      default: "",
    },
    description: {
      type: String,
      default: "",
    },
    badge: {
      type: Object,
      text: String,
      color: String,
      default: () => ({
        color: "success",
        text: "Moderate",
      }),
    },
  },
  computed: {
    ...mapState(["isRTL"]),
  },
};
</script>
