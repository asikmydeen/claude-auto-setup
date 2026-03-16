<template>
    <div class="py-4 container-fluid">
      <div class="row">
        <div class="col-12">
          <div class="card">
            <!-- Card header -->
            <div class="pb-0 card-header">
              <div class="d-lg-flex">
                <div>
                  <h5 class="mb-0">Edit Tag</h5>
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
            <form role="form" @submit.prevent="handleEditTag()">
              <div class="card-body m-3">
                <label>Name</label>
                <argon-input id="tagName" v-model="tagEdit.name" type="text" class="mb-0" :value="tagEdit.name"></argon-input>
                <div class="mb-3">
                    <validation-error :errors="apiValidationErrors.name" />
                </div>
                <label>Color</label>
                <slider v-model="colors" class="w-100"
                ></slider>
                <validation-error :errors="apiValidationErrors.color" />
                <argon-button class="float-end mt-6 mb-3" color="dark" variant="gradient" size="sm">Edit Tag
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
    name: "EditTagPage",
    components: {
      ArgonInput,
      ArgonButton,
      ValidationError,
      Slider
    },
    mixins: [formMixin, showSwal],
    data() {
      return {
        tagEdit: {},
        colors: '',
        options: {
          sort: "created_at",
          query: "",
          nr: "1",
          perpage: "5"
        }
      }
    },
    async mounted() {
        await this.$store.dispatch("tag/getTag", this.$route.params.id);
        this.tagEdit = await this.$store.getters["tag/oneTag"];
        this.colors = this.tagEdit.color;
    },
    methods: {
      async handleEditTag() {
        try {
            this.resetApiValidation();
            this.tagEdit.color = this.colors.hex;
            await this.$store.dispatch("tag/editTag", this.tagEdit);
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
              message: "Tag updated successfully!"
            });
            await this.$router.push({ name: 'Tag Management' });
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
  