<template>
  <div class="card py-1">
    <div class="card-body">
      <p>{{ title }}</p>
      <h3>{{ count }}</h3>
      <material-badge :color="badge.color">{{ badge.label }}</material-badge>
    </div>
  </div>
</template>

<script>
import MaterialBadge from "@/components/MaterialBadge.vue";

export default {
  name: "StepsCard",
  components: {
    MaterialBadge,
  },
  props: {
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
  },
};
</script>
