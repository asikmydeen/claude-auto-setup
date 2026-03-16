<template>
  <div class="mb-4 card">
    <div class="p-3 card-body">
      <div
        class="d-flex"
        :class="directionReverse ? reverseDirection : 'justify-content-between'"
      >
        <div
          class="text-center shadow icon icon-lg icon-shape border-radius-md"
          :class="typeof icon === 'object' ? icon.background : ''"
        >
          <i class="opacity-10 material-icons" aria-hidden="true">
            {{ typeof icon === "string" ? icon : icon.component }}
          </i>
        </div>
        <div class="text-end mt-2" :class="classContent">
          <div class="numbers">
            <p class="mb-0 text-sm text-capitalize" :class="title.color">
              {{ typeof title === "string" ? title : title.text }}
            </p>
            <h5 class="mb-0 font-weight-bolder" :class="value.color">
              {{
                typeof value === "string" || typeof value === "number"
                  ? value
                  : value.text
              }}
            </h5>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "MiniStatisticsCard",
  props: {
    directionReverse: {
      type: Boolean,
      default: false,
    },
    title: {
      type: [Object, String],
      default: null,
      text: {
        type: String,
      },
      color: {
        type: String,
      },
    },
    value: {
      type: [Object, String, Number],
      required: true,
      text: {
        type: [String, Number],
      },
      color: {
        type: String,
      },
    },
    percentage: {
      type: [Object, String],
      value: {
        type: String,
      },
      color: {
        type: String,
      },
      default: () => ({
        color: "text-success",
      }),
    },
    icon: {
      type: [String, Object],
      component: {
        type: String,
      },
      background: {
        type: String,
      },
      default: () => ({
        background: "bg-white",
      }),
    },
    classContent: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      reverseDirection: "flex-row-reverse justify-content-between",
    };
  },
};
</script>
