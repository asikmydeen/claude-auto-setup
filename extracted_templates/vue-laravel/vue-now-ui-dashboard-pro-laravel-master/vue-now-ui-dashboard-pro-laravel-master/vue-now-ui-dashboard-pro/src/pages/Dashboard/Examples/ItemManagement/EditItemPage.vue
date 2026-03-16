<template>
  <div class="row">
    <div class="col-xl-12 order-xl-1">
      <card>
        <div slot="header" class="row align-items-center">
          <h4 class="card-title col-8">Edit Item</h4>
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
              <div v-if="image" class="profile-image card-img pb-4">
                <img :src="`${image}`" class="profile-image now-ui-image" />
              </div>
              <div v-else class="profile-image">
                <img src="/img/placeholder.jpg" class="now-ui-image" />
              </div>
              <div class="image-upload mb-3">
                <n-button
                  v-if="image"
                  type="button"
                  class="btn btn-sm btn-danger"
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
              v-model="item.name"
              name="name"
              addon-left-icon="now-ui-icons users_circle-08"
              :error="apiValidationErrors.name"
            />

            <div class="md-layout spacing">
              <label class="md-layout-item md-size-25 md-form-label">
                Description
              </label>
              <div class="md-layout-item">
                <ckeditor
                  :editor="editor"
                  v-model="item.description"
                  :config="editorConfig"
                />
              </div>
            </div>
            <validation-error :error="apiValidationErrors.excerpt" />

            <label style="display: flex">Category</label>
            <el-select
              name="category"
              v-model="item.category.id"
              prepend-icon="fas fa-user"
              placeholder="Select..."
              style="display: flex"
            >
              <el-option
                v-for="single_category in all_categories"
                :key="single_category.id"
                :value="single_category.id"
                :label="single_category.name"
              >
              </el-option>
            </el-select>

            <label>Tags</label>
            <el-select
              v-model="tags"
              multiple
              placeholder="Select..."
              style="display: flex"
            >
              <el-option
                v-for="single_tag in all_tags"
                :key="single_tag.id"
                :value="single_tag.id"
                :label="single_tag.name"
              >
              </el-option>
            </el-select>

            <fg-input label="Status" class="mt-2">
              <radio label="published" v-model="item.status" class="mb-3">
                Published
              </radio>
              <radio label="draft" v-model="item.status" class="mb-3">
                Draft
              </radio>
              <radio label="archive" v-model="item.status" class="mb-3">
                Archive
              </radio>
            </fg-input>

            <label style="display: flex">Show on homepage?</label>
            <n-switch class="mt-2" v-model="item.is_on_homepage"></n-switch>

            <fg-input
              label="Date"
              class="mt-2"
              :error="apiValidationErrors.date_at"
            >
              <el-date-picker
                type="date"
                placeholder="Date Picker"
                v-model="item.date_at"
              >
              </el-date-picker
            ></fg-input>

            <div class="my-4">
              <n-button
                type="button"
                class="btn btn-sm btn-primary"
                native-type="submit"
              >
                Update Item
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
import { Select, Option, DatePicker } from "element-ui";
import { FormGroupInput as FgInput, Radio, Switch } from "src/components/index";
import { cloneDeep } from "lodash";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import CKEditor from "@ckeditor/ckeditor5-vue2";
import moment from "moment";

export default {
  components: {
    FgInput,
    Radio,
    [Switch.name]: Switch,
    [Option.name]: Option,
    [Select.name]: Select,
    [DatePicker.name]: DatePicker,
    ckeditor: CKEditor.component,
    ValidationError,
  },
  layout: "DashboardLayout",

  mixins: [formMixin],

  data() {
    return {
      editor: ClassicEditor,
      editorConfig: {
        toolbar: [
          "heading",
          "|",
          "bold",
          "italic",
          "link",
          "bulletedList",
          "numberedList",
          "blockQuote",
          "Outdent",
          "Indent",
          "TextColor",
          "BGColor",
        ],
      },
      image: "",
      all_categories: [],
      all_tags: [],
      tags: [],
      item: {
        type: "items",
        name: "",
        description: "",
        excerpt: "",
        status: "published",
        is_on_homepage: false,
        date_at: new Date(),
        image: null,
        category: {
          type: "categories",
          id: null,
        },
        tags: [],
        relationshipNames: ["category", "tags"],
        user: null,
        old_date: "",
      },
    };
  },

  created() {
    this.get();
    this.getCategories();
    this.getTags();
  },

  methods: {
    async get() {
      try {
        const id = this.$route.params.id;
        await this.$store.dispatch("items/get", id);
        this.item = this.$store.getters["items/item"];

        this.item.tags.forEach((tag) => {
          this.tags.push(tag.id);
        });
        this.old_date = this.item.date_at;
      } catch (error) {
        await this.$store.dispatch(
          "alerts/error",
          "Oops, something went wrong!"
        );
        this.setApiValidation(error.response.data.errors);
      }
    },
    async getCategories() {
      try {
        await this.$store.dispatch("categories/list");
        this.all_categories = await this.$store.getters["categories/dropdown"];
      } catch (error) {
        await this.$store.dispatch(
          "alerts/error",
          "Oops, something went wrong!"
        );
        this.setApiValidation(error.response.data.errors);
      }
    },

    async getTags() {
      try {
        await this.$store.dispatch("tags/list");
        this.all_tags = await this.$store.getters["tags/dropdown"];
      } catch (error) {
        await this.$store.dispatch(
          "alerts/error",
          "Oops, something went wrong!"
        );
        this.setApiValidation(error.response.data.errors);
      }
    },

    async handleSubmit() {
      if (this.$isDemo == 1 && ["1", "2"].includes(this.$route.params.id)) {
        await this.$store.dispatch(
          "alerts/error",
          "You are not allowed to change data of default items."
        );
        return;
      }
      try {
        this.resetApiValidation();
        await this.$store.dispatch("profile/me");
        this.user = await { ...this.$store.getters["profile/me"] };
        if (this.user.roles[0].name === "member") {
          await this.$store.dispatch(
            "alerts/error",
            "Oops, you are not authorized to do this action."
          );
          return;
        }

        if (this.file) {
          await this.$store.dispatch("items/upload", {
            item: this.item,
            image: this.file,
          });
          this.item.image = await this.$store.getters["items/url"];
        }
        this.item.excerpt = this.item.description;
        this.item.date_at = moment(this.item.date_at).format("YYYY-MM-DD");
        this.item.tags = [];

        this.tags.forEach((tag) => {
          this.item.tags.push({
            id: tag,
            type: "tags",
          });
        });
        await this.$store.dispatch("items/update", this.item);

        await this.$store.dispatch(
          "alerts/success",
          "Item updated successfully."
        );
        this.goBack();
      } catch (error) {
        await this.$store.dispatch(
          "alerts/error",
          "Oops, something went wrong!"
        );

        this.setApiValidation(error.response.data.errors);
        this.item.date_at = this.old_date;
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

    removeImage() {
      this.image = null;
    },

    goBack() {
      this.$router.push({ name: "List Items" });
    },
  },
};
</script>
<style>
.ck-editor__editable {
  min-height: 200px;
  width: auto;
  margin-bottom: 25px;
}
</style>

