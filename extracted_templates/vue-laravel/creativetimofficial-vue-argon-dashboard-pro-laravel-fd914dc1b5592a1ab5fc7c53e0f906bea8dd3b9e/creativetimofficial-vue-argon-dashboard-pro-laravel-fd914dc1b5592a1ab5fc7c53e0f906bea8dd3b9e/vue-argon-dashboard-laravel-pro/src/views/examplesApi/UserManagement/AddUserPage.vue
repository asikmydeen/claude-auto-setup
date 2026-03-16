<template>
  <div class="py-4 container-fluid">
    <div class="row">
      <div class="col-12">
        <div class="card">
          <!-- Card header -->
          <div class="pb-0 card-header">
            <div class="d-lg-flex">
              <div>
                <h5 class="mb-0">Add User</h5>
              </div>
              <div class="my-auto mt-4 ms-auto mt-lg-0">
                <div class="my-auto ms-auto">
                  <router-link
                    :to="{ name: 'User Management' }"
                    class="mb-0 btn bg-gradient-success btn-sm"
                    >Back to list</router-link
                  >
                </div>
              </div>
            </div>
          </div>
          <hr />
          <form role="form" @submit.prevent="handleCreateUser()">
            <div class="card-body m-3">
              <label>Picture</label>
              <div class="d-flex">
                <div class="col-lg-12 d-flex flex-column mb-3">
                  <div
                    class="d-flex col-lg-4 width-image-preview justify-content-center"
                  >
                    <img
                      width="175"
                      height="175"
                      :src="previewImage()"
                      class="shadow-lg border-radius-md mb-3 profile-image"
                      alt="Image"
                    />
                  </div>
                  <div
                    class="col-lg-8 d-flex width-image-preview justify-content-center"
                    :class="{ 'justify-content-between': image }"
                  >
                    <label
                      for="imageUpload"
                      class="mb-0 btn bg-gradient-success buttons-image-item"
                      :class="{ 'buttons-action-image': image }"
                      >Select Image</label
                    >
                    <input
                      id="imageUpload"
                      type="file"
                      class="d-none"
                      accept="image/png, image/jpg, image/jpeg"
                      @input="onFileChange"
                    />
                    <argon-button
                      v-if="image"
                      type="button"
                      class="mb-0 alert-danger buttons-image-item buttons-action-image"
                      @click="removeImage"
                    >
                      Delete Image
                    </argon-button>
                  </div>
                  <validation-error :errors="apiValidationErrors.attachment" />
                </div>
              </div>
              <label>Name</label>
              <argon-input
                id="name"
                v-model="newUser.name"
                type="text"
                placeholder="Your Name"
                class="mb-0"
                :value="newUser.name"
              ></argon-input>
              <div class="mb-3">
                <validation-error :errors="apiValidationErrors.name" />
              </div>
              <label>Email</label>
              <argon-input
                id="email"
                v-model="newUser.email"
                type="text"
                placeholder="Email"
                class="mb-0"
                :value="newUser.email"
              ></argon-input>
              <div class="mb-3">
                <validation-error :errors="apiValidationErrors.email" />
              </div>
              <div class="form-group mb-0">
                <label class="form-label mt-2">Role</label>
                <select
                  id="choices-role"
                  v-model="newUser.roles[0].id"
                  class="form-control"
                  name="choices-role"
                >
                  <option value="" selected disabled>Select Role</option>
                  <option
                    v-for="role in roleList"
                    :key="role.id"
                    :value="role.id"
                  >
                    {{ role.name }}
                  </option>
                </select>
              </div>
              <div class="mb-3">
                <validation-error :errors="apiValidationErrors.roles" />
              </div>
              <label>Password</label>
              <argon-input
                id="password"
                v-model="newUser.password"
                type="password"
                class="mb-0"
                placeholder="Password"
                :value="newUser.password"
              ></argon-input>
              <div class="mb-3">
                <validation-error :errors="apiValidationErrors.password" />
              </div>
              <label>Confirm Password</label>
              <argon-input
                id="confirm-password"
                v-model="newUser.password_confirmation"
                type="password"
                placeholder="Confirm Password"
                :value="newUser.password_confirmation"
              ></argon-input>
              <argon-button
                class="float-end mt-6 mb-3"
                color="dark"
                variant="gradient"
                size="sm"
                :disabled="loadingAdd"
                >Add User
              </argon-button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import * as Choices from "choices.js";
