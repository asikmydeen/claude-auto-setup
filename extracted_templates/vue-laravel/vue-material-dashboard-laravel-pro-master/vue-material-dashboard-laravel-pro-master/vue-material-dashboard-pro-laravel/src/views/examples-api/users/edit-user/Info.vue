<template>
  <div class="multisteps-form__panel border-radius-xl bg-white" data-animation="FadeIn">

    <div class="text-end">
      <material-button class="float-right btn btm-sm" @click.prevent="this.$router.push({ name: 'Users List' })">
        Back to list
      </material-button>
    </div>


    <div class="row mt-4 overflow-hidden">
      <div>
        <material-avatar :img="getImage" shadow="regular" class="image-fluid w-20 mt-7" :fixed-size="true"></material-avatar>

      </div>
      <div class="mt-1  mb-2">
        <material-button v-show="!file" size="sm" type="button">
          <label for="imageInput" class="mb-0 text-white small">Select Image</label>
          <input id="imageInput" type="file" style="display: none;" accept="image/*" @change.prevent="onFileChange">
        </material-button>

        <div v-show="file">
          <material-button class="mx-2" size="sm" type="button" color="danger" @click.prevent="onFileRemove">
            <label class="mb-0 text-white small"> &#10005; Remove</label>
          </material-button>
          <material-button size="sm" type="button">
            <label for="imageInput" class="mb-0 text-white small">Change</label>
            <input id="imageInput" type="file" style="display: none;" accept="image/*" @change.prevent="onFileChange">
          </material-button>    
        </div>
      </div>
    </div>

    <div class="row mt-5">

      <material-input id="name" v-model:value="user.name" label="Name" variant="static" name="name" />
      <validation-error :errors="apiValidationErrors.name" />

    </div>

    <div class="row mt-5">
      <material-input id="email" v-model:value="user.email" type="email" label="Email Address" variant="static"
        name="email" />
      <validation-error :errors="apiValidationErrors.email" />
    </div>

    <!--selectedRole-->
    <div class="mt-5">
      <label class="ms-0"> Role </label>
      <select id="choices-state" class="multisteps-form__select form-control" name="choices-state">
      </select>
    </div>

    <div class="row mt-5">
      <material-input id="password" v-model:value="user.password" variant="static" type="password" label="Password"
        name="password" />
      <validation-error :errors="apiValidationErrors.password" />
    </div>
    <div class="row mt-5">
      <material-input id="confirmPassword" v-model:value="user.password_confirmation" variant="static" type="password"
        label="Confirm Password" name="confirmPassword" />
    </div>

    <div class="button-row d-flex mt-4">
      <material-button type="button" color="dark" variant="gradient" class="ms-auto mb-0 js-btn-next"
        @click="handleEdit">Submit Changes</material-button>
    </div>
  </div>
</template>

<script>
import MaterialInput from "@/components/MaterialInput.vue";
import MaterialButton from "@/components/MaterialButton.vue";
import MaterialAvatar from "@/components/MaterialAvatar.vue";
import Choices from "choices.js";
import ValidationError from "@/components/ValidationError.vue";
import formMixin from "@/mixins/formMixin.js";
import showSwal from "../../../../mixins/showSwal";
import _ from "lodash";

export default {
  name: "Info",
  components: {
    MaterialInput,
    MaterialButton,
    MaterialAvatar,
    ValidationError,
  },
  mixins: [formMixin],
  props: {
    userId: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      user: {},
      file: null,
      roleChoices: null,
      loading: null,
      initialImageUrl: ""
    }
  },
  computed: {
    rolesList() {
      return this.$store.getters['roles/getRolesData'];

    },
    getImage() {
      if (!this.user.profile_image || this.loading) return require("@/assets/img/placeholder.jpg")
      else { return this.user.profile_image }
    }
  },
  async mounted() {
    this.loading = true;


    try {
      //get roles
      await this.$store.dispatch('roles/getRoles');
      if (document.getElementById("choices-state")) {
        var element = document.getElementById("choices-state");
        this.roleChoices = new Choices(element, {
          searchEnabled: false,
        });

        this.roleChoices.setChoices(this.rolesList, 'id', 'name')
      }

      //get user
      await this.$store.dispatch("users/getUser", this.userId);
      this.user = _.omit(this.$store.getters["users/getUser"], 'links');
      this.roleChoices.setChoiceByValue(this.user.roles[0].id);

    } catch (error) {
      showSwal.methods.showSwal({
        type: "error",
        message: "Oops, something went wrong!",
        width: 500
      });
    } finally {
      this.loading = false
      this.initialImageUrl = this.getImage;
    }


  },
  methods: {
    onFileChange(event) {
      this.file = event.target.files[0];
      this.user.profile_image = URL.createObjectURL(this.file);
    },
    onFileRemove() {
      this.file = null
      this.user.profile_image = this.initialImageUrl;
    },
    async handleEdit() {
      this.resetApiValidation();

      this.user.roles = [{
        id: this.roleChoices.getValue().value,
        type: 'roles'
      }]

      try {
        //upload the pic
        if (this.file !== null) {
          await this.$store.dispatch("users/uploadPic", this.file);
          this.file = null
        }

        this.user.profile_image = this.$store.getters['users/getImage'];

        await this.$store.dispatch("users/editUser", this.user);
        showSwal.methods.showSwal({
          type: "success",
          message: "User modified successfully!",
          width: 500
        });
        this.$router.push({ name: 'Users List' })
      } catch (error) {
        this.setApiValidation(error.response.data.errors);
        showSwal.methods.showSwal({
          type: "error",
          message: 'Oops, something went wrong!',
          width: 500
        });
      }
    },
  },
};
</script>
