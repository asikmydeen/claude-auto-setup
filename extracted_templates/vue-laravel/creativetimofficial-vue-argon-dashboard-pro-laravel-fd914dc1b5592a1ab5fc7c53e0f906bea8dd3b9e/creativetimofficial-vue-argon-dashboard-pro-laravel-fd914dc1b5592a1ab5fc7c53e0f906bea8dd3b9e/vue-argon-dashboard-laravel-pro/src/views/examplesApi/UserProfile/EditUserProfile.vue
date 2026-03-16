<template>
  <div id="profile" class="card card-body mt-4 m-usercard">
    <div class="row justify-content-center align-items-center">
      <div class="col-sm-auto col-4">
        <div class="avatar avatar-xl">
          <img :src="profileImage()" :alt="user.name" class="shadow-sm border-radius-lg h-100 profile-image">
        </div>
      </div>
      <div class="col-sm-auto col-8 my-auto">
        <div class="h-100">
          <h5 class="mb-1 font-weight-bolder">{{ user.name }}</h5>
          <p class="mb-0 font-weight-bold text-sm">CEO / Co-Founder</p>
        </div>
      </div>
      <div class="col-sm-auto ms-sm-auto mt-sm-0 mt-3 d-flex">
        <label class="form-check-label mb-0 me-2">
          <small id="profileVisibility">Switch to invisible</small>
        </label>
        <argon-switch
          id="switch-invisible"
          name="Switch to Invisible"
          checked
        />
      </div>
    </div>
  </div>
  <div class="d-flex justify-content-around">
    <div class="col-lg-8 mw-100 w-100-userprofile">
      <form role="form" @submit.prevent="handleChangeProfile()">
        <div id="basic-info" class="card mt-4">
          <div class="card-header">
            <h5>Basic Info</h5>
          </div>
          <div class="card-body pt-0">
            <div class="d-flex justify-content-between">
              <div class="col-lg-8">
                <div class="row">
                  <div class="col-11">
                    <label class="form-label">Name</label>
                    <argon-input
                      id="name"
                      v-model="userToUpdate.name"
                      type="text"
                      :value="userToUpdate.name"
                    />
                    <validation-error :errors="apiValidationErrors.name" />
                  </div>
                </div>
                <div class="row">
                  <div class="col-11">
                    <label class="form-label mt-2">Email</label>
                    <argon-input
                      id="email"
                      v-model="userToUpdate.email"
                      type="email"
                      placeholder="example@email.com"
                      :value="userToUpdate.email"
                    />
                    <validation-error :errors="apiValidationErrors.email" />
                  </div>
                </div>
              </div>
              <div class="col-lg-4 d-flex align-items-center text-center">
                <div class="col-12">
                  <div class="avatar avatar-xxl position-relative">
                    <img
                      :src="previewImage()"
                      width="110"
                      height="110"
                      class="border-radius-md profile-image"
                      alt="team-2"
                    />
                    <i
                      class="fa fa-pen userprofile-button bottom-0 position-absolute end-0"
                    ></i>
                    <input
                      type="file"
                      class="uploadImage bottom-0 btn btn-sm btn-icon-only bg-gradient-light position-absolute end-0 mb-n2 me-n2"
                      accept="image/png, image/jpg, image/jpeg"
                      @input="onFileChange"
                    />
                    <argon-button
                      v-if="image"
                      type="button"
                      color="danger"
                      class="removeImage bottom-0 btn btn-sm btn-icon-only position-absolute start-0 mb-n2"
                      @click="removeImage"
                      ><i class="fa fa-remove"></i
                    ></argon-button>
                  </div>
                </div>
              </div>
            </div>
            <div class="d-flex justify-content-end">
              <validation-error :errors="apiValidationErrors.attachment" />
            </div>
            <argon-button
              class="float-end mt-6 mb-0"
              color="dark"
              variant="gradient"
              size="sm"
              >Update Info
            </argon-button>
          </div>
        </div>
      </form>
      <form role="form" @submit.prevent="handleChangeProfile()">
        <div id="password" class="card mt-4">
          <div class="card-header">
            <h5>Change Password</h5>
          </div>
          <div class="card-body pt-0">
            <label class="form-label">New password</label>
            <argon-input
              id="new-password"
              v-model="userToUpdate.password"
              type="password"
              placeholder="New Password"
              :value="userToUpdate.password"
            />
            <div class="row mb-2">
              <validation-error :errors="apiValidationErrors.password" />
            </div>
            <label class="form-label">Confirm new password</label>
            <argon-input
              id="confirm-password"
              v-model="userToUpdate.password_confirmation"
              type="password"
              placeholder="Confirm password"
              :value="userToUpdate.password_confirmation"
            />
            <h5 class="mt-5">Password requirements</h5>
            <p class="text-muted mb-2">
              Please follow this guide for a strong password:
            </p>
            <ul class="text-muted ps-4 mb-0 float-start">
              <li>
                <span class="text-sm">One special characters (recommended)</span>
              </li>
              <li>
                <span class="text-sm">Min 8 characters</span>
              </li>
              <li>
                <span class="text-sm">One number (2 are recommended)</span>
              </li>
              <li>
                <span class="text-sm">Change it often</span>
              </li>
            </ul>
            <argon-button
              class="float-end mt-6 mb-0"
              color="dark"
              variant="gradient"
              size="sm"
              >Update password
            </argon-button>
          </div>
        </div>
      </form>
    </div>
    <div
      class="card position-sticky top-1 mt-4 h-100 col-lg-3 d-md-inline d-none mw-30"
    >
      <profile-info-card
        title="Profile Information"
        description="Hi, I’m Alec Thompson, Decisions: If you can’t decide, the answer is no. If two equally difficult paths, choose the one more painful in the short term (pain avoidance is creating an illusion of equality)."
        :info="{
          fullName: 'Alec M. Thompson',
          mobile: '(44) 123 1234 123',
          email: 'alecthompson@mail.com',
          location: 'USA',
        }"
        :social="[
          {
            link: 'https://www.facebook.com/CreativeTim/',
            icon: 'fab fa-facebook fa-lg',
          },
          {
            link: 'https://twitter.com/creativetim',
            icon: 'fab fa-twitter fa-lg',
          },
          {
            link: 'https://www.instagram.com/creativetimofficial/',
            icon: 'fab fa-instagram fa-lg',
          },
        ]"
        :action="{
          route: 'javascript:;',
          tooltip: 'Edit Profile',
        }"
      />
    </div>
  </div>
