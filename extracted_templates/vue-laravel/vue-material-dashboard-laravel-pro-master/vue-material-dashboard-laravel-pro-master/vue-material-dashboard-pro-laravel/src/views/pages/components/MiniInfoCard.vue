<template>
  <div class="card py-1">
    <div class="card-body">
      <div
        class="text-center shadow icon icon-shape"
        :class="`bg-gradient-${color}`"
      >
        <i class="material-icons opacity-10" aria-hidden="true">{{ icon }}</i>
      </div>
      <!--  eslint-disable-next-line vue/no-v-html -->
      <h5 class="mt-3 mb-0" v-html="title"></h5>
      <p class="mb-0">{{ description }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "MiniInfoCard",
  props: {
    color: {
      type: String,
      default: "success",
    },
    icon: {
      type: String,
      default: "refresh",
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
};
</script>
