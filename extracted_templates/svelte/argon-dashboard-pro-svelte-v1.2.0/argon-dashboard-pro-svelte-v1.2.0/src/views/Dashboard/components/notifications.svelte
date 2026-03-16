<script>
  import uuidv1 from "uuidv1";
  import BaseHeader from "../../../components/BaseHeader.svelte";
  import BaseButton from "../../../components/BaseButton.svelte";
  import RouteBreadcrumb from "../../../components/Breadcrumb/RouteBreadcrumb.svelte";
  import Card from "../../../components/Cards/Card.svelte";
  import BaseAlert from "../../../components/BaseAlert.svelte";
  import Modal from "../../../components/Modal.svelte";
  import BaseInput from "../../../components/Inputs/BaseInput.svelte";
  import BaseCheckbox from "../../../components/Inputs/BaseCheckbox.svelte";
  import { getContext } from "svelte";
  import { getNotificationsContext } from "svelte-notifications";
  const { addNotification } = getNotificationsContext();
  import { fade } from "svelte/transition";
  export let name = "Notifications";
  import Swal from "sweetalert2/dist/sweetalert2.js";
  import { onMount } from "svelte";
  onMount(function() {
    let topmenu = document.getElementsByTagName("nav").item(0);
    topmenu.classList.add("bg-danger");
    topmenu.classList.add("navbar-dark");
    topmenu.classList.remove("navbar-light");
    let search = document.getElementsByTagName("form").item(0);
    search.classList.remove("navbar-search-dark");
    search.classList.add("navbar-search-light");
  });

  const showSwal = type => {
    if (type === "basic") {
      Swal.fire({
        title: "Here's a message!",
        text: "A few words about this sweet alert ...",
        buttonsStyling: false,
        confirmButtonClass: "btn btn-primary"
      });
    } else if (type === "info") {
      Swal.fire({
        icon: "info",
        title: "Info",
        text: "A few words about this sweet alert ...",
        buttonsStyling: false,
        confirmButtonClass: "btn btn-info"
      });
    } else if (type === "success") {
      Swal.fire({
        title: "Success",
        text: "A few words about this sweet alert ...",
        buttonsStyling: false,
        confirmButtonClass: "btn btn-success",
        icon: "success"
      });
    } else if (type === "warning") {
      Swal.fire({
        title: "Warning",
        text: "A few words about this sweet alert ...",
        buttonsStyling: false,
        confirmButtonClass: "btn btn-warning",
        icon: "warning"
      });
    } else if (type === "question") {
      Swal.fire({
        title: "Are you sure?",
        text: "A few words about this sweet alert ...",
        buttonsStyling: false,
        confirmButtonClass: "btn btn-default",
        icon: "question"
      });
    }
  };

  let modals = {
    classic: false,
    notice: false,
    form: false
  };

  const openModalType = type => {
    if (type === "classic") {
      modals.classic = true;
      modals.notice = false;
      modals.form = false;
    }
    if (type === "notice") {
      modals.notice = true;
      modals.form = false;
      modals.classic = false;
    }
    if (type === "form") {
      modals.form = true;
      modals.notice = false;
      modals.classic = false;
    }
  };

  const closeModalType = type => {
    if (type === "classic") {
      modals.classic = false;
    }
    if (type === "notice") {
      modals.notice = false;
    }
    if (type === "form") {
      modals.form = false;
    }
  };

  function generateId() {
    let uuidv1 = require('uuidv1');
    let newUuid = "";
    newUuid = uuidv1();

    return newUuid;
  }
</script>

