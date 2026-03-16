<template>
    <div class="py-4 container-fluid">
        <div class="mt-4 row">
            <div class="col-12">
                <div class="card">
                    <!-- Card header -->
                    <div class="card-header border-bottom">
                        <div class="row d-flex align-items-center">
                            <div class="col-6">
                                <h5 class="mb-0">Edit Item</h5>
                            </div>
                            <div class="col-6 text-end">
                                <material-button class="float-right btn btm-sm"
                                    @click="this.$router.push({ name: 'Items List' })">
                                    Back to list
                                </material-button>
                            </div>
                        </div>
                    </div>
                    <!--Card body-->
                    <div class="card-body">
                        <form>
                            <div class="mt-4 overflow-hidden">
                                <div>
                                    <material-avatar :img="getImage" shadow="regular" class="img-fluid w-15 mt-7"
                                        :fixedSize="true">
                                    </material-avatar>
                                </div>
                                <div class="mt-1 mb-2">
                                    <material-button v-show="!file" size="sm" type="button">
                                        <label for="imageInput" class="mb-0 text-white small cursor-pointer">Select
                                            Image</label>
                                        <input id="imageInput" @change.prevent="onFileChange" type="file"
                                            style="display: none;">
                                    </material-button>
                                </div>
                                <div v-show="file">
                                    <material-button class="mx-2" @click.prevent="onFileRemove" size="sm" type="button"
                                        color="danger">
                                        <label class="mb-0 text-white small cursor-pointer"> &#10005; Remove</label>
                                    </material-button>
                                    <material-button size="sm" type="button">
                                        <label for="imageInput" class="mb-0 text-white small cursor-pointer">Change</label>
                                        <input id="imageInput" @change.prevent="onFileChange" type="file"
                                            style="display: none;" accept="image/*">
                                    </material-button>
                                </div>
                            </div>

                            <div class="mt-5">
                                <material-input id="name" label="Name" v-model:value="item.name" name="name"
                                    variant="static" />
                                <validation-error :errors="apiValidationErrors.name" />
                            </div>

                            <div class="mt-5">
                                <label class="ms-0"> Description </label>
                                <material-textarea id="description" v-model:value="item.description" name="description" />
                                <validation-error :errors="apiValidationErrors.description" />
                            </div>

                            <!--selectedCategory-->
                            <div class="mt-5">
                                <label class="ms-0"> Category </label>
                                <select id="choices-categories" class="multisteps-form__select form-control"
                                    name="choices-categories">
                                </select>
                                <validation-error :errors="apiValidationErrors.category" />
                            </div>

                            <!--selectedTag-->
                            <div class=" mt-5">
                                <label class="ms-0"> Tags </label>
                                <select multiple id="choices-tags" class="multisteps-form__select form-control"
                                    name="choices-tags">
                                </select>
                                <validation-error :errors="apiValidationErrors.tags" />
                            </div>

                            <!--selectedStatus-->
                            <div class="mt-5">
                                <label class="ms-0"> Status </label>

                                <div class="form-check ps-0">
                                    <input class="form-check-input" type="radio" name="radio" id="published"
                                        value="published" v-model="item.status">
                                    <label class="form-check-label" for="published">Published</label>
                                </div>
                                <div class="form-check ps-0">
                                    <input class="form-check-input" type="radio" name="radio" id="draft" value="draft"
                                        v-model="item.status">
                                    <label class="form-check-label" for="draft">Draft</label>
                                </div>
                                <div class="form-check ps-0">
                                    <input class="form-check-input" type="radio" name="radio" id="archive" value="archive"
                                        v-model="item.status">
                                    <label class="form-check-label" for="archive">Archive</label>
                                </div>
                                <validation-error :errors="apiValidationErrors.status" />
                            </div>

                            <!--showOnHomepage-->
                            <div class="mt-5">
                                <label class="ms-0"> Show on homepage? </label>
                                <div class="form-check form-switch mb-4">
                                    <input class="form-check-input" type="checkbox" id="isOnHomepage"
                                        v-model="item.is_on_homepage">
                                </div>
                                <validation-error :errors="apiValidationErrors.is_on_homepage" />
                            </div>


                            <!--date-->
                            <div class="mt-5">
                                <label class="ms-0"> Date </label>
                                <flatPickr v-model="item.date_at" class="form-control" placeholder="Select date">
                                </flatPickr>
                                <validation-error :errors="apiValidationErrors.date_at" />
                            </div>

                            <div class="button-row d-flex mt-4">
                                <material-button type="button" color="dark" variant="gradient"
                                    class="ms-auto mb-0 js-btn-next" @click="handleEdit">Edit Item</material-button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import MaterialButton from "@/components/MaterialButton.vue";
