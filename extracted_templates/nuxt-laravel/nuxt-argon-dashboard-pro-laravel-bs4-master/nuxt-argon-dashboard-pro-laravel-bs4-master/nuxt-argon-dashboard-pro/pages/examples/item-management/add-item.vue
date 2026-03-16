<template>
  <div class="container-fluid mt-5">
    <div class="row">
      <div class="col-xl-12 order-xl-1">
        <card>
          <div slot="header" class="row align-items-center">
            <div class="col-8">
              <h3 class="mb-0">Add Item</h3>
            </div>
            <div class="col-4 text-right">
              <base-button
                @click="goBack"
                type="button"
                class="btn btn-sm btn-primary"
                >Back to list</base-button
              >
            </div>
          </div>
          <div class="card-body">
            <form ref="profile_form" @submit.prevent="handleSubmit">
              <div class="form-group">
                <label class="form-control-label"> Picture </label>
                <div v-if="file" class="profile-image card-img pb-4">
                  <img :src="`${image}`" class="profile-image argon-image" />
                </div>
                <div v-else class="profile-image">
                  <img src="/img/placeholder.jpg" class="argon-image" />
                </div>
                <div class="image-upload">
                  <base-button
                    v-if="file"
                    type="button"
                    class="btn btn-sm btn-danger"
                    @click="removeImage"
                  >
                    <span>
                      <i class="fa fa-times" />
                      Remove
                    </span>
                  </base-button>
                  <base-button type="button" class="btn btn-sm btn-primary">
                    <label v-if="!file" for="imageInput" class="mb-0"
                      >Select image</label
                    >
                    <label v-else for="imageInput" class="mb-0">Change</label>
                    <input
                      id="imageInput"
                      ref="imageInput"
                      accept="image/*"
                      type="file"
                      style="display: none"
                      @change="onSelectFile"
                    />
                  </base-button>
                </div>
              </div>
              <validation-error :errors="apiValidationErrors.attachment" />

              <base-input
                label="Name"
                prepend-icon="fas fa-user"
                v-model="item.name"
              />
              <validation-error :errors="apiValidationErrors.name" />

              <base-input label="Description">
                <html-editor v-model="item.description" name="editor" />
              </base-input>
              <validation-error :errors="apiValidationErrors.excerpt" />

              <base-input label="Category">
                <el-select
                  name="category"
                  v-model="item.category.id"
                  prepend-icon="fas fa-user"
                >
                  <el-option
                    v-for="single_category in all_categories"
                    :key="single_category.id"
                    :value="single_category.id"
                    :label="single_category.name"
                  >
                  </el-option>
                </el-select>
              </base-input>

              <base-input label="Tags">
                <el-select v-model="tags" multiple placeholder="Select...">
                  <el-option
                    v-for="single_tag in all_tags"
                    :key="single_tag.id"
                    :value="single_tag.id"
                    :label="single_tag.name"
                  >
                  </el-option>
                </el-select>
              </base-input>

              <base-input label="Status">
                <base-radio v-model="item.status" name="published" class="mb-3">
                  Published
                </base-radio>
                <base-radio v-model="item.status" name="draft" class="mb-3">
                  Draft
                </base-radio>
                <base-radio v-model="item.status" name="archive" class="mb-3">
                  Archive
                </base-radio>
              </base-input>

              <base-input label="Show on homepage?">
                <base-switch
                  class="mr-1"
                  v-model="item.is_on_homepage"
                ></base-switch>
              </base-input>

              <base-input label="Date">
                <flat-picker
                  slot-scope="{ focus, blur }"
                  @on-open="focus"
                  @on-close="blur"
                  :config="{ allowInput: true }"
                  class="form-control datepicker"
                  v-model="item.date_at"
                >
                </flat-picker>
              </base-input>
              <validation-error :errors="apiValidationErrors.date_at" />

              <div class="my-4">
                <base-button
                  type="button"
                  class="btn btn-sm btn-primary"
                  native-type="submit"
                >
                  Add Item
                </base-button>
              </div>
            </form>
          </div>
        </card>
      </div>
    </div>
  </div>
</template>
<script>
import BaseInput from "~/components/argon-core/Inputs/BaseInput.vue";
import BaseButton from "~/components/argon-core/BaseButton.vue";
import formMixin from "@/mixins/form-mixin";
import ValidationError from "~/components/ValidationError.vue";
import { Select, Option } from "element-ui";
import { cloneDeep } from "lodash";
import HtmlEditor from "@/components/argon-core/Inputs/HtmlEditor";
import flatPicker from "vue-flatpickr-component";
import "flatpickr/dist/flatpickr.css";
import moment from "moment";

export default {
  layout: "DashboardLayout",

  components: {
    HtmlEditor,
    BaseInput,
    BaseButton,
    flatPicker,
    ValidationError,
    [Select.name]: Select,
    [Option.name]: Option,
  },

  mixins: [formMixin],

  data() {
    return {
      file: null,
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
      },
    };
  },

  async fetch() {
    try {
      await this.$store.dispatch("categories/list");
      this.all_categories = await this.$store.getters["categories/dropdown"];
      if (this.all_categories && this.all_categories.length) {
        this.item.category.id = this.all_categories[0].id;
      }

      await this.$store.dispatch("tags/list");
      this.all_tags = await this.$store.getters["tags/dropdown"];

      if (this.all_tags && this.all_tags.length) {
        this.tags.push(this.all_tags[0].id);
        this.item.tags = [];

        this.tags.forEach((tag) => {
          this.item.tags.push({
            id: tag,
            type: "tags",
          });
        });
      }
    } catch (error) {
      this.$notify({
        type: "danger",
        message: `Oops, something went wrong!`,
      });
      this.setApiValidation(error.response.data.errors);
    }
    await this.$store.dispatch("profile/me");
  },
  computed: {
    roles() {
      let roles = this.$store.getters["profile/me"].roles;

      return roles.map((r) => r.name);
    },
  },

  methods: {
    goBack() {
      this.$router.push({ name: "examples-item-management" });
    },

    removeImage() {
      this.file = null;
    },

    async handleSubmit() {
      this.item.excerpt = this.item.description;
      this.item.date_at = moment(this.item.date_at).format("YYYY-MM-DD");
      this.item.tags = [];
      this.tags.forEach((tag) => {
        this.item.tags.push({
          id: tag,
          type: "tags",
        });
      });
      if (this.roles.includes("member")) {
        this.$notify({
          type: "danger",
          message: "Oops, you are not authorized to do this action!",
        });
        return;
      }
      try {
        delete this.item.id;
        await this.$store.dispatch("items/add", this.item);
        this.item = await { ...this.$store.getters["items/item"] };

        if (this.file) {
          await this.$store.dispatch("items/upload", {
            item: this.item,
            image: this.file,
            axios: this.$axios,
          });
          this.item.image = await this.$store.getters["items/url"];

          await this.$store.dispatch("items/update", this.item);
          this.item = await this.$store.getters["items/item"];
        }
        this.$notify({
          type: "success",
          message: "Item added successfully.",
        });
        this.goBack();
      } catch (error) {
        this.$notify({
          type: "danger",
          message: "Oops, something went wrong!",
        });
        this.setApiValidation(error.response.data.errors);
        if (this.item.id) {
          await this.$store.dispatch("items/destroy", this.item.id);
        }

        this.item.date_at = new Date();
      }
    },

    async onSelectFile(e) {
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
  },
};
</script>
