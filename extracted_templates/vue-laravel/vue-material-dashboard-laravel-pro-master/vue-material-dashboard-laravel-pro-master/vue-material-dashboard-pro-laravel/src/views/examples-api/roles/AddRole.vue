<template>
    <div class="py-4 container-fluid">
        <div class="mt-4 row">
            <div class="col-12">
                <div class="card">
                    <!-- Card header -->
                    <div class="card-header border-bottom">
                        <div class="row d-flex align-items-center">
                            <div class="col-6">
                                <h5 class="mb-0">Add Role</h5>
                            </div>
                            <div class="col-6 text-end">
                                <material-button class="float-right btn btm-sm"
                                    @click="this.$router.push({ name: 'Roles List' })">
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
                                    <material-input id="name" v-model:value="role.name" label="Name"
                                        name="name" variant="static"></material-input>
                                    <validation-error :errors="apiValidationErrors.name"></validation-error>
                                </div>
                                <div class="col-2 text-end">
                                    <material-button class="float-right btn btm-sm" @click.prevent="handleAdd">Add
                                        Role</material-button>
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

export default {
    name: 'AddRole',
    components: {
        MaterialButton,
        MaterialInput,
        ValidationError
    },
    data() {
        return {
            role: {}
        }
    },
    mixins: [formMixin],
    methods: {
        async handleAdd() {
            console.log(this.role.name)
            this.resetApiValidation();
            try {
                await this.$store.dispatch("roles/addRole", this.role);
                showSwal.methods.showSwal({
                    type: "success",
                    message: `Role added!`,
                    width: 500
                });
                this.$router.push({ name: "Roles List" })
            } catch (error) {
                if (error.response.data.errors) {
                    this.setApiValidation(error.response.data.errors);
                }
                showSwal.methods.showSwal({
                    type: "error",
                    message: `Oops! Something went wrong!`,
                    width: 500
                });

            }
        }
    }
}
</script>