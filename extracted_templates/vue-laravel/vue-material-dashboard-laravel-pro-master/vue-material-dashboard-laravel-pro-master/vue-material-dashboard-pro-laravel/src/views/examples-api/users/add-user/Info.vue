<template>
  <div class="multisteps-form__panel border-radius-xl bg-white" data-animation="FadeIn">

    <div class="text-end">
      <material-button class="float-right btn btm-sm" @click.prevent="this.$router.push({ name: 'Users List' })">
        Back to list
      </material-button>
    </div>

    <div class="row mt-4 overflow-hidden">
      <div>
        <material-avatar :img="getImage" shadow="regular" class="image-fluid w-20 mt-7" :fixedSize="true">
        </material-avatar>
      </div>
      <div class="mt-1  mb-2">
        <material-button v-show="!file" size="sm" type="button">
          <label for="imageInput" class="mb-0 text-white small cursor-pointer">Select Image</label>
          <input id="imageInput" @change.prevent="onFileChange" type="file" style="display: none;" accept="image/*">
        </material-button>

        <div v-show="file">
          <material-button class="mx-2" @click.prevent="onFileRemove" size="sm" type="button" color="danger">
            <label class="mb-0 text-white small cursor-pointer"> &#10005; Remove</label>
          </material-button>
          <material-button size="sm" type="button">
            <label for="imageInput" class="mb-0 text-white small cursor-pointer">Change</label>
            <input id="imageInput" @change.prevent="onFileChange" type="file" style="display: none;" accept="image/*">
          </material-button>
        </div>
      </div>
    </div>

    <div class="row mt-5">

      <material-input id="name" label="Name" variant="static" v-model:value="user.name" name="name" />
      <validation-error :errors="apiValidationErrors.name" />

    </div>

    <div class="row mt-5">
      <material-input id="email" type="email" label="Email Address" variant="static" v-model:value="user.email"
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
      <material-input id="confirmPassword" variant="static" v-model:value="user.password_confirmation" type="password"
        label="Confirm Password" name="confirmPassword" />
    </div>

    <div class="button-row d-flex mt-4">
      <material-button type="button" color="dark" variant="gradient" class="ms-auto mb-0 js-btn-next"
        @click="handleAdd">Add User</material-button>
    </div>
  </div>
</template>

<script>
import MaterialInput from "@/components/MaterialInput.vue";
import MaterialButton from "@/components/MaterialButton.vue";
import MaterialAvatar from "@/components/MaterialAvatar.vue";
import ValidationError from "@/components/ValidationError.vue";
import Choices from "choices.js";
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
  data() {
    return {
      user: {},
      file: null,
      roleChoices: null,
      loading: null,
    }
  },
  mixins: [formMixin],
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
    this.loading = true

    try {
      //get roles
      await this.$store.dispatch('roles/getRoles');

      if (document.getElementById("choices-state")) {
        var element = document.getElementById("choices-state");
        this.roleChoices = new Choices(element, {
          searchEnabled: false,
        });

        this.roleChoices.setChoices(this.rolesList, 'id', 'name')
        this.roleChoices.setChoiceByValue(this.rolesList[0].id)
      }
    } catch (error) {
      showSwal.methods.showSwal({
        type: "error",
        message: "Oops, something went wrong!",
        width: 500
      });
    } finally {
      this.loading = false
    }
  },
  methods: {
    onFileChange(event) {
      this.file = event.target.files[0];
      this.user.profile_image = URL.createObjectURL(this.file);
    },
    onFileRemove() {
      this.file = null
      this.user.profile_image = null;
    },

    async handleAdd() {
      this.resetApiValidation();

      this.user.roles = [{
        id: this.roleChoices.getValue().value,
        type: 'roles'
      }]

      try {
        //add user
        await this.$store.dispatch("users/addUser", _.omit(this.user, 'profile_image'));

        //upload the pic
        if (this.file !== null) {
          await this.$store.dispatch("users/uploadPic", this.file);
          this.file = null
        }

        this.user = _.omit(this.$store.getters['users/getUser'], 'links');

        //update user with pic
        await this.$store.dispatch('users/editUser', this.user)
        showSwal.methods.showSwal({
          type: "success",
          message: "User added successfully!",
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
    customLabel({ id, name }) {
      return `${id} – ${name}`
    }
  },
};
</script>
