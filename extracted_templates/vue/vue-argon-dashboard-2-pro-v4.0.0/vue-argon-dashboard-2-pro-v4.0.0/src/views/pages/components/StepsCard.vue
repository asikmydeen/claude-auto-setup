<script setup>
import ArgonBadge from "@/components/ArgonBadge.vue";

defineProps({
  title: {
    type: String,
    default: "Steps",
  },
  count: {
    type: String,
    default: "11.4K",
  },
  badge: {
    type: Object,
    label: String,
    color: String,
    default: () => ({
      color: "success",
    }),
  },
});
</script>
<template>
  <div class="card py-1">
    <div class="card-body">
      <p>{{ title }}</p>
      <h3>{{ count }}</h3>
      <argon-badge :color="badge.color">{{ badge.label }}</argon-badge>
    </div>
  </div>
</template>
