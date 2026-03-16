<template>
  <div class="row">
    <div class="col-xl-12 order-xl-1">
      <card>
        <div slot="header" class="row align-items-center">
          <h4 class="card-title col-8">Add Category</h4>
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
              v-model="category.name"
              name="name"
              addon-left-icon="now-ui-icons users_circle-08"
              :error="apiValidationErrors.name"
            />

            <label>Description</label>
            <fg-input
              v-model="category.description"
              name="description"
              addon-left-icon="now-ui-icons users_circle-08"
              :error="apiValidationErrors.name"
            />

            <div class="my-4">
              <n-button
                type="button"
                class="btn btn-sm btn-primary"
                native-type="submit"
              >
                Add Category
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
export default {
  components: {
    FgInput,
    [Option.name]: Option,
    [Select.name]: Select,
  },
  layout: "DashboardLayout",

  mixins: [formMixin],

  data() {
    return {
      category: {
        type: "categories",
        name: null,
        description: null,
      },
    };
  },

  methods: {
    async handleSubmit() {
      try {
        this.resetApiValidation();
        await this.$store.dispatch("categories/add", this.category);

        await this.$store.dispatch(
          "alerts/success",
          "Category added successfully."
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

    goBack() {
      this.$router.push({ name: "List Categories" });
    },
  },
};
</script>
