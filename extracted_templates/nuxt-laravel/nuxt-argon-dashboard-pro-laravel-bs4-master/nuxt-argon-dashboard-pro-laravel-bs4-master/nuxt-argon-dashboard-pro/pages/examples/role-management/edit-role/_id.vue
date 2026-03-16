<template>
  <div class="container-fluid mt-5">
    <div class="row">
      <div class="col-xl-12 order-xl-1">
        <card>
          <div slot="header" class="row align-items-center">
            <div class="col-8">
              <h3 class="mb-0">Edit Role</h3>
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
            <form ref="profile_form" @submit.prevent="handleSubmit">
              <base-input
                label="Name"
                prepend-icon="fas fa-user"
                v-model="role.name"
              />
              <validation-error :errors="apiValidationErrors.name" />
              <div class="my-4">
                <base-button
                  type="button"
                  class="btn btn-sm btn-primary"
                  native-type="submit"
                >
                  Update Role
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
      await this.$store.dispatch("roles/get", id);
      this.role = { ...this.$store.getters["roles/role"] };
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
      role: {
        type: "roles",
        name: null,
      },
    };
  },

  methods: {
    goBack() {
      this.$router.push({ name: "examples-role-management" });
    },

    async handleSubmit() {
      if (
        this.$isDemo == 1 &&
        ["1", "2", "3"].includes(this.$route.params.id)
      ) {
        this.$notify({
          type: "danger",
          message: "You are not allowed not change data of default roles.",
        });
        return;
      }
      try {
        await this.$store.dispatch("roles/update", this.role);

        this.$notify({
          type: "success",
          message: "Role updated successfully.",
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