import MaterialInput from "@/components/MaterialInput.vue";
import MaterialAvatar from "@/components/MaterialAvatar.vue";
import MaterialTextarea from "@/components/MaterialTextarea.vue";
import ValidationError from "@/components/ValidationError.vue";
import Choices from "choices.js";
import flatPickr from 'vue-flatpickr-component';
import 'flatpickr/dist/flatpickr.css';

import formMixin from "@/mixins/formMixin.js";
import showSwal from "../../../mixins/showSwal";
import _ from "lodash"

export default {
    name: 'EditItem',
    components: {
        MaterialButton,
        MaterialInput,
        MaterialAvatar,
        MaterialTextarea,
        ValidationError,
        flatPickr
    },
    data() {
        return {
            item: {
                category: null,
                tags: [],
            },
            file: '',
            categoriesChoices: null,
            tagsChoices: null,
            loading: null,
            initialImageUrl: ""
        }
    },

    mixins: [formMixin],
    computed: {
        categoriesList() {
            return this.$store.getters['categories/getCategoriesData'];

        },
        tagsList() {
            return this.$store.getters['tags/getTagsData']
        },
        getImage() {
            if (!this.item.image || this.loading) return require("@/assets/img/placeholder.jpg")
            else { return this.item.image }
        }
    },
    async mounted() {
        this.loading = true;

        try {
            //get item
            await this.$store.dispatch("items/getItem", this.$route.params.id);
            this.item = _.omit(this.$store.getters['items/getItem'], 'links')

            //get categories
            await this.$store.dispatch('categories/getCategories');
            this.categoriesChoices = this.getChoices('choices-categories', false)
            this.categoriesChoices.setChoices(this.categoriesList, 'id', 'name')
            this.categoriesChoices.setChoiceByValue(this.item.category.id)

            //get tags
            await this.$store.dispatch('tags/getTags');
            this.tagsChoices = this.getChoices('choices-tags', true)
            this.tagsChoices.setChoices(this.tagsList, 'id', 'name')
            this.item.tags.forEach(tag => {
                this.tagsChoices.setChoiceByValue(tag.id)
            })
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
            this.item.image = URL.createObjectURL(this.file);
        },
        onFileRemove() {
            this.file = null
            this.item.image = this.initialImageUrl;
        },
        async handleEdit() {
            this.resetApiValidation();

            this.item.category = {
                id: this.categoriesChoices.getValue().value,
                type: 'categories'
            }

            this.item.tags = []
            this.tagsChoices.getValue().forEach(tag => {
                this.item.tags.push({
                    id: tag.value,
                    type: 'tags'
                })
            })


            try {
                //upload the pic
                if (this.file !== null) {
                    await this.$store.dispatch("items/uploadPic", this.file)
                    this.item.image = this.$store.getters["items/getImage"];
                    this.file !== null
                }

                this.item.id = this.$store.getters["items/getId"]
                await this.$store.dispatch("items/editItem", this.item);
                showSwal.methods.showSwal({
                    type: "success",
                    message: "Item modified successfully!",
                    width: 500
                });
                this.$router.push({ name: "Items List" })
            } catch (error) {
                if (error.response.data.errors) {
                    this.setApiValidation(error.response.data.errors);
                }
                showSwal.methods.showSwal({
                    type: "error",
                    message: "Oops, something went wrong!",
                    width: 500
                });

            }
        },
        getChoices(id, removeButton) {
            if (document.getElementById(id)) {
                var element = document.getElementById(id);
                return new Choices(element, {
                    searchEnabled: false,
                    removeItemButton: removeButton,
                });
            }
        }
    }
}

</script>