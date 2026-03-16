<template>
    <div class="py-4 container-fluid">
      <div class="row">
        <div class="col-12">
          <div class="card">
            <!-- Card header -->
            <div class="pb-0 card-header">
              <div class="d-lg-flex">
                <div>
                  <h5 class="mb-0">Add Tag</h5>
                </div>
                <div class="my-auto mt-4 ms-auto mt-lg-0">
                  <div class="my-auto ms-auto">
                    <router-link :to="{ name: 'Tag Management' }" class="mb-0 btn bg-gradient-success btn-sm">Back to
                      list</router-link>
                  </div>
                </div>
              </div>
            </div>
            <hr>
            <form role="form" @submit.prevent="handleCreateTag()">
              <div class="card-body m-3">
                <label>Name</label>
                <argon-input id="tagName" v-model="newTag.name" type="text" class="mb-0" :value="newTag.name"></argon-input>
                <div class="mb-3">
                    <validation-error :errors="apiValidationErrors.name" />
                </div>
                <label>Color</label>
                <slider v-model="colors" class="w-100"
                ></slider>
                <validation-error :errors="apiValidationErrors.color" />
                <argon-button class="float-end mt-6 mb-3" color="dark" variant="gradient" size="sm"
                :disabled="loadingAdd">Add Tag
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
  import { Slider } from '@ckpack/vue-color';
  
  export default {
    name: "AddTagPage",
    components: {
      ArgonInput,
      ArgonButton,
      ValidationError,
      Slider
    },
    mixins: [formMixin, showSwal],
    data() {
      return {
        newTag: {
          type: 'tags',
          name: null,
          color: null
        },
        colors: {
            hex: '#2dce89'
        },
        options: {
          sort: "created_at",
          query: "",
          nr: "1",
          perpage: "5"
        },
        loadingAdd: false
      }
    },
    methods: {
      async handleCreateTag() {
        try {
            this.loadingAdd = true;
            this.resetApiValidation();
            this.newTag.color = this.colors.hex;
            await this.$store.dispatch("tag/addTag", this.newTag);
            await this.$store.dispatch("tag/tagsList", {
              ...(this.options.sort ? { sort: this.options.sort } : {}),
              filter: { 
                ...(this.options.query ? { name: this.options.query } : {}),
              },
              page: {
                number: this.options.nr,
                size: this.options.perpage,
              },
            });
            this.showSwal({
              type: "success",
              message: "Tag added successfully!"
            });
            await this.$router.push({ name: 'Tag Management' });
            this.loadingAdd = false;
        }
        catch (error) {
          this.loadingAdd = false;
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
  