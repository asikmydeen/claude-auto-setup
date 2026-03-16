/* eslint-disable no-unused-vars */
import router from "@/router"
import tooltip from "@/assets/js/tooltip";
import removeTooltip from "@/assets/js/removeTooltip";
import Swal from "sweetalert2";
import showSwal from "./showSwal.js";
import store from "@/store";

var deleteState = false;
var paramsCall = {
    sort: "created_at",
    query: "",
    nr: "1",
    perpage: "5"
};

function showSwalDelete(id, table, deletePath, getPath, textDelete) {
    showSwal.methods.showSwalConfirmationDelete()
        .then(async (result) => {
            if (result.isConfirmed) {
                try {
                    deleteState = true;
                    await store.dispatch(deletePath, id)
                    await store.dispatch(getPath, {
                        ...(paramsCall.sort ? { sort: paramsCall.sort } : {}),
                        filter: { 
                          ...(paramsCall.query ? { name: paramsCall.query } : {}),
                        },
                        page: {
                          number: paramsCall.nr,
                          size: paramsCall.perpage,
                        },
                      });
                    showSwal.methods.showSwal({
                        type: "success",
                        message: textDelete
                    });
                }
                catch (error) {
                    console.log(error)
                    showSwal.methods.showSwal({
                        type: "error",
                        message: error.response.data.errors[0].detail
                    });
                }
            }
            else if (result.dismiss === Swal.DismissReason.cancel) {
                Swal.dismiss;
            }
        });
}

export default {
    methods: {
        eventToCall(options) {
            if (deleteState){
                removeTooltip();
                deleteState = false;
            }
            tooltip(store.state.bootstrap);
            var buttons = document.querySelectorAll('.actionButton');
            buttons.forEach(function (button) {
                if (button.className == 'actionButton deleteButton cursor-pointer') {
                    button.addEventListener('click', function () {
                        if(this.id <= 3 && (process.env.VUE_APP_IS_DEMO ?? 1) == 1)
                        {
                            showSwal.methods.showSwal({
                                type: "error",
                                message: `You are not allowed to change data of default ${options.textDefaultData}.`,
                                width: 500
                            });
                        }
                        else
                        {
                            showSwalDelete(this.id, options.table, options.deletePath, options.getPath, options.textDelete);
                        }
                    })
                }
                else {
                    button.addEventListener('click', function () {
                        if(this.id <= 3 && (process.env.VUE_APP_IS_DEMO ?? 1) == 1){
                            showSwal.methods.showSwal({
                                type: "error",
                                message: `You are not allowed to change data of default ${options.textDefaultData}.`,
                                width: 400
                            });
                        }
                        else {
                            if(options.redirectPath == "Edit User"){
                                if (this.id == options.myUserId) {
                                    removeTooltip();
                                    router.push({ name: 'User Profile' });
                                }
                                else {
                                    removeTooltip();
                                    router.push({ name: options.redirectPath, params: { id: this.id } });
                                }
                            }
                            else
                            {
                                removeTooltip();
                                router.push({ name: options.redirectPath, params: { id: this.id } });
                            }
                        }
                    })
                }
            });
        },

        actionEditButton(roleId, text) {
            var actionEdit = `
              <a id="${roleId}" class="actionButton cursor-pointer me-3" data-bs-toggle="tooltip" title="${text}">
                <i class="fas fa-user-edit text-success"></i>
              </a>`;
            return actionEdit;
        },

        actionDeleteButton(roleId, text) {
            var actionDelete = `
              <a id="${roleId}" class="actionButton deleteButton cursor-pointer" data-bs-toggle="tooltip" title="${text}">
                <i class="fas fa-trash text-danger"></i>
              </a>`;
            return actionDelete;
        },

        removeEvent() {
            var buttons = this.$el.querySelectorAll('.actionButton');
            buttons.forEach(function (button) {
                button.replaceWith(button.cloneNode(true));
            });
        }
    }
}