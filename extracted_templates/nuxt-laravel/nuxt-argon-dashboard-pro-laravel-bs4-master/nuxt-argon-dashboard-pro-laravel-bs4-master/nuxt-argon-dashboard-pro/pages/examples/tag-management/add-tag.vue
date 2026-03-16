<template>
  <div class="container-fluid mt-5">
    <div class="row">
      <div class="col-xl-12 order-xl-1">
        <card>
          <div slot="header" class="row align-items-center">
            <div class="col-8">
              <h3 class="mb-0">Add Tag</h3>
            </div>
            <div class="col-4 text-right">
              <base-button
                @click="goBack"
                type="button"
                class="btn btn-sm btn-primary"
                >Back to list</base-button
              >
            </div>
          </div>
          <div class="card-body">
            <form @submit.prevent="handleSubmit">
              <base-input
                label="Name"
                prepend-icon="fas fa-user"
                v-model="tag.name"
              />
              <validation-error :errors="apiValidationErrors.name" />
              <base-input label="Color">
                <color-picker v-model="color" style="width: 100%" />
              </base-input>
              <validation-error :errors="apiValidationErrors.color" />
              <div class="my-4">
                <base-button
                  type="button"
                  class="btn btn-sm btn-primary"
                  native-type="submit"
                >
                  Add Tag
                </base-button>
              </div>
            </form>
          </div>
        </card>
      </div>
    </div>
  </div>
</template>
<script>
import formMixin from "@/mixins/form-mixin";
import ValidationError from "~/components/ValidationError.vue";
import { Slider } from "vue-color";
import { omit } from "lodash";

export default {
  layout: "DashboardLayout",

  mixins: [formMixin],

  components: {
    ValidationError,
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
        await this.$store.dispatch("tags/add", this.tag);
        this.$notify({
          type: "success",
          message: "Tag added successfully.",
        });
        this.goBack();
      } catch (error) {
        this.$notify({
          type: "danger",
          message: "Oops, something went wrong!",
        });
        this.setApiValidation(error.response.data.errors);
      }
    },

    updateTagColor() {
      this.tag.color = this.color.hex;
    },

    goBack() {
      this.$router.push({ name: "examples-tag-management" });
    },
  },
};
</script>
