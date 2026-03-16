<template>
  <div class="row">
    <div class="col-md-6">
      <div class="card">
        <div class="card-header">
          <h4 class="card-title">Notifications Style</h4>
        </div>
        <div class="card-body">
          <div class="alert alert-info">
            <span>This is a plain notification</span>
          </div>
          <div class="alert alert-info">
            <button type="button" aria-hidden="true" class="close">
              <i class="now-ui-icons ui-1_simple-remove"></i>
            </button>
            <span>This is a notification with close button.</span>
          </div>
          <div class="alert alert-info alert-with-icon" data-notify="container">
            <button type="button" aria-hidden="true" class="close">
              <i class="now-ui-icons ui-1_simple-remove"></i>
            </button>
            <span data-notify="icon" class="now-ui-icons ui-1_bell-53"></span>
            <span data-notify="message"
              >This is a notification with close button and icon.</span
            >
          </div>
          <div class="alert alert-info alert-with-icon" data-notify="container">
            <button type="button" aria-hidden="true" class="close">
              <i class="now-ui-icons ui-1_simple-remove"></i>
            </button>
            <span data-notify="icon" class="now-ui-icons ui-1_bell-53"></span>
            <span data-notify="message"
              >This is a notification with close button and icon and have many
              lines. You can see that the icon and the close button are always
              vertically aligned. This is a beautiful notification. So you don't
              have to worry about the style.</span
            >
          </div>
        </div>
      </div>
    </div>

    <div class="col-md-6">
      <div class="card">
        <div class="card-header">
          <h4 class="card-title">Notification states</h4>
        </div>
        <div class="card-body">
          <div class="alert alert-primary">
            <button type="button" aria-hidden="true" class="close">
              <i class="now-ui-icons ui-1_simple-remove"></i>
            </button>
            <span
              ><b> Primary - </b> This is a regular notification made with
              ".alert-primary"</span
            >
          </div>

          <div class="alert alert-info">
            <button type="button" aria-hidden="true" class="close">
              <i class="now-ui-icons ui-1_simple-remove"></i>
            </button>
            <span
              ><b> Info - </b> This is a regular notification made with
              ".alert-info"</span
            >
          </div>
          <div class="alert alert-success">
            <button type="button" aria-hidden="true" class="close">
              <i class="now-ui-icons ui-1_simple-remove"></i>
            </button>
            <span
              ><b> Success - </b> This is a regular notification made with
              ".alert-success"</span
            >
          </div>
          <div class="alert alert-warning">
            <button type="button" aria-hidden="true" class="close">
              <i class="now-ui-icons ui-1_simple-remove"></i>
            </button>
            <span
              ><b> Warning - </b> This is a regular notification made with
              ".alert-warning"</span
            >
          </div>
          <div class="alert alert-danger">
            <button type="button" aria-hidden="true" class="close">
              <i class="now-ui-icons ui-1_simple-remove"></i>
            </button>
            <span
              ><b> Danger - </b> This is a regular notification made with
              ".alert-danger"</span
            >
          </div>
        </div>
      </div>
    </div>
    <div class="col-md-12">
      <div class="card">
        <div class="card-body">
          <div class="places-buttons">
            <div class="row">
              <div class="col-md-6 ml-auto mr-auto text-center">
                <h4 class="card-title">
                  Notifications Places
                  <p class="category">Click to view notifications</p>
                </h4>
              </div>
            </div>
            <div class="row">
              <div class="col-lg-8 ml-auto mr-auto">
                <div class="row">
                  <div class="col-md-4">
                    <n-button
                      type="primary"
                      block
                      @click="runToast('top-left', 'info')"
                      >Top Left</n-button
                    >
                  </div>
                  <div class="col-md-4">
                    <n-button
                      type="primary"
                      block
                      @click="runToast('top-center', 'danger')"
                      >Top Center</n-button
                    >
                  </div>
                  <div class="col-md-4">
                    <n-button
                      type="primary"
                      block
                      @click="runToast('top-right', 'warning')"
                      >Top Right</n-button
                    >
                  </div>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-lg-8 ml-auto mr-auto">
                <div class="row">
                  <div class="col-md-4">
                    <n-button
                      type="primary"
                      block
                      @click="runToast('bottom-left', 'success')"
                      >Bottom Left</n-button
                    >
                  </div>
                  <div class="col-md-4">
                    <n-button
                      type="primary"
                      block
                      @click="runToast('bottom-center', 'primary')"
                      >Bottom Center</n-button
                    >
                  </div>
                  <div class="col-md-4">
                    <n-button
                      type="primary"
                      block
                      @click="runToast('bottom-right', 'primary')"
                      >Bottom Right</n-button
                    >
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="row">
            <div class="col-md-12 text-center">
              <div class="card-header">
                <h4 class="card-title">Modal</h4>
              </div>

              <n-button
                type="primary"
                data-toggle="modal"
                :data-target="'#' + modals.classic"
              >
                Classic modal
              </n-button>
              <n-button
                type="info"
                data-toggle="modal"
                :data-target="'#' + modals.notice"
              >
                Notice modal
              </n-button>
              <n-button data-toggle="modal" :data-target="'#' + modals.mini">
                Small alert modal
              </n-button>

              <!-- Classic Modal -->
              <modal
                :id="modals.classic"
                headerClasses="justify-content-center"
              >
                <template v-slot:header>
                  <h4 class="title title-up">Modal title</h4>
                </template>

                <p>
                  Far far away, behind the word mountains, far from the
                  countries Vokalia and Consonantia, there live the blind texts.
                  Separated they live in Bookmarksgrove right at the coast of
                  the Semantics, a large language ocean. A small river named
                  Duden flows by their place and supplies it with the necessary
                  regelialia. It is a paradisematic country, in which roasted
                  parts of sentences fly into your mouth.
                </p>
                <template v-slot:footer>
                  <n-button>Nice Button</n-button>
                  <n-button type="danger" data-dismiss="modal">Close</n-button>
                </template>
              </modal>

              <!-- notice modal -->
              <modal
                :id="modals.notice"
                footerClasses="justify-content-center"
                type="notice"
              >
                <template v-slot:header>
                  <h5 class="modal-title">How Do You Become an Affiliate?</h5>
                </template>

                <template v-slot:default>
                  <div class="instruction">
                    <div class="row">
                      <div class="col-md-8">
                        <strong>1. Register</strong>
                        <p class="description">
                          The first step is to create an account at
                          <a href="http://www.creative-tim.com/">Creative Tim</a
                          >. You can choose a social network or go for the
                          classic version, whatever works best for you.
                        </p>
                      </div>
                      <div class="col-md-4">
                        <div class="picture">
                          <img
                            src="img/bg1.jpg"
                            alt="Thumbnail Image"
                            class="rounded img-raised"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="instruction">
                    <div class="row">
                      <div class="col-md-8">
                        <strong>2. Apply</strong>
                        <p class="description">
                          The first step is to create an account at
                          <a href="http://www.creative-tim.com/">Creative Tim</a
                          >. You can choose a social network or go for the
                          classic version, whatever works best for you.
                        </p>
                      </div>
                      <div class="col-md-4">
                        <div class="picture">
                          <img
                            src="img/bg3.jpg"
                            alt="Thumbnail Image"
                            class="rounded img-raised"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <p>
                    If you have more questions, don't hesitate to contact us or
                    send us a tweet @creativetim. We're here to help!
                  </p>
                </template>
                <template v-slot:footer>
                  <div class="justify-content-center">
                    <n-button type="info" round data-dismiss="modal"
                      >Sounds good!</n-button
                    >
                  </div>
                </template>
              </modal>

              <!-- small modal -->
              <modal
                :id="modals.mini"
                class="modal-primary"
                :show-close="false"
                headerClasses="justify-content-center"
                type="mini"
              >
                <template v-slot:header>
                  <div class="modal-profile">
                    <i class="now-ui-icons users_circle-08"></i>
                  </div>
                </template>

                <p>Always have an access to your profile</p>
                <template v-slot:footer>
                  <n-button type="neutral" link>Back</n-button>
                  <n-button type="neutral" link data-dismiss="modal"
                    >Close</n-button
                  >
                </template>
              </modal>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { Modal } from "@/components";
import { useToast } from "vue-toastification";
import { Notification } from "@/components";

export default {
  components: {
    Modal,
  },
  data() {
    return {
      modals: {
        classic: "modalClassic",
        notice: "modalNotice",
        mini: "modalMini",
      },
    };
  },
  methods: {
    runToast(pos, type, ownText, ownIcon) {
      const text =
        "Welcome to <b>Vue Now UI Dashboard Pro</b> - a beautiful premium dashboard for every web developer";
      const icon = "now-ui-icons ui-1_bell-53";
      const content = {
        component: Notification,

        props: {
          ownText: ownText,
          ownIcon: ownIcon,
          icon: icon,
          text: text,
          type: type,
        },
      };
      const toast = useToast();
      toast(content, {
        hideProgressBar: true,
        icon: false,
        closeButton: false,
        position: pos,
      });
    },
  },
};
</script>
<style>
.ct-notification .Vue-Toastification__toast {
  padding: 0;
  overflow: inherit;
  box-shadow: none;
  background-color: transparent;
}
</style>
