<template>
  <div class="card">
    <div class="card-header">
      <h3>Edit Profile</h3>
    </div>
    <div class="card-body">
      <form ref="profile_form" @submit.prevent="handleProfileUpdate">
        <div class="form-group">
          <label> Profile Photo </label>
          <div v-if="image" class="profile-image pb-4">
            <img :src="`${image}`" class="profile-image now-ui-image" />
          </div>
          <div v-else class="profile-image">
            <img src="/img/placeholder.jpg" class="now-ui-image" />
          </div>
          <div class="image-upload mb-3">
            <n-button
              v-if="image"
              type="button"
              class="btn btn-sm btn-danger mr-2"
              @click.native="removeImage"
            >
              <span>
                <i class="fa fa-times" />
                Remove
              </span>
            </n-button>

            <input
              id="imageInput"
              ref="imageInput"
              accept="image/*"
              type="file"
              style="display: none"
              @input="onFileChange"
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
              <label v-else class="mb-0" style="color: white; cursor: pointer"
                >Change</label
              >
            </n-button>
          </div>
        </div>
        <validation-error :error="apiValidationErrors.attachment" />
        <label style="display: flex">Name</label>
        <fg-input
          prepend-icon="fas fa-user"
          placeholder="Your name"
          v-model="user.name"
          addon-left-icon="now-ui-icons users_circle-08"
          :error="apiValidationErrors.name"
        />
        <label>Email</label>
        <fg-input
          prepend-icon="fas fa-envelope"
          placeholder="Email"
          v-model="user.email"
          addon-left-icon="now-ui-icons ui-1_email-85"
          :error="apiValidationErrors.email"
        />

        <div class="my-4">
          <n-button
            type="button"
            class="btn btn-sm btn-primary"
            native-type="submit"
          >
            Submit
          </n-button>
        </div>
      </form>
    </div>
  </div>
</template>
<script>
import formMixin from "@/mixins/form-mixin";
import ValidationError from "@/components/ValidationError.vue";

export default {
  name: "UserEditCard",
  components: {
    ValidationError,
  },

  mixins: [formMixin],

  props: {
    user: Object,
  },

  data() {
    return {
      image: null,
      file: null,
    };
  },

  methods: {
    onClickFile() {
      this.$refs.imageInput.click();
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
      this.image = null;
    },

    async handleProfileUpdate() {
      if (this.$isDemo == 1 && ["1", "2", "3"].includes(this.user.id)) {
        await this.$store.dispatch(
          "alerts/error",
          "You are not allowed to change data of default users."
        );
        return;
      }
      try {
        this.resetApiValidation();
        if (this.file) {
          await this.$store.dispatch("users/upload", {
            user: this.user,
            image: this.file,
          });
          this.user.profile_image = await this.$store.getters["users/url"];
        }

        await this.$store.dispatch("profile/update", this.user);

        await this.$store.dispatch(
          "alerts/success",
          "Profile updated successfully."
        );
        await this.$store.getters["profile/me"];
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
