<template>
  <div class="form-group">
    <slot name="label">
      <label v-if="label" :class="labelClasses">
        {{ label }}
        <span v-if="required">*</span>
      </label>
    </slot>

    <div
      :class="[
        {
          'has-danger': !!errorMessage,
          'input-group': hasIcon,
          'input-group-alternative': alternative,
          focused: focused,
          'has-label': label || $slots.label,
        },
        inputGroupClasses,
      ]"
    >
      <div v-if="addonLeftIcon || $slots.addonLeft" class="input-group-prepend">
        <span class="input-group-text">
          <slot name="addonLeft">
            <i :class="addonLeftIcon"></i>
          </slot>
        </span>
      </div>
      <slot>
        <input
          class="form-control"
          :name="name"
          :id="name"
          :type="type"
          :placeholder="placeholder"
          :required="required"
          :disabled="disabled"
          :value="modelValue"
          @input="handleChange"
          @blur="focused = false"
          @focus="focused = true"
          :class="inputClasses"
          v-model="model"
        />
      </slot>
      <div
        v-if="addonRightIcon || $slots.addonRight"
        class="input-group-append"
      >
        <span class="input-group-text">
          <slot name="addonRight">
            <i :class="addonRightIcon"></i>
          </slot>
        </span>
      </div>
    </div>
    <slot name="infoBlock"></slot>
    <slot name="helpBlock">
      <div
        class="text-danger invalid-feedback"
        style="display: block"
        :class="{ 'mt-2': hasIcon }"
        v-show="errorMessage"
      >
        {{ errorMessage }}
      </div>
    </slot>
  </div>
</template>

<script>
import { useField } from "vee-validate";

export default {
  name: "base-input",
  emits: ["update:modelValue"],
  model: {
    prop: "modelValue",
  },
  props: {
    addonRightIcon: String,
    addonLeftIcon: String,
    append: String,
    modelValue: [String, Number],
    type: {
      type: String,
      default: "text",
    },
    value: {
      type: String,
      default: "",
    },
    placeholder: {
      type: String,
      default: "",
    },
    name: {
      type: String,
      required: true,
    },
    label: {
      type: String,
    },
    required: {
      type: Boolean,
    },
    disabled: {
      type: Boolean,
    },
    alternative: {
      type: Boolean,
      description: "Whether input is of alternative layout",
    },
    labelClasses: {
      type: String,
      description: "Input label css classes",
      default: "form-control-label",
    },
    inputGroupClasses: {
      type: String,
      default: "",
    },
    group: {
      type: String,
      default: "",
    },
    inputClasses: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      focused: false,
    };
  },
  computed: {
    model: {
      get() {
        return this.modelValue;
      },
      set(check) {
        if (!this.touched) {
          this.touched = true;
        }
        this.$emit("update:modelValue", check);
      },
    },
    hasIcon() {
      const { addonRight, addonLeft } = this.$slots;
      return (
        addonRight !== undefined ||
        addonLeft !== undefined ||
        this.addonRightIcon !== undefined ||
        this.addonLeftIcon !== undefined ||
        this.group
      );
    },
  },
  methods: {
    updateValue(evt) {
      let value = evt.target.value;
      if (!this.touched && value) {
        this.touched = true;
      }
      this.$emit("update:modelValue", value);
    },
  },
  setup(props) {
    const {
      value: inputValue,
      errorMessage,
      handleChange,
      meta,
    } = useField(props.name, undefined, {
      initialValue: props.value,
    });

    return {
      handleChange,
      errorMessage,
      inputValue,
      meta,
    };
  },
};
</script>

<style></style>
