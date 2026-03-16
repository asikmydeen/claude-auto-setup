<template>
  <div class="row">
    <div class="col-xl-12 order-xl-1">
      <card>
        <div slot="header" class="row align-items-center">
          <h4 class="card-title col-8">Add Tag</h4>
          <div class="col-4 text-right">
            <n-button
              @click.native="goBack"
              type="button"
              class="btn btn-sm btn-primary"
              >Back to list</n-button
            >
          </div>
        </div>
        <div class="card-body">
          <form ref="profile_form" @submit.prevent="handleSubmit">
            <label>Name</label>
            <fg-input
              v-model="tag.name"
              name="name"
              addon-left-icon="now-ui-icons users_circle-08"
              :error="apiValidationErrors.name"
            />

            <label>Color</label>
            <fg-input name="color" :error="apiValidationErrors.color">
              <color-picker v-model="color" style="width: 100%" />
            </fg-input>

            <div class="my-4">
              <n-button
                type="button"
                class="btn btn-sm btn-primary"
                native-type="submit"
              >
                Add Tag
              </n-button>
            </div>
          </form>
        </div>
      </card>
    </div>
  </div>
</template>
<script>
import formMixin from "@/mixins/form-mixin";
import { Select, Option } from "element-ui";
import { FormGroupInput as FgInput } from "src/components/index";
import { cloneDeep } from "lodash";
import { Slider } from "vue-color";

export default {
  components: {
    FgInput,
    [Option.name]: Option,
    [Select.name]: Select,
  },
  layout: "DashboardLayout",

  mixins: [formMixin],

  components: {
    "color-picker": Slider,
  },

  data() {
    return {
      tag: {
        type: "tags",
        name: null,
        color: null,
      },
      color: {
        hex: "#A1FF00",
      },
    };
  },

  watch: {
    color: {
      handler: "updateTagColor",
      immediate: true,
      deep: true,
    },
  },

  methods: {
    async handleSubmit() {
      try {
        this.resetApiValidation();
        await this.$store.dispatch("tags/add", this.tag);

        await this.$store.dispatch("alerts/success", "Tag added successfully.");
        this.goBack();
      } catch (error) {
        await this.$store.dispatch(
          "alerts/error",
          "Oops, something went wrong!"
        );
        this.setApiValidation(error.response.data.errors);
      }
    },

    updateTagColor() {
      this.tag.color = this.color.hex;
    },

    goBack() {
      this.$router.push({ name: "List Tags" });
    },
  },
};
</script>
