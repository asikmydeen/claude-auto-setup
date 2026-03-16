<template>
  <div class="row">
    <div class="col-xl-12 order-xl-1">
      <card>
        <div slot="header" class="row align-items-center">
          <h4 class="card-title col-8">Edit User</h4>
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
            <div class="form-group">
              <label class="form-control-label"> Picture </label>
              <div v-if="image" class="profile-image pb-4">
                <img :src="`${image}`" class="profile-image now-ui-image" />
              </div>
              <div v-else class="profile-image">
                <img src="/img/placeholder.jpg" class="now-ui-image" />
              </div>
              <div class="image-upload mb-3">
                <n-button
                  class="btn btn-sm"
                  v-if="image"
                  type="danger"
                  @click.native="removeImage"
                >
                  <i slot="label" class="now-ui-icons ui-1_simple-remove"></i>
                  Remove
                </n-button>

                <input
                  id="imageInput"
                  ref="imageInput"
                  accept="image/*"
                  type="file"
                  style="display: none"
                  @input="onSelectFile"
                />

                <n-button
                  type="button"
                  class="btn btn-sm btn-primary"
                  @click.native="onClickFile"
                >
                  <label
                    v-if="!image"
                    class="mb-0"
                    style="color: white; cursor: pointer"
                    >Select image</label
                  >
                  <label
                    v-else
                    class="mb-0"
                    style="color: white; cursor: pointer"
                    >Change</label
                  >
                </n-button>
              </div>
            </div>

            <validation-error :error="apiValidationErrors.attachment" />

            <label style="display: flex">Name</label>
            <fg-input
              v-model="user.name"
              name="name"
              placeholder="Your name"
              addon-left-icon="now-ui-icons users_circle-08"
              :error="apiValidationErrors.name"
            />

            <label>Email</label>
            <fg-input
              v-model="user.email"
              name="email"
              placeholder="Email"
              addon-left-icon="now-ui-icons ui-1_email-85"
              :error="apiValidationErrors.email"
            />

            <label>Role</label>
            <el-select
              name="role"
              v-model="user.roles[0].id"
              class="select-default"
              placeholder="Select..."
              style="display: flex"
            >
              <el-option
                v-for="role in available_roles"
                :key="role.id"
                :value="role.id"
                :label="role.name"
              >
              </el-option>
            </el-select>

            <label class="mt-2">Password</label>
            <fg-input
              v-model="user.password"
              type="password"
              name="password"
              placeholder="Password"
              addon-left-icon="now-ui-icons ui-1_lock-circle-open"
              :error="apiValidationErrors.password"
            >
            </fg-input>

            <label>Confirm Password</label>
            <fg-input
              v-model="user.password_confirmation"
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              addon-left-icon="now-ui-icons ui-1_lock-circle-open"
            >
            </fg-input>

            <div class="my-4">
              <n-button
                type="button"
                class="btn btn-sm btn-primary"
                native-type="submit"
              >
                Update User
              </n-button>
            </div>
          </form>
        </div>
      </card>
    </div>
  </div>
</template>
<script>
import ValidationError from "@/components/ValidationError.vue";
import formMixin from "@/mixins/form-mixin";
import { Select, Option } from "element-ui";
import { FormGroupInput as FgInput } from "src/components/index";
import { cloneDeep } from "lodash";
export default {
  components: {
    FgInput,
    [Option.name]: Option,
    [Select.name]: Select,
    ValidationError,
  },
  layout: "DashboardLayout",

  mixins: [formMixin],

  data() {
    return {
      image: "",
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
  created() {
    this.get();
    this.getRoles();
  },

  methods: {
    async get() {
      try {
        const id = this.$route.params.id;
        await this.$store.dispatch("users/get", id);
        this.user = this.$store.getters["users/user"];
      } catch (error) {
        await this.$store.dispatch(
          "alerts/error",
          "Oops, something went wrong!"
        );
        this.setApiValidation(error.response.data.errors);
      }
    },

    goBack() {
      this.$router.push({ name: "List Users" });
    },
    removeImage() {
      this.image = null;
    },

    async handleSubmit() {
      if (
        this.$isDemo == 1 &&
        ["1", "2", "3"].includes(this.$route.params.id)
      ) {
        await this.$store.dispatch(
          "alerts/error",
          "You are not allowed to change data of default users."
        );
        return;
      }
      try {
        this.resetApiValidation();
        if (this.image) {
          await this.$store.dispatch("users/upload", {
            user: this.user,
            image: this.file,
          });
          this.user.profile_image = await this.$store.getters["users/url"];
        }
        await this.$store.dispatch("users/update", this.user);
        await this.$store.dispatch(
          "alerts/success",
          "User updated successfully."
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
    async onSelectFile(e) {
      let files = e.target.files || e.dataTransfer.files;
      if (!files.length) return;
      this.createImage(files[0]);
    },

    onClickFile() {
      this.$refs.imageInput.click();
    },

    createImage(file) {
      let reader = new FileReader();
      reader.onload = (e) => {
        this.image = e.target.result;
        this.file = file;
      };
      reader.readAsDataURL(file);
    },
    async getRoles() {
      try {
        await this.$store.dispatch("roles/list");
        this.available_roles = await this.$store.getters["roles/dropdown"];
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
