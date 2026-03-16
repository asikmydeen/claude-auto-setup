<template>
  <div class="py-4 container-fluid">
    <div class="row">
      <div class="col-12">
        <div class="card">
          <!-- Card header -->
          <div class="pb-0 card-header">
            <div class="d-lg-flex">
              <div>
                <h5 class="mb-0">Edit Role</h5>
              </div>
              <div class="my-auto mt-4 ms-auto mt-lg-0">
                <div class="my-auto ms-auto">
                  <router-link :to="{ name: 'Role Management' }" class="mb-0 btn bg-gradient-success btn-sm">Back to
                    list</router-link>
                </div>
              </div>
            </div>
          </div>
          <hr>
          <form role="form" @submit.prevent="handleEditRole()">
            <div class="card-body m-3">
              <label>Name</label>
              <argon-input id="roleName" v-model="roleName.name" type="text" class="mb-0" :value="roleName.name"></argon-input>
              <validation-error :errors="apiValidationErrors.name" />
              <argon-button class="float-end mt-6 mb-3" color="dark" variant="gradient" size="sm">Edit Role
              </argon-button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ArgonInput from '../../../components/ArgonInput.vue';
import ArgonButton from '../../../components/ArgonButton.vue';
import formMixin from "../../../mixins/form-mixin.js"
import ValidationError from "../../../components/ValidationError.vue";
import showSwal from '../../../mixins/showSwal.js';

export default {
  name: "EditRolePage",
  components: {
    ArgonInput,
    ArgonButton,
    ValidationError
  },
  mixins: [formMixin, showSwal],
  data() {
    return {
      roleName: {},
      options: {
        sort: "created_at",
        query: "",
        nr: "1",
        perpage: "5"
      }
    }
  },
  async mounted() {
    await this.$store.dispatch("role/getRole", this.$route.params.id);
    this.roleName = await this.$store.getters["role/oneRole"];

  },
  methods: {
    async handleEditRole() {
      try {
        await this.$store.dispatch("role/editRole", this.roleName);
        await this.$store.dispatch("role/rolesList", {
          ...(this.options.sort ? { sort: this.options.sort } : {}),
          filter: { 
            ...(this.options.query ? { name: this.options.query } : {}),
          },
          page: {
            number: this.options.nr,
            size: this.options.perpage,
          },
        });
        this.resetApiValidation();
        this.showSwal({
          type: "success",
          message: "Role edited successfully!"
        });
        await this.$router.push({ name: 'Role Management' });
      }
      catch (error) {
        this.setApiValidation(error.response.data.errors);
        this.showSwal({
          type: "error",
          message: "Oops, something went wrong!"
        });
      }
    },
  }
};
</script>
