<template>
  <div class="card">
    <div class="p-3 pb-0 card-header">
      <h6 class="mb-0">{{ title }}</h6>
    </div>
    <div class="p-3 card-body border-radius-lg">
      <div
        v-for="({ icon, color, event, date }, index) of events"
        :key="index"
        class="d-flex"
        :class="index !== 0 ? 'mt-4' : ''"
      >
        <div
          class="icon icon-shape shadow text-center"
          :class="`bg-gradient-${color}`"
        >
          <i class="material-icons opacity-10 pt-1">{{ icon }}</i>
        </div>
        <div class="ms-3">
          <div class="numbers">
            <h6 class="mb-1 text-sm text-dark">{{ event }}</h6>
            <span class="text-sm">{{ date }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "EventsCard",
  props: {
    title: {
      type: String,
      default: "Next Events",
    },
    events: {
      type: Array,
      default: () => [],
      icon: String,
      color: String,
      event: String,
      date: String,
    },
  },
};
</script>
