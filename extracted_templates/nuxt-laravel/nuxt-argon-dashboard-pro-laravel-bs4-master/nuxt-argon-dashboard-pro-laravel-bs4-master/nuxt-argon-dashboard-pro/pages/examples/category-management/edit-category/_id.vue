<template>
  <div class="container-fluid mt-5">
    <div class="row">
      <div class="col-xl-12 order-xl-1">
        <card>
          <div slot="header" class="row align-items-center">
            <div class="col-8">
              <h3 class="mb-0">Edit Category</h3>
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
            <form ref="category_form" @submit.prevent="handleSubmit">
              <base-input
                label="Name"
                prepend-icon="fas fa-user"
                v-model="category.name"
              />
              <validation-error :errors="apiValidationErrors.name" />
              <base-input
                label="Description"
                prepend-icon="fas fa-user"
                v-model="category.description"
              />
              <validation-error :errors="apiValidationErrors.description" />
              <div class="my-4">
                <base-button
                  type="button"
                  class="btn btn-sm btn-primary"
                  native-type="submit"
                >
                  Update Category
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
export default {
  layout: "DashboardLayout",

  mixins: [formMixin],

  components: {
    ValidationError,
  },

  async fetch() {
    try {
      const id = this.$route.params.id;
      await this.$store.dispatch("categories/get", id);
      this.category = { ...this.$store.getters["categories/category"] };
    } catch (error) {
      this.$notify({
        type: "danger",
        message: `Oops, something went wrong!`,
      });
      this.setApiValidation(error.response.data.errors);
    }
  },

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
    goBack() {
      this.$router.push({ name: "examples-category-management" });
    },

    async handleSubmit() {
      if (this.$isDemo == 1 && ["1", "2"].includes(this.$route.params.id)) {
        this.$notify({
          type: "danger",
          message: "You are not allowed not change data of default categories.",
        });
        return;
      }
      try {
        await this.$store.dispatch("categories/update", this.category);

        this.$notify({
          type: "success",
          message: "Category updated successfully.",
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
  },
};
</script>
