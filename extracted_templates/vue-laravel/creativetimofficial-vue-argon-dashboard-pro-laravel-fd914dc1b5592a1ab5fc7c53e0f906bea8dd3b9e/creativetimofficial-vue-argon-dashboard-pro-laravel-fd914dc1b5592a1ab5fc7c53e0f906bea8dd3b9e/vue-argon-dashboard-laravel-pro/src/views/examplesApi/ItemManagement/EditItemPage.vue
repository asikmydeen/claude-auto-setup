<template>
    <div class="py-4 container-fluid">
        <div class="row">
            <div class="col-12">
                <div class="card">
                    <!-- Card header -->
                    <div class="pb-0 card-header">
                        <div class="d-lg-flex">
                            <div>
                                <h5 class="mb-0">Edit Item</h5>
                            </div>
                            <div class="my-auto mt-4 ms-auto mt-lg-0">
                                <div class="my-auto ms-auto">
                                    <router-link :to="{ name: 'Item Management' }"
                                        class="mb-0 btn bg-gradient-success btn-sm">Back to
                                        list</router-link>
                                </div>
                            </div>
                        </div>
                    </div>
                    <hr>
                    <form role="form" @submit.prevent="handleEditItem()">
                        <div class="card-body m-3">
                            <label>Picture</label>
                            <div class="d-flex">
                                <div class="col-lg-12 d-flex flex-column">
                                    <div class="d-flex col-lg-4 width-image-preview justify-content-center">
                                        <img width="175" height="175" :src="previewImage()" class="shadow-lg border-radius-md mb-3 profile-image"
                                            alt="Image" />
                                    </div>
                                    <div class="col-lg-8 d-flex width-image-preview justify-content-center"
                                        :class="{ 'justify-content-between': image }">
                                        <label for="imageUpload"
                                            class="mb-0 btn bg-gradient-success buttons-image-item"
                                            :class="{'buttons-action-image': image}"
                                            >Select Image</label>
                                        <input id="imageUpload" type="file" class="d-none"
                                            accept="image/png, image/jpg, image/jpeg" @input="onFileChange" />
                                        <argon-button v-if="image" type="button"
                                            class="mb-0 alert-danger buttons-image-item buttons-action-image"
                                            @click="removeImage">
                                            Delete Image
                                        </argon-button>
                                    </div>
                                    <validation-error :errors="apiValidationErrors.attachment" />
                                </div>
                            </div>
                            <label class="mt-3">Name</label>
                            <argon-input id="name" v-model="itemEdit.name" type="text" placeholder="Item Name" class="mb-0"
                                :value="itemEdit.name"></argon-input>
                            <div class="mb-3">
                                <validation-error :errors="apiValidationErrors.name" />
                            </div>
                            <div class="mt-3">
                                <label>Description</label>
                                <quillEditor id="item-description" v-model:value="itemEdit.description" class="description-item-block">
                                </quillEditor>
                                <validation-error :errors="apiValidationErrors.description" />
                            </div>
                            <label class="mt-4">Category</label>
                            <select id="choices-category-edit" v-model="itemEdit.category.id" class="form-control"
                                name="choices-category">
                                <option v-for="category in categoryList" :key="category.id" :value="category.id"
                                    :label="category.name">
                                    {{  category.name  }}
                                </option>
                            </select>
                            <label>Tags</label>
                            <select id="choices-tags-edit" v-model="tags" class="form-control" name="choices-tags"
                                multiple>
                                <option v-for="tag in tagList" :key="tag.id" :value="tag.id" :label="tag.name">
                                    {{  tag.name  }}
                                </option>
                            </select>
                            <label>Status</label>
                            <argon-radio id="radio-status-one" v-model="itemEdit.status" name="radio-status" value="published" :checked="itemEdit.status == 'published' ? true : false">Published</argon-radio>
                            <argon-radio id="radio-status-two" v-model="itemEdit.status" name="radio-status" value="draft" :checked="itemEdit.status == 'draft' ? true : false">Draft</argon-radio>
                            <argon-radio id="radio-status-three" v-model="itemEdit.status" name="radio-status" value="archive" :checked="itemEdit.status == 'archive' ? true : false">Archive</argon-radio>
                            <label>Show on homepage?</label>
                            <argon-switch id="switch-show" v-model="itemEdit.is_on_homepage"
                                :checked="itemEdit.is_on_homepage" name="Show on homepage?" />
                            <label class="mt-4">Date</label>
                            <flat-pickr ref="datepick" v-model="itemEdit.date_at" class="form-control"
                                placeholder="Please select date" :config="config"></flat-pickr>
                            <validation-error :errors="apiValidationErrors.date_at" />

                            <argon-button class="float-end mt-6 mb-3" color="dark" variant="gradient" size="sm">Edit Item
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
  import Choices from "choices.js";
  import placeholder from "../../../assets/img/placeholder.jpg";
  import ArgonSwitch from "@/components/ArgonSwitch.vue";
  import flatPickr from "vue-flatpickr-component";
  import { quillEditor } from 'vue3-quill'
  import formMixin from "../../../mixins/form-mixin.js"
  import ValidationError from "../../../components/ValidationError.vue";
  import showSwal from "../../../mixins/showSwal.js";
  import ArgonButton from "../../../components/ArgonButton.vue";
  import ArgonRadio from '../../../components/ArgonRadio.vue';
  
  export default {
      name: "EditItemPage",
      components: {
          ArgonSwitch,
          flatPickr,
          quillEditor,
          ValidationError,
          ArgonButton,
          ArgonInput,
          ArgonRadio
      },
      mixins: [formMixin, showSwal],
      data() {
          return {
              image: '',
              file: '',
              itemInfo: '',
              tags: [],
              itemEdit: {
                  category: { id: '' }
              },
              config: {
                  allowInput: true,
              },
              options: {
                sort: "created_at",
                query: "",
                nr: "1",
                perpage: "5"
            }
          }
      },
      computed: {
          categoryList() {
              return this.$store.getters["category/categoryList"]?.data;
          },
          tagList() {
              return this.$store.getters["tag/tagsList"]?.data;
          }
      },
      async mounted() {
            await this.$store.dispatch("item/getItem", this.$route.params.id);
            this.itemEdit = await this.$store.getters["item/oneItem"];
            this.itemEdit.tags.forEach(tag => this.tags.push(tag.id));
  
            await this.$store.dispatch("category/categoryList");
            await this.$store.dispatch("tag/tagsList");

  
          this.getChoices("choices-tags-edit", true, this.tags);
          this.getChoices("choices-category-edit", false, this.itemEdit.category.id);
  
      },
      methods: {
          async handleEditItem() {
              try {
                    this.resetApiValidation();
                    this.itemEdit.tags = [];
                    this.tags.forEach(tag => this.itemEdit.tags.push({ id: tag, type: 'tags' }));
                    this.itemEdit.excerpt = this.itemEdit.description ? this.itemEdit.description : this.itemEdit.name;
                    if (this.image) {
                        await this.handlePostImage();
                    }
                    await this.$store.dispatch("item/editItem", this.itemEdit);
                    this.showSwal({
                        type: "success",
                        message: "Item updated successfully!"
                    });
                    await this.$store.dispatch("item/itemsList", {
                        ...(this.options.sort ? { sort: this.options.sort } : {}),
                        filter: { 
                          ...(this.options.query ? { name: this.options.query } : {}),
                        },
                        page: {
                          number: this.options.nr,
                          size: this.options.perpage,
                        },
                    });
                    await this.$router.push({ name: 'Item Management' });
              }
              catch (error) {
                  this.setApiValidation(error.response.data.errors);
                  this.showSwal({
                      type: "error",
                      message: "Oops, something went wrong!"
                  });
              }
          },
  
          async handlePostImage() {
              try {
                  await this.$store.dispatch("item/uploadImageItem", { image: this.file, id: this.itemEdit.id });
                  this.itemEdit.image = await this.$store.getters["item/image"];
              }
              catch (error) {
                  this.setApiValidation(error.response.data.errors);
                  this.showSwal({
                      type: "error",
                      message: "Oops, something went wrong!"
                  });
              }
          },
  
          getChoices(id, removeButton, selectedChoice) {
              if (document.getElementById(id)) {
                  var element = document.getElementById(id);
                  var selected = new Choices(element, {
                      searchEnabled: false,
                      removeItemButton: removeButton
                  });
                  selected.setChoiceByValue(selectedChoice);
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

         trythis(me) {
            console.log(me)
         }
      },
  };
  </script>