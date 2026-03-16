/* eslint-disable no-unused-vars */
import router from "@/router"
import tooltip from "./tooltip.js";
import Swal from "sweetalert2";
import showSwal from "./showSwal.js";
import store from "@/store";

var deleteState = false;
var statusDemo = null;
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
                    await store.dispatch(deletePath, id);
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
                    showSwal.methods.showSwal({
                        type: "error",
                        message:  (error.response.data != null && error.response.data != undefined) ? error.response.data.errors[0].title : "Oops, something went wrong!",
                        width: (error.response.data != null && error.response.data != undefined) ? error.response.data.errors[0].title.length > 37 ? 360 : 300 : 300
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
            statusDemo = this.$isDemo;
            if (deleteState){
                tooltip.methods.removeTooltip();
                deleteState = false;
            }
            tooltip.methods.setTooltip(store.state.bootstrap);
            var buttons = document.querySelectorAll('.actionButton');
            buttons.forEach(function (button) {
                if (button.className == 'actionButton deleteButton cursor-pointer') {
                    button.addEventListener('click', function () {
                        if(statusDemo == 1 && this.id <= 3 && (options.textDefaultData != 'categories' && options.textDefaultData != 'tags' && options.textDefaultData != 'items'))
                        {
                            showSwal.methods.showSwal({
                                type: "error",
                                message: `You are not allowed to change data of default ${options.textDefaultData}.`,
                                width: 400
                            });
                        }
                        else
                        {
                            if(statusDemo == 1 && this.id <= 2)
                            {
                                showSwal.methods.showSwal({
                                    type: "error",
                                    message: `You are not allowed to change data of default ${options.textDefaultData}.`,
                                    width: options.textDefaultData == 'categories' ? 430 : 400
                                });
                            }
                            else
                            {
                                showSwalDelete(this.id, options.table, options.deletePath, options.getPath, options.textDelete);
                            }
                        }
                    })
                }
                else {
                    button.addEventListener('click', function () {
                        if(statusDemo == 1 && this.id <= 3 && (options.textDefaultData != 'categories' && options.textDefaultData != 'tags' && options.textDefaultData != 'items')){
                            showSwal.methods.showSwal({
                                type: "error",
                                message: `You are not allowed to change data of default ${options.textDefaultData}.`,
                                width: 400
                            });
                        }
                        else {
                            if(statusDemo == 1 && this.id <= 2)
                            {
                                showSwal.methods.showSwal({
                                    type: "error",
                                    message: `You are not allowed to change data of default ${options.textDefaultData}.`,
                                    width: options.textDefaultData == 'categories' ? 430 : 400
                                });
                            }
                            else
                            {
                                if(options.redirectPath == "Edit User"){
                                    if (this.id == options.me.id) {
                                        tooltip.methods.removeTooltip();
                                        router.push({ name: 'User Profile' });
                                    }
                                    else {
                                        tooltip.methods.removeTooltip();
                                        router.push({ name: options.redirectPath, params: { id: this.id } });
                                    }
                                }
                                else
                                {
                                    tooltip.methods.removeTooltip();
                                    router.push({ name: options.redirectPath, params: { id: this.id } });
                                }
                            }
                        }
                    })
                }
            });
        },

        actionEditButton(userId, text) {
            var actionEdit = `
              <a id="${userId}" class="actionButton cursor-pointer me-3" data-bs-toggle="tooltip" title="${text}">
                <i class="fas fa-user-edit text-secondary"></i>
              </a>`;
            return actionEdit;
        },

        actionDeleteButton(userId, text) {
            var actionDelete = `
              <a id="${userId}" class="actionButton deleteButton cursor-pointer" data-bs-toggle="tooltip" title="${text}">
                <i class="fas fa-trash text-secondary"></i>
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