import ArgonInput from "../../../components/ArgonInput.vue";
import ArgonButton from "../../../components/ArgonButton.vue";
import placeholder from "../../../assets/img/placeholder.jpg";
import formMixin from "../../../mixins/form-mixin.js";
import ValidationError from "../../../components/ValidationError.vue";
import showSwal from "../../../mixins/showSwal.js";

export default {
  name: "AddUserPage",
  components: {
    ArgonInput,
    ArgonButton,
    ValidationError,
  },
  mixins: [formMixin, showSwal],
  data() {
    return {
      image: "",
      file: "",
      userInfo: "",
      newUser: {
        type: "users",
        name: "",
        email: "",
        profile_image: null,
        password: "",
        password_confirmation: "",
        relationshipNames: ["roles"],
        roles: [
          {
            id: "",
            type: "roles",
          },
        ],
      },
      options: {
        sort: "created_at",
        query: "",
        nr: "1",
        perpage: "5",
      },
      loadingAdd: false,
    };
  },
  computed: {
    roleList() {
      return this.$store.getters["role/rolesList"]?.data;
    },
  },
  async mounted() {
    await this.$store.dispatch("role/rolesList");

    if (document.getElementById("choices-role")) {
      var role = document.getElementById("choices-role");
      new Choices(role);
    }
  },
  methods: {
    async handleCreateUser() {
      try {
        this.loadingAdd = true;
        this.resetApiValidation();
        await this.$store.dispatch("user/createUser", this.newUser);
        if (this.image) {
          await this.handlePostImage();
        } else {
          this.showSwal({
            type: "success",
            message: "User added successfully!",
          });
          await this.$store.dispatch("user/getUsers", {
            ...(this.options.sort ? { sort: this.options.sort } : {}),
            filter: {
              ...(this.options.query ? { name: this.options.query } : {}),
            },
            page: {
              number: this.options.nr,
              size: this.options.perpage,
            },
          });
          await this.$router.push({ name: "User Management" });
          this.loadingAdd = false;
        }
      } catch (error) {
        this.loadingAdd = false;
        this.setApiValidation(error.response.data.errors);
        this.showSwal({
          type: "error",
          message: "Oops, something went wrong!",
        });
      }
    },

    async handlePostImage() {
      try {
        this.userInfo = await this.$store.getters["user/user"];
        await this.$store.dispatch("user/uploadImageProfile", {
          image: this.file,
          id: this.userInfo.id,
        });
        this.userInfo.profile_image = await this.$store.getters[
          "user/imageProfile"
        ];
        await this.handleUpdateImage();
      } catch (error) {
        this.loadingAdd = false;
        await this.$store.dispatch("user/deleteUser", this.userInfo.id);
        this.setApiValidation(error.response.data.errors);
        this.showSwal({
          type: "error",
          message: "Oops, something went wrong!",
        });
      }
    },

    async handleUpdateImage() {
      try {
        await this.$store.dispatch("user/updateUser", this.userInfo);
        this.resetApiValidation();
        this.showSwal({
          type: "success",
          message: "User added successfully!",
        });
        await this.$store.dispatch("user/getUsers", {
          ...(this.options.sort ? { sort: this.options.sort } : {}),
          filter: {
            ...(this.options.query ? { name: this.options.query } : {}),
          },
          page: {
            number: this.options.nr,
            size: this.options.perpage,
          },
        });
        await this.$router.push({ name: "User Management" });
        this.loadingAdd = false;
      } catch (error) {
        this.loadingAdd = false;
        this.showSwal({
          type: "error",
          message: "Oops, something went wrong!",
        });
      }
    },

    previewImage() {
      return this.image ? this.image : placeholder;
    },

    onFileChange(e) {
      let files = e.target.files || e.dataTransfer.files;
      if (!files.length) return;
      this.createImage(files[0]);
    },

    createImage(file) {
      let reader = new FileReader();
      reader.onload = (e) => {
        this.image = e.target.result;
        this.file = file;
      };
      reader.readAsDataURL(file);
    },

    removeImage() {
      this.file = null;
      this.image = null;
    },
  },
};
</script>
