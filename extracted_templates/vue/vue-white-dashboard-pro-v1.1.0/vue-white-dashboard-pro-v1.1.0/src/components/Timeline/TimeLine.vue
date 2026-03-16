<template>
  <card class="card-timeline card-plain text-left">
    <ul class="timeline" :class="{ 'timeline-simple': type === 'simple' }">
      <slot></slot>
    </ul>
  </card>
</template>
<script>
import { Card } from "@/components/index";

export default {
  name: "time-line",
  components: {
    Card
  },
  props: {
    type: {
      type: String,
      default: ""
    }
  }
};
</script>
<style></style>
