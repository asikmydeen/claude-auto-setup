<template>
    <div class="py-4 container-fluid">
        <div class="mt-4 row">
            <div class="col-12">
                <div class="card">
                    <!-- Card header -->
                    <div class="card-header border-bottom">
                        <div class="row d-flex align-items-center">
                            <div class="col-6">
                                <h5 class="mb-0">Edit Category</h5>
                            </div>
                            <div class="col-6 text-end">
                                <material-button class="float-right btn btm-sm"
                                    @click="this.$router.push({ name: 'Categories List' })">
                                    Back to list
                                </material-button>
                            </div>
                        </div>
                    </div>
                    <!--Card body-->
                    <div class="card-body">
                        <form>
                            <div class="row">
                                <div class="col-10">

                                    <material-input id="name" v-model:value="category.name" label="Name" name="name"
                                        variant="static"></material-input>
                                    <validation-error :errors="apiValidationErrors.name"></validation-error>

                                </div>

                            </div>

                            <div class="row mt-4 mb-5 d-flex align-items-end">
                                
                                <div class="col-10">
                                <material-input id="description" v-model:value="category.description" label="Description"
                                        name="description" variant="static"></material-input>
                                    <validation-error :errors="apiValidationErrors.description"></validation-error>
                                </div>
                                <div class="col-2 text-end">
                                    <material-button class="float-right btn btm-sm" @click.prevent="handleEdit">Edit
                                        Category</material-button>
                                </div>
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
import ValidationError from "@/components/ValidationError.vue";
import formMixin from "@/mixins/formMixin.js";
import showSwal from "../../../mixins/showSwal";
import _ from "lodash"

export default {
    name: 'EditCategory',
    components: {
        MaterialButton,
        MaterialInput,
        ValidationError,
    },
    mixins: [formMixin],
    data() {
        return {
            category: {}
        }
    },
    async mounted() {
        try {
            await this.$store.dispatch("categories/getCategory", this.$route.params.id)
            this.category = _.omit(this.$store.getters['categories/getCategory'], 'links')
        } catch (error) {
            showSwal.methods.showSwal({
                type: "error",
                message: `Oops! Something went wrong!`,
                width: 500
            });
        }
    },
    methods: {
        async handleEdit() {
            this.resetApiValidation();
            try {
                await this.$store.dispatch("categories/editCategory", this.category);
                showSwal.methods.showSwal({
                    type: "success",
                    message: "Category modified successfully!",
                    width: 500
                });
                this.$router.push({ name: "Categories List" })
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
        }
    }
}
</script>