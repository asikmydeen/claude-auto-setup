<template>
  <div class="row">
    <div class="col-xl-12 order-xl-1">
      <card>
        <div slot="header" class="row align-items-center">
          <h4 class="card-title col-8">Edit Role</h4>
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
              addon-left-icon="now-ui-icons users_circle-08"
              v-model="role.name"
              :error="apiValidationErrors.name"
            />

            <div class="my-4">
              <n-button
                type="button"
                class="btn btn-sm btn-primary"
                native-type="submit"
              >
                Update Role
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
export default {
  layout: "DashboardLayout",

  mixins: [formMixin],

  data() {
    return {
      role: {
        type: "roles",
        name: null,
      },
    };
  },
  created() {
    this.get();
  },

  methods: {
    async get() {
      try {
        const id = this.$route.params.id;
        await this.$store.dispatch("roles/get", id);
        this.role = this.$store.getters["roles/role"];
      } catch (e) {
        await this.$store.dispatch(
          "alerts/error",
          "Oops, something went wrong!"
        );
      }
    },
    goBack() {
      this.$router.push({ name: "List Roles" });
    },

    async handleSubmit() {
      if (
        this.$isDemo == 1 &&
        ["1", "2", "3"].includes(this.$route.params.id)
      ) {
        await this.$store.dispatch(
          "alerts/error",
          "You are not allowed to change data of default roles."
        );
        return;
      }
      try {
        this.resetApiValidation();
        await this.$store.dispatch("roles/update", this.role);

        await this.$store.dispatch(
          "alerts/success",
          "Role updated successfully."
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
  },
};
</script>
