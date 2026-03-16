<template>
  <div class="container-fluid mt-5">
    <div class="row">
      <div class="col-xl-12 order-xl-1">
        <card>
          <div slot="header" class="row align-items-center">
            <div class="col-8">
              <h3 class="mb-0">Edit User</h3>
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
              <div class="form-group">
                <label class="form-control-label"> Picture </label>
                <div v-if="image" class="profile-image card-img pb-4">
                  <img
                    :src="`${user.profile_image}`"
                    class="profile-image argon-image"
                  />
                </div>
                <div v-else class="profile-image">
                  <img src="/img/placeholder.jpg" class="argon-image" />
                </div>
                <div class="image-upload">
                  <base-button
                    v-if="image"
                    type="button"
                    class="btn btn-sm btn-danger"
                    @click="removeImage"
                  >
                    <span>
                      <i class="fa fa-times" />
                      Remove
                    </span>
                  </base-button>
                  <base-button type="button" class="btn btn-sm btn-primary">
                    <label v-if="!image" for="imageInput" class="mb-0"
                      >Select image</label
                    >
                    <label v-else for="imageInput" class="mb-0">Change</label>
                    <input
                      id="imageInput"
                      ref="imageInput"
                      accept="image/*"
                      type="file"
                      style="display: none"
                      @change="onSelectFile"
                    />
                  </base-button>
                </div>
              </div>
              <validation-error :errors="apiValidationErrors.attachment" />

              <base-input
                label="Name"
                prepend-icon="fas fa-user"
                placeholder="Your name"
                v-model="user.name"
              />
              <validation-error :errors="apiValidationErrors.name" />

              <base-input
                label="Email"
                prepend-icon="fas fa-envelope"
                placeholder="Email"
                v-model="user.email"
              />
              <validation-error :errors="apiValidationErrors.email" />

              <base-input label="Role">
                <el-select
                  name="role"
                  v-model="user.roles[0].id"
                  prepend-icon="fas fa-user"
                >
                  <el-option
                    v-for="role in available_roles"
                    :key="role.id"
                    :value="role.id"
                    :label="role.name"
                  >
                  </el-option>
                </el-select>
              </base-input>

              <base-input
                v-model="user.password"
                type="password"
                name="new_password"
                class="mb-3"
                prepend-icon="fa fa-key"
                placeholder="New Password"
                label="Password"
              />
              <validation-error :errors="apiValidationErrors.password" />

              <base-input
                v-model="user.password_confirmation"
                type="password"
                name="confirm_password"
                autocomplete="on"
                class="mb-3"
                prepend-icon="fa fa-key"
                placeholder="Confirm Password"
                label="Confirm Password"
              />
              <validation-error
                :errors="apiValidationErrors.password_confirmation"
              />

              <div class="my-4">
                <base-button
                  type="button"
                  class="btn btn-sm btn-primary"
                  native-type="submit"
                >
                  Update User
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
import BaseInput from "~/components/argon-core/Inputs/BaseInput.vue";
import BaseButton from "~/components/argon-core/BaseButton.vue";
import ValidationError from "~/components/ValidationError.vue";
import { Select, Option } from "element-ui";
import formMixin from "@/mixins/form-mixin";
import { cloneDeep } from "lodash";

export default {
  layout: "DashboardLayout",

  components: {
    BaseInput,
    BaseButton,
    ValidationError,
    [Select.name]: Select,
    [Option.name]: Option,
  },
  mixins: [formMixin],

  data() {
    return {
      image: null,
      available_roles: [],
      user: {
        type: "users",
        name: null,
        email: null,
        password: null,
        password_confirmation: null,
        profile_image: null,
        relationshipNames: ["roles"],
        roles: [
          {
            type: "roles",
            id: null,
          },
        ],
      },
    };
  },

  async fetch() {
    try {
      const id = this.$route.params.id;
      await this.$store.dispatch("users/get", id);
      this.user = await cloneDeep(this.$store.getters["users/user"]);

      await this.$store.dispatch("roles/list");
      this.available_roles = await cloneDeep(
        this.$store.getters["roles/dropdown"]
      );
    } catch (error) {
      this.$notify({
        type: "danger",
        message: `Oops, something went wrong!`,
      });
      this.setApiValidation(error.response.data.errors);
    }
  },

  methods: {
    goBack() {
      this.$router.push({ name: "examples-user-management" });
    },

    removeImage() {
      this.image = null;
    },

    async handleSubmit() {
      if (
        this.$isDemo == 1 &&
        ["1", "2", "3"].includes(this.$route.params.id)
      ) {
        this.$notify({
          type: "danger",
          message: "You are not allowed not change data of default users.",
        });
        return;
      }
      try {
        if (this.image) {
          await this.$store.dispatch("users/upload", {
            user: this.user,
            image: this.image,
            axios: this.$axios,
          });
          this.user.profile_image = await this.$store.getters["users/url"];
        }
        await this.$store.dispatch("users/update", this.user);
        this.$notify({
          type: "success",
          message: "User updated successfully.",
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

    async onSelectFile(e) {
      let files = e.target.files || e.dataTransfer.files;
      if (!files.length) return;
      this.createImage(files[0]);
    },

    createImage(file) {
      let reader = new FileReader();
      reader.onload = (e) => {
        this.user.profile_image = e.target.result;
        this.image = file;
      };
      reader.readAsDataURL(file);
    },
  },
};
</script>
