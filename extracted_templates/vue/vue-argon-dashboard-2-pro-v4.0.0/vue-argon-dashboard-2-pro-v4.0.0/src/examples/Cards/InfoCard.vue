<script setup>
import { computed } from "vue";
import { useStore } from "vuex";
import ArgonBadge from "@/components/ArgonBadge.vue";

const store = useStore();
const isRTL = computed(() => store.state.isRTL);

defineProps({
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
});
</script>
<template>
  <div class="card">
    <div class="card-header pb-0">
      <div class="d-flex">
        <p>{{ title }}</p>
        <div :class="isRTL ? 'me-auto' : 'ms-auto'">
          <argon-badge :color="badge.color">{{ badge.text }}</argon-badge>
        </div>
      </div>
    </div>
    <div class="card-body pt-0">
      <p class="mb-0">{{ description }}</p>
    </div>
  </div>
</template>