</template>

<script>
import ProfileInfoCard from "../../pages/profile/components/ProfileInfoCard.vue";
import ArgonButton from "@/components/ArgonButton.vue";
import ArgonSwitch from "@/components/ArgonSwitch.vue";
import ArgonInput from "@/components/ArgonInput.vue";
import placeholder from "../../../assets/img/placeholder.jpg";
import formMixin from "../../../mixins/form-mixin.js";
import ValidationError from "../../../components/ValidationError.vue";
import showSwal from "../../../mixins/showSwal.js";

export default {
  name: "SideNavItem",
  components: {
    ArgonButton,
    ArgonSwitch,
    ArgonInput,
    ProfileInfoCard,
    ValidationError,
  },
  mixins: [formMixin, showSwal],
  data() {
    return {
      file: "",
      image: "",
      userToUpdate: {},
    };
  },
  computed: {
    user() {
      return this.$store.getters["profile/me"];
    },
  },

  async mounted() {
    this.userToUpdate = { ...this.user };
  },

  methods: {
    profileImage() {
      return this.userToUpdate.profile_image
        ? this.userToUpdate.profile_image
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

    async handleChangeProfile() {
      try {
        if(this.$isDemo == 1 && this.userToUpdate.id <= 3) {
          this.showSwal({
                type: "error",
                message: "You are not allowed to change data of default users.",
                width: 400
            });
        }
        else{
          if (this.image) {
            await this.$store.dispatch("user/uploadImageProfile", {
              image: this.file,
              id: this.userToUpdate.id,
            });
            this.userToUpdate.profile_image = await this.$store.getters["user/imageProfile"];
          }

          await this.$store.dispatch("profile/update", this.userToUpdate);

          this.removeImage();
          this.resetApiValidation();
          this.showSwal({
            type: "success",
            message: "Profile updated successfully!"
          });

          await this.$store.dispatch("profile/me");
        }
      } catch (error) {
        this.setApiValidation(error.response.data.errors);
        this.showSwal({
          type: "error",
          message: "Oops, something went wrong!"
        });
      }
    },
  },
};
</script>
