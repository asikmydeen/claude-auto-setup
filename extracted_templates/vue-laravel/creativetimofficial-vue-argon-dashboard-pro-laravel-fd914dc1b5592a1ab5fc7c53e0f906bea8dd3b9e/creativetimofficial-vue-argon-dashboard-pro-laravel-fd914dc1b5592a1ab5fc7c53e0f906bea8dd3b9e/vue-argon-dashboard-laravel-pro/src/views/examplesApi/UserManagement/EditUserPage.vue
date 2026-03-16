<template>
  <div class="py-4 container-fluid">
    <div class="row">
      <div class="col-12">
        <div class="card">
          <!-- Card header -->
          <div class="pb-0 card-header">
            <div class="d-lg-flex">
              <div>
                <h5 class="mb-0">Edit User</h5>
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
          <form role="form" @submit.prevent="handleEditUser()">
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
                v-model="editUser.name"
                type="text"
                placeholder="Your Name"
                class="mb-0"
                :value="editUser.name"
              >
              </argon-input>
              <div class="mb-3">
                <validation-error :errors="apiValidationErrors.name" />
              </div>
              <label>Email</label>
              <argon-input
                id="email"
                v-model="editUser.email"
                type="email"
                placeholder="Email"
                class="mb-0"
                :value="editUser.email"
              >
              </argon-input>
              <div class="mb-3">
                <validation-error :errors="apiValidationErrors.email" />
              </div>
              <div class="form-group">
                <label class="form-label mt-2">Role</label>
                <select
                  id="choices-role"
                  v-model="editUser.roles[0].id"
                  class="form-control"
                  name="choices-role"
                >
                  <option
                    v-for="role in roleList"
                    :key="role.id"
                    :value="role.id"
                  >
                    {{ role.name }}
                  </option>
                </select>
              </div>
              <label>Password</label>
              <argon-input
                id="new-password"
                v-model="editUser.password"
                type="password"
                placeholder="New Password"
                class="mb-0"
                :value="editUser.password"
              ></argon-input>
              <div class="mb-3">
                <validation-error :errors="apiValidationErrors.password" />
              </div>
              <label>Confirm Password</label>
              <argon-input
                id="confirm-password"
                v-model="editUser.password_confirmation"
                type="password"
                placeholder="Confirm Password"
                :value="editUser.password_confirmation"
              ></argon-input>
              <argon-button
                class="float-end mt-6 mb-3"
                color="dark"
                variant="gradient"
                size="sm"
                >Edit User
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
  name: "EditUserPage",
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
      editUser: {
        roles: [
          {
            id: "",
            name: "",
          },
        ],
      },
      options: {
        sort: "created_at",
        query: "",
        nr: "1",
        perpage: "5",
      },
    };
  },
  computed: {
    roleList() {
      return this.$store.getters["role/rolesList"]?.data;
    },
    userInfo() {
      return { ...this.$store.getters["user/user"] };
    },
  },
  async mounted() {
    await this.$store.dispatch("role/rolesList");

    await this.$store.dispatch("user/getUser", this.$route.params.id);

    this.editUser = this.userInfo;

    if (document.getElementById("choices-role")) {
      var role = document.getElementById("choices-role");
      var selected = new Choices(role);
      selected.setChoiceByValue(this.editUser.roles[0].id);
    }
  },
  methods: {
    async handleEditUser() {
      try {
        this.resetApiValidation();
        if (this.image) {
          await this.handlePostImage();
        }
        await this.$store.dispatch("user/updateUser", this.editUser);
        this.showSwal({
          type: "success",
          message: "User edited successfully!",
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
      } catch (error) {
        this.setApiValidation(error.response.data.errors);
        this.showSwal({
          type: "error",
          message: "Oops, something went wrong!",
        });
      }
    },

    async handlePostImage() {
      try {
        await this.$store.dispatch("user/uploadImageProfile", {
          image: this.file,
          id: this.userInfo.id,
        });
        this.editUser.profile_image = await this.$store.getters[
          "user/imageProfile"
        ];
      } catch (error) {
        this.setApiValidation(error.response.data.errors);
        this.showSwal({
          type: "error",
          message: "Oops, something went wrong!",
        });
      }
    },

    profileImage() {
      return this.editUser.profile_image
        ? this.editUser.profile_image
        : placeholder;
    },

    previewImage() {
      return this.image ? this.image : this.profileImage();
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
