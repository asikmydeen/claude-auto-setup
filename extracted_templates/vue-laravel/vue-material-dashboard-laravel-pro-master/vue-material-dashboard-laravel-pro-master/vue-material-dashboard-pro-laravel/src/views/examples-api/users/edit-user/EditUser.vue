<template>
    <div class="container-fluid py-4">
      <div class="row">
        <div class="col-12">
          <div class="multisteps-form mb-9">
            <div class="row">
              <div class="col-12 col-lg-8 m-auto">
                <div class="card">
                  <div
                    class="card-header p-0 position-relative mt-n4 mx-3 z-index-2"
                  >
                    <div
                      class="bg-gradient-success shadow-success border-radius-lg pt-4 pb-3"
                    >
                      <div class="multisteps-form__progress">
                        <button
                          class="multisteps-form__progress-btn"
                          type="button"
                          title="User Info"
                          :class="activeClass"
                        >
                          <span>Edit User</span>
                        </button>
                        
                      </div>
                    </div>
                  </div>
                  <div class="card-body">
                    <form>
                      <info :userId="userId" :class="activeClass" />
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import Info from "./Info.vue"
  export default {
    name: "EditUser",
    components: {
      Info,
    },
    data() {
      return {
        activeClass: "js-active position-relative",
        userId: ''
      };
    },
    mounted(){
        this.userId = this.$route.params.id;
    }
  };
  </script>

  