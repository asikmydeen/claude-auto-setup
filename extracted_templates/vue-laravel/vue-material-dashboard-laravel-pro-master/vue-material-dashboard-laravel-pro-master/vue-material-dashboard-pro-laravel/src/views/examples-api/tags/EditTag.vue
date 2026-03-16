<template>
    <div class="py-4 container-fluid">
        <div class="mt-4 row">
            <div class="col-12">
                <div class="card">
                    <!-- Card header -->
                    <div class="card-header border-bottom">
                        <div class="row d-flex align-items-center">
                            <div class="col-6">
                                <h5 class="mb-0">Edit Tag</h5>
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

                                    <material-input id="name" v-model:value="tag.name" label="Name" name="name"
                                        variant="static"></material-input>
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
                                    <material-button class="float-right btn btm-sm" @click.prevent="handleEdit">Edit
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
import _ from "lodash"

export default {
    name: 'EditTag',
    components: {
        MaterialButton,
        MaterialInput,
        ValidationError,
        Slider
    },
    mixins: [formMixin],
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
    async mounted() {
        try {
            await this.$store.dispatch("tags/getTag", this.$route.params.id);
            this.tag = _.omit(this.$store.getters['tags/getTag'], 'links');
            this.color = this.tag.color
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
                this.tag.color = this.color.hex;
                await this.$store.dispatch("tags/editTag", this.tag);
                showSwal.methods.showSwal({
                    type: "success",
                    message: "Tag modified successfully!",
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