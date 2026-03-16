<template>
    <div class="py-4 container-fluid">
        <div class="mt-4 row">
            <div class="col-12">
                <div class="card">
                    <!-- Card header -->
                    <div class="card-header border-bottom">
                        <div class="row d-flex align-items-center">
                            <div class="col-6">
                                <h5 class="mb-0">Add Tag</h5>
                            </div>
                            <div class="col-6 text-end">
                                <material-button class="float-right btn btm-sm"
                                    @click="this.$router.push({ name: 'Tags List' })">
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

                                    <material-input id="name" v-model:value="tag.name" label="Name"
                                        name="name" variant="static"></material-input>
                                    <validation-error :errors="apiValidationErrors.name"></validation-error>

                                </div>
                                
                            </div>

                            <div class="row mt-5 mb-5 d-flex align-items-center">
                                
                                <div class="col-10">
                                    <label class="ms-0"> Color </label>
                                    <slider v-model="color" class="w-100"></slider>
                                    <validation-error :errors="apiValidationErrors.color"></validation-error>
                                </div>

                                <div class="col-2 text-end mt-5">
                                    <material-button class="float-right btn btm-sm" @click.prevent="handleAdd">Add
                                        Tag</material-button>
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
import { Slider } from "@ckpack/vue-color";

export default {
    name: 'AddTag',
    components: {
        MaterialButton,
        MaterialInput,
        ValidationError,
        Slider
    },
    data() {
        return {
            tag: {}
        }
    },
    setup() {
        return {
            color: '#33e8f5'
        }
    },
    mixins: [formMixin],
    methods: {
        async handleAdd() {
            this.resetApiValidation();
            try {
                this.tag.color = this.color.hex
                await this.$store.dispatch("tags/addTag", this.tag);
                showSwal.methods.showSwal({
                    type: "success",
                    message: "Tag added successfully!",
                    width: 500
                });
                this.$router.push({ name: "Tags List" })
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