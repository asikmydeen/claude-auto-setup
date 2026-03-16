<template>
  <div class="row">
    <div class="col-xl-12 order-xl-1">
      <card>
        <div slot="header" class="row align-items-center">
          <h4 class="card-title col-8">Edit Tag</h4>
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
                Update Tag
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
        hex: "#FF0000",
      },
    };
  },
  created() {
    this.get();
  },

  watch: {
    color: {
      handler: "updateTagColor",
      immediate: true,
      deep: true,
    },
  },

  methods: {
    async get() {
      try {
        const id = this.$route.params.id;
        await this.$store.dispatch("tags/get", id);
        this.tag = this.$store.getters["tags/tag"];
      } catch (error) {
        await this.$store.dispatch(
          "alerts/error",
          "Oops, something went wrong!"
        );
        this.setApiValidation(error.response.data.errors);
      }
    },

    async handleSubmit() {
      if (this.$isDemo == 1 && ["1", "2"].includes(this.$route.params.id)) {
        await this.$store.dispatch(
          "alerts/error",
          "You are not allowed to change data of default tags."
        );
        return;
      }
      try {
        this.resetApiValidation();

        await this.$store.dispatch("tags/update", this.tag);
        await this.$store.dispatch(
          "alerts/success",
          "Tag updated successfully."
        );
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
