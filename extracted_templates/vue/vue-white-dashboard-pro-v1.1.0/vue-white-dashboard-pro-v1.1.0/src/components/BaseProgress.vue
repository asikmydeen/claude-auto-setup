<template>
  <div
    class="progress-container"
    :class="{
      [`progress-${type}`]: type,
      [`progress-${size}`]: size
    }"
  >
    <span class="progress-badge" v-if="label">{{ label }}</span>
    <div class="progress">
      <span class="progress-value" v-if="showValue && valuePosition === 'left'">
        {{ value }}%
      </span>
      <div
        class="progress-bar"
        :class="computedClasses"
        role="progressbar"
        :aria-valuenow="value"
        aria-valuemin="0"
        aria-valuemax="100"
        :style="`width: ${value}%;`"
      >
        <slot>
          <span
            v-if="showValue && valuePosition === 'right'"
            class="progress-value"
          >
            {{ value }}%</span
          >
        </slot>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "base-progress",
  props: {
    type: {
      type: String,
      default: "default"
    },
    size: {
      type: String,
      default: "sm"
    },
    label: String,
    showValue: {
      type: Boolean,
      default: true
    },
    valuePosition: {
      type: String,
      default: "left"
    },
    value: {
      type: Number,
      default: 0
    }
  },
  computed: {
    computedClasses() {
      return [
        { "progress-bar-striped": this.striped },
        { "progress-bar-animated": this.animated }
      ];
    }
  }
};
</script>
<style></style>