<div style="transform-origin: center top;" transition:fade={{ duration: 250 }}>
  <BaseHeader className="pb-6">
    <div class="row align-items-center py-4">
      <div class="col-lg-6 col-7">
        <h6 class="h2 text-white d-inline-block mb-0">{name}</h6>
        <nav aria-label="breadcrumb" class="d-none d-md-inline-block ml-md-4">
          <RouteBreadcrumb {name} />
        </nav>
      </div>
      <div class="col-lg-6 col-5 text-right">
        <BaseButton size="sm" type="neutral">New</BaseButton>
        <BaseButton size="sm" type="neutral">Filters</BaseButton>
      </div>
    </div>
  </BaseHeader>

  <div class="container-fluid mt--6">
    <div class="row justify-content-center">
      <div class="col-lg-8 card-wrapper">
        <Card>
          <h3 slot="header" class="mb-0">Alerts</h3>

          <BaseAlert dismissible={true} type="default" icon="ni ni-like-2">
            <strong>Default!</strong>
            This is a default alert—check it out!
          </BaseAlert>

          <BaseAlert dismissible={true} type="primary" icon="ni ni-like-2">
            <strong>Default!</strong>
            This is a primary alert—check it out!
          </BaseAlert>

          <BaseAlert dismissible={true} type="secondary" icon="ni ni-like-2">
            <strong>Default!</strong>
            This is a secondary alert—check it out!
          </BaseAlert>

          <BaseAlert dismissible={true} type="info" icon="ni ni-like-2">
            <strong>Default!</strong>
            This is a info alert—check it out!
          </BaseAlert>

          <BaseAlert dismissible={true} type="danger" icon="ni ni-like-2">
            <strong>Default!</strong>
            This is a danger alert—check it out!
          </BaseAlert>

          <BaseAlert dismissible={true} type="warning" icon="ni ni-like-2">
            <strong>Default!</strong>
            This is a warning alert—check it out!
          </BaseAlert>
        </Card>

        <!-- Modals -->
        <Card>
          <h3 slot="header" class="mb-0">Modals</h3>

          <div class="row">
            <div class="col-md-4">
              <BaseButton
                type="primary"
                block
                className="mb-3"
                on:click={() => openModalType('classic')}>
                Default
              </BaseButton>
            </div>
            <div class="col-md-4">
              <BaseButton
                type="warning"
                block
                className="mb-3"
                on:click={() => openModalType('notice')}>
                Notice
              </BaseButton>
            </div>
            <div class="col-md-4">
              <BaseButton
                type="default"
                block
                className="mb-3"
                on:click={() => openModalType('form')}>
                Form
              </BaseButton>
            </div>
          </div>

          <!--Classic modal-->
          <Modal show={modals.classic}>
            <h6 slot="header" class="modal-title">Type your modal title</h6>

            <p>
              Far far away, behind the word mountains, far from the countries
              Vokalia and Consonantia, there live the blind texts. Separated
              they live in Bookmarksgrove right at the coast of the Semantics, a
              large language ocean.
            </p>
            <p>
              A small river named Duden flows by their place and supplies it
              with the necessary regelialia. It is a paradisematic country, in
              which roasted parts of sentences fly into your mouth.
            </p>

            <div slot="footer" class="w-100 justify-content-between d-flex">
              <BaseButton type="primary">Save Changes</BaseButton>
              <BaseButton
                type="link"
                className="ml-auto"
                on:click={() => closeModalType('classic')}>
                Close
              </BaseButton>
            </div>
          </Modal>

          <!--Notice modal-->
          <Modal
            show={modals.notice}
            modalClasses="modal-danger"
            modalContentClasses="bg-gradient-danger"
            gradient={true}>
            <h6 slot="header" class="modal-title text-white">
              Your attention is required
            </h6>

            <div class="py-3 text-center">
              <i class="ni ni-bell-55 ni-3x text-white" />
              <h4 class="heading mt-4 text-white">You should read this!</h4>
              <p class="text-white">
                A small river named Duden flows by their place and supplies it
                with the necessary regelialia.
              </p>
            </div>

            <div slot="footer" class="w-100 d-flex justify-content-between">
              <BaseButton type="white">Ok, Got it</BaseButton>
              <BaseButton
                type="link"
                className="text-white ml-auto"
                on:click={() => closeModalType('notice')}>
                Close
              </BaseButton>
            </div>
          </Modal>

          <!--Form modal-->
          <Modal show={modals.form} size="sm" bodyClasses="p-0">
            <Card
              type="secondary"
              headerClasses="bg-transparent pb-5"
              bodyClasses="px-lg-5 py-lg-5"
              className="border-0 mb-0">
              <div slot="header">
                <div class="text-muted text-center mt-2 mb-3">
                  <small>Sign in with</small>
                </div>
                <div class="btn-wrapper text-center">
                  <BaseButton type="neutral" icon>
                    <span class="btn-inner--icon">
                      <img
                        src="../../img/icons/common/github.svg"
                        alt="Image" />
                    </span>
                    <span class="btn-inner--text">Github</span>
                  </BaseButton>
                  <BaseButton type="neutral" icon>
                    <span class="btn-inner--icon">
                      <img
                        src="../../img/icons/common/google.svg"
                        alt="Image" />
                    </span>
                    <span class="btn-inner--text">Google</span>
                  </BaseButton>
                </div>
              </div>

              <div>
                <div class="text-center text-muted mb-4">
                  <small>Or sign in with credentials</small>
                </div>
                <form action="" role="form">
                  <BaseInput
                    alternative
                    model="email"
                    className="mb-3"
                    placeholder="Email"
                    prependIcon="ni ni-email-83" />
                  <BaseInput
                    alternative
                    model="password"
                    placeholder="Password"
                    prependIcon="ni ni-lock-circle-open" />
                  <BaseCheckbox model="remember">Remember me</BaseCheckbox>
                  <div class="text-center">
                    <BaseButton type="primary" className="my-4">
                      Sign In
                    </BaseButton>
                  </div>
                </form>
              </div>
            </Card>
            <div slot="footer" class="w-100 d-flex justify-content-end">
              <BaseButton type="white">Cancel</BaseButton>
              <BaseButton
                type="primary"
                className="text-white"
                on:click={() => closeModalType('form')}>
                Ok
              </BaseButton>
            </div>
          </Modal>
        </Card>

        <!-- Notifications -->
        <Card>
          <h3 slot="header" class="mb-0">Notifications</h3>

          <button
            class="btn btn-default"
            on:click={() => {
              addNotification({
                id: generateId(),
                text:
                  'Welcome to Argon Dashboard PRO Svelte - a beautiful resource for every web developer',
                position: 'top-right',
                notifyClassNames: 'top right',
                icon: 'ni ni-bell-55',
                type: 'default',
                removeAfter: 4000
              });
            }}>
            Default
          </button>
          <button
            class="btn btn-info"
            on:click={() => {
              addNotification({
                id: generateId(),
                text:
                  'Welcome to Argon Dashboard PRO Svelte - a beautiful resource for every web developer',
                position: 'top-right',
                notifyClassNames: 'top right',
                icon: 'ni ni-bell-55',
                type: 'info',
                removeAfter: 4000
              });
            }}>
            Info
          </button>
          <button
            class="btn btn-success"
            on:click={() => {
              addNotification({
                id: generateId(),
                text:
                  'Welcome to Argon Dashboard PRO Svelte - a beautiful resource for every web developer',
                position: 'top-right',
                notifyClassNames: 'top right',
                icon: 'ni ni-bell-55',
                type: 'success',
                removeAfter: 4000
              });
            }}>
            Success
          </button>
          <button
            class="btn btn-warning"
            on:click={() => {
              addNotification({
                id: generateId(),
                text:
                  'Welcome to Argon Dashboard PRO Svelte - a beautiful resource for every web developer',
                position: 'top-right',
                notifyClassNames: 'top right',
                icon: 'ni ni-bell-55',
                type: 'warning',
                removeAfter: 4000
              });
            }}>
            Warning
          </button>
          <button
            class="btn btn-danger"
            on:click={() => {
              addNotification({
                id: generateId(),
                text:
                  'Welcome to Argon Dashboard PRO Svelte - a beautiful resource for every web developer',
                position: 'top-right',
                notifyClassNames: 'top right',
                icon: 'ni ni-bell-55',
                type: 'danger',
                removeAfter: 4000
              });
            }}>
            Danger
          </button>
        </Card>

        <!--Sweet alert-->
        <Card className="ct-example">
          <h3 slot="header" class="mb-0">Sweet alerts</h3>

          <BaseButton type="primary" on:click={() => showSwal('basic')}>
            Basic alert
          </BaseButton>
          <BaseButton type="info" on:click={() => showSwal('info')}>
            Info alert
          </BaseButton>
          <BaseButton type="success" on:click={() => showSwal('success')}>
            Success alert
          </BaseButton>
          <BaseButton type="warning" on:click={() => showSwal('warning')}>
            Warning alert
          </BaseButton>
          <BaseButton type="default" on:click={() => showSwal('question')}>
            Question
          </BaseButton>
        </Card>

      </div>
    </div>
  </div>
</div>
