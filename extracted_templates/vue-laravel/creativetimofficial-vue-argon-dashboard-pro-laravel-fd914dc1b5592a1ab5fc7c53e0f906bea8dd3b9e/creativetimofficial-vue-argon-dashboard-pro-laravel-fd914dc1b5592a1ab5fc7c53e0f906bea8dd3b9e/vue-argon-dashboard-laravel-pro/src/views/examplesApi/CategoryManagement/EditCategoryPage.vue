<template>
    <div class="py-4 container-fluid">
        <div class="row">
            <div class="col-12">
                <div class="card">
                    <!-- Card header -->
                    <div class="pb-0 card-header">
                        <div class="d-lg-flex">
                            <div>
                                <h5 class="mb-0">Edit Category</h5>
                            </div>
                            <div class="my-auto mt-4 ms-auto mt-lg-0">
                                <div class="my-auto ms-auto">
                                    <router-link :to="{ name: 'Category Management' }"
                                        class="mb-0 btn bg-gradient-success btn-sm">Back to
                                        list</router-link>
                                </div>
                            </div>
                        </div>
                    </div>
                    <hr>
                    <form role="form" @submit.prevent="handleEditCategory()">
                        <div class="card-body m-3">
                            <label>Name</label>
                            <argon-input id="categoryName" v-model="categoryEdit.name" type="text" class="mb-0"
                                :value="categoryEdit.name"></argon-input>
                            <div class="mb-3">
                                <validation-error :errors="apiValidationErrors.name" />
                            </div>
                            <label>Description</label>
                            <argon-input id="categoryDescription" v-model="categoryEdit.description" type="text" class="mb-0"
                                :value="categoryEdit.description"></argon-input>
                            <validation-error :errors="apiValidationErrors.description" />
                            <argon-button class="float-end mt-6 mb-3" color="dark" variant="gradient" size="sm">Edit
                                Category
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

export default {
    name: "EditCategoryPage",
    components: {
        ArgonInput,
        ArgonButton,
        ValidationError
    },
    mixins: [formMixin, showSwal],
    data() {
        return {
            categoryEdit: {},
            options: {
                sort: "created_at",
                query: "",
                nr: "1",
                perpage: "5"
            }
        }
    },
    async mounted() {
        await this.$store.dispatch("category/getCategory", this.$route.params.id);
        this.categoryEdit = await this.$store.getters["category/oneCategory"];
    },
    methods: {
        async handleEditCategory() {
            try {
                this.resetApiValidation();
                await this.$store.dispatch("category/editCategory", this.categoryEdit);
                await this.$store.dispatch("category/categoryList", {
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
                    message: "Category updated successfully!"
                });
                await this.$router.push({ name: 'Category Management' });
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
