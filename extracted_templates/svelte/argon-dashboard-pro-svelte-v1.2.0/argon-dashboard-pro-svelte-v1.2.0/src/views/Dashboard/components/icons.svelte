<script>
  import uuidv1 from "uuidv1";
  import BaseHeader from "../../../components/BaseHeader.svelte";
  import RouteBreadcrumb from "../../../components/Breadcrumb/RouteBreadcrumb.svelte";
  import BaseButton from "../../../components/BaseButton.svelte";
  import Card from "../../../components/Cards/Card.svelte";
  export let name = "Icons";
  import { getNotificationsContext } from "svelte-notifications";
  const { addNotification } = getNotificationsContext();
  import { fade } from "svelte/transition";
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
  const copyToClipboard = copy => {
    const el = document.createElement("textarea");
    el.value = copy;
    document.body.appendChild(el);
    el.select();
    el.setSelectionRange(0, 99999);
    document.execCommand("copy");
    document.body.removeChild(el);
  };

  function generateId() {
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
      <div class="col-lg-8">
        <Card headerClasses="bg-transparent">
          <h3 slot="header" class="mb-0">Icons</h3>
          <div class="row icon-examples">
            <div class="col-lg-3 col-md-6">
              <button
                type="button"
                class="btn-icon-clipboard"
                on:click={() => {
                  addNotification({
                    id: generateId(),
                    text: 'Copied to clipboard',
                    position: 'top-right',
                    notifyClassNames: 'top right',
                    type: 'info',
                    removeAfter: 4000
                  }), copyToClipboard('ni ni-active-40');
                }}>
                <div>
                  <i class="ni ni-active-40" />
                  <span>active-40</span>
                </div>
              </button>
            </div>
            <div class="col-lg-3 col-md-6">
              <button
                type="button"
                class="btn-icon-clipboard"
                on:click={() => {
                  addNotification({
                    id: generateId(),
                    text: 'Copied to clipboard',
                    position: 'top-right',
                    notifyClassNames: 'top right',
                    type: 'info',
                    removeAfter: 4000
                  }), copyToClipboard('ni ni-air-baloon');
                }}>
                <div>
                  <i class="ni ni-air-baloon" />
                  <span>air-baloon</span>
                </div>
              </button>
            </div>
            <div class="col-lg-3 col-md-6">
              <button
                type="button"
                class="btn-icon-clipboard"
                on:click={() => {
                  addNotification({
                    id: generateId(),
                    text: 'Copied to clipboard',
                    position: 'top-right',
                    notifyClassNames: 'top right',
                    type: 'info',
                    removeAfter: 4000
                  }), copyToClipboard('ni ni-album-2');
                }}>
                <div>
                  <i class="ni ni-album-2" />
                  <span>album-2</span>
                </div>
              </button>
            </div>
            <div class="col-lg-3 col-md-6">
              <button
                type="button"
                class="btn-icon-clipboard"
                on:click={() => {
                  addNotification({
                    id: generateId(),
                    text: 'Copied to clipboard',
                    position: 'top-right',
                    notifyClassNames: 'top right',
                    type: 'info',
                    removeAfter: 4000
                  }), copyToClipboard('ni ni-align-center');
                }}>
                <div>
                  <i class="ni ni-align-center" />
                  <span>align-center</span>
                </div>
              </button>
            </div>
            <div class="col-lg-3 col-md-6">
              <button
                type="button"
                class="btn-icon-clipboard"
                on:click={() => {
                  addNotification({
                    id: generateId(),
                    text: 'Copied to clipboard',
                    position: 'top-right',
                    notifyClassNames: 'top right',
                    type: 'info',
                    removeAfter: 4000
                  }), copyToClipboard('ni ni-align-left-2');
                }}>
                <div>
                  <i class="ni ni-align-left-2" />
                  <span>align-left-2</span>
                </div>
              </button>
            </div>
            <div class="col-lg-3 col-md-6">
              <button
                type="button"
                class="btn-icon-clipboard"
                on:click={() => {
                  addNotification({
                    id: generateId(),
                    text: 'Copied to clipboard',
                    position: 'top-right',
                    notifyClassNames: 'top right',
                    type: 'info',
                    removeAfter: 4000
                  }), copyToClipboard('ni ni-ambulance');
                }}>
                <div>
                  <i class="ni ni-ambulance" />
                  <span>ambulance</span>
                </div>
              </button>
            </div>
            <div class="col-lg-3 col-md-6">
              <button
                type="button"
                class="btn-icon-clipboard"
                on:click={() => {
                  addNotification({
                    id: generateId(),
                    text: 'Copied to clipboard',
                    position: 'top-right',
                    notifyClassNames: 'top right',
                    type: 'info',
                    removeAfter: 4000
                  }), copyToClipboard('ni ni-app');
                }}>
                <div>
                  <i class="ni ni-app" />
                  <span>app</span>
                </div>
              </button>
            </div>
            <div class="col-lg-3 col-md-6">
              <button
                type="button"
                class="btn-icon-clipboard"
                on:click={() => {
                  addNotification({
                    id: generateId(),
                    text: 'Copied to clipboard',
                    position: 'top-right',
                    notifyClassNames: 'top right',
                    type: 'info',
                    removeAfter: 4000
                  }), copyToClipboard('ni ni-archive-2');
                }}>
                <div>
                  <i class="ni ni-archive-2" />
                  <span>archive-2</span>
                </div>
              </button>
            </div>
            <div class="col-lg-3 col-md-6">
              <button
                type="button"
                class="btn-icon-clipboard"
                on:click={() => {
                  addNotification({
                    id: generateId(),
                    text: 'Copied to clipboard',
                    position: 'top-right',
                    notifyClassNames: 'top right',
                    type: 'info',
                    removeAfter: 4000
                  }), copyToClipboard('ni ni-atom');
                }}>
                <div>
                  <i class="ni ni-atom" />
                  <span>atom</span>
                </div>
              </button>
            </div>
            <div class="col-lg-3 col-md-6">
              <button
                type="button"
                class="btn-icon-clipboard"
                on:click={() => {
                  addNotification({
                    id: generateId(),
                    text: 'Copied to clipboard',
                    position: 'top-right',
                    notifyClassNames: 'top right',
                    type: 'info',
                    removeAfter: 4000
                  }), copyToClipboard('ni ni-badge');
                }}>
                <div>
                  <i class="ni ni-badge" />
                  <span>badge</span>
                </div>
              </button>
            </div>
            <div class="col-lg-3 col-md-6">
              <button
                type="button"
                class="btn-icon-clipboard"
                on:click={() => {
                  addNotification({
                    id: generateId(),
                    text: 'Copied to clipboard',
                    position: 'top-right',
                    notifyClassNames: 'top right',
                    type: 'info',
                    removeAfter: 4000
                  }), copyToClipboard('ni ni-bag-17');
                }}>
                <div>
                  <i class="ni ni-bag-17" />
                  <span>bag-17</span>
                </div>
              </button>
            </div>
            <div class="col-lg-3 col-md-6">
              <button
                type="button"
                class="btn-icon-clipboard"
                on:click={() => {
                  addNotification({
                    id: generateId(),
                    text: 'Copied to clipboard',
                    position: 'top-right',
                    notifyClassNames: 'top right',
                    type: 'info',
                    removeAfter: 4000
                  }), copyToClipboard('ni ni-basket');
                }}>
                <div>
                  <i class="ni ni-basket" />
                  <span>basket</span>
                </div>
              </button>
            </div>
            <div class="col-lg-3 col-md-6">
              <button
                type="button"
                class="btn-icon-clipboard"
                on:click={() => {
                  addNotification({
                    id: generateId(),
                    text: 'Copied to clipboard',
                    position: 'top-right',
                    notifyClassNames: 'top right',
                    type: 'info',
                    removeAfter: 4000
                  }), copyToClipboard('ni ni-bell-55');
                }}>
                <div>
                  <i class="ni ni-bell-55" />
                  <span>bell-55</span>
                </div>
              </button>
            </div>
            <div class="col-lg-3 col-md-6">
              <button
                type="button"
                class="btn-icon-clipboard"
                on:click={() => {
                  addNotification({
                    id: generateId(),
                    text: 'Copied to clipboard',
                    position: 'top-right',
                    notifyClassNames: 'top right',
                    type: 'info',
                    removeAfter: 4000
                  }), copyToClipboard('ni ni-bold-down');
                }}>
                <div>
                  <i class="ni ni-bold-down" />
                  <span>bold-down</span>
                </div>
              </button>
            </div>
            <div class="col-lg-3 col-md-6">
              <button
                type="button"
                class="btn-icon-clipboard"
                on:click={() => {
                  addNotification({
                    id: generateId(),
                    text: 'Copied to clipboard',
                    position: 'top-right',
                    notifyClassNames: 'top right',
                    type: 'info',
                    removeAfter: 4000
                  }), copyToClipboard('ni ni-bold-left');
                }}>
                <div>
                  <i class="ni ni-bold-left" />
                  <span>bold-left</span>
                </div>
              </button>
            </div>
            <div class="col-lg-3 col-md-6">
              <button
                type="button"
                class="btn-icon-clipboard"
                on:click={() => {
                  addNotification({
                    id: generateId(),
                    text: 'Copied to clipboard',
                    position: 'top-right',
                    notifyClassNames: 'top right',
                    type: 'info',
                    removeAfter: 4000
                  }), copyToClipboard('ni ni-bold-right');
                }}>
                <div>
                  <i class="ni ni-bold-right" />
                  <span>bold-right</span>
                </div>
              </button>
            </div>
            <div class="col-lg-3 col-md-6">
              <button
                type="button"
                class="btn-icon-clipboard"
                on:click={() => {
                  addNotification({
                    id: generateId(),
                    text: 'Copied to clipboard',
                    position: 'top-right',
                    notifyClassNames: 'top right',
                    type: 'info',
                    removeAfter: 4000
                  }), copyToClipboard('ni ni-bold-up');
                }}>
                <div>
                  <i class="ni ni-bold-up" />
                  <span>bold-up</span>
                </div>
              </button>
            </div>
            <div class="col-lg-3 col-md-6">
              <button
                type="button"
                class="btn-icon-clipboard"
                on:click={() => {
                  addNotification({
                    id: generateId(),
                    text: 'Copied to clipboard',
                    position: 'top-right',
                    notifyClassNames: 'top right',
                    type: 'info',
                    removeAfter: 4000
                  }), copyToClipboard('ni ni-bold');
                }}>
                <div>
                  <i class="ni ni-bold" />
                  <span>bold</span>
                </div>
              </button>
            </div>
            <div class="col-lg-3 col-md-6">
              <button
                type="button"
                class="btn-icon-clipboard"
                on:click={() => {
                  addNotification({
                    id: generateId(),
                    text: 'Copied to clipboard',
                    position: 'top-right',
                    notifyClassNames: 'top right',
                    type: 'info',
                    removeAfter: 4000
                  }), copyToClipboard('ni ni-book-bookmark');
                }}>
                <div>
                  <i class="ni ni-book-bookmark" />
                  <span>book-bookmark</span>
                </div>
              </button>
            </div>
            <div class="col-lg-3 col-md-6">
              <button
                type="button"
                class="btn-icon-clipboard"
                on:click={() => {
                  addNotification({
                    id: generateId(),
                    text: 'Copied to clipboard',
                    position: 'top-right',
                    notifyClassNames: 'top right',
                    type: 'info',
                    removeAfter: 4000
                  }), copyToClipboard('ni ni-books');
                }}>
                <div>
                  <i class="ni ni-books" />
                  <span>books</span>
                </div>
              </button>
            </div>
            <div class="col-lg-3 col-md-6">
              <button
                type="button"
                class="btn-icon-clipboard"
                on:click={() => {
                  addNotification({
                    id: generateId(),
                    text: 'Copied to clipboard',
                    position: 'top-right',
                    notifyClassNames: 'top right',
                    type: 'info',
                    removeAfter: 4000
                  }), copyToClipboard('ni ni-box-2');
                }}>
                <div>
                  <i class="ni ni-box-2" />
                  <span>box-2</span>
                </div>
              </button>
            </div>
            <div class="col-lg-3 col-md-6">
              <button
                type="button"
                class="btn-icon-clipboard"
                on:click={() => {
                  addNotification({
                    id: generateId(),
                    text: 'Copied to clipboard',
                    position: 'top-right',
                    notifyClassNames: 'top right',
                    type: 'info',
                    removeAfter: 4000
                  }), copyToClipboard('ni ni-briefcase-24');
                }}>
                <div>
                  <i class="ni ni-briefcase-24" />
                  <span>briefcase-24</span>
                </div>
              </button>
            </div>
            <div class="col-lg-3 col-md-6">
              <button
                type="button"
                class="btn-icon-clipboard"
                on:click={() => {
                  addNotification({
                    id: generateId(),
                    text: 'Copied to clipboard',
                    position: 'top-right',
                    notifyClassNames: 'top right',
                    type: 'info',
                    removeAfter: 4000
                  }), copyToClipboard('ni ni-building');
                }}>
                <div>
                  <i class="ni ni-building" />
                  <span>building</span>
                </div>
              </button>
            </div>
            <div class="col-lg-3 col-md-6">
              <button
                type="button"
                class="btn-icon-clipboard"
                on:click={() => {
                  addNotification({
                    id: generateId(),
                    text: 'Copied to clipboard',
                    position: 'top-right',
                    notifyClassNames: 'top right',
                    type: 'info',
                    removeAfter: 4000
                  }), copyToClipboard('ni ni-bulb-61');
                }}>
                <div>
                  <i class="ni ni-bulb-61" />
                  <span>bulb-61</span>
                </div>
              </button>
            </div>
            <div class="col-lg-3 col-md-6">
              <button
                type="button"
                class="btn-icon-clipboard"
                on:click={() => {
                  addNotification({
                    id: generateId(),
                    text: 'Copied to clipboard',
                    position: 'top-right',
                    notifyClassNames: 'top right',
                    type: 'info',
                    removeAfter: 4000
                  }), copyToClipboard('ni ni-bullet-list-67');
                }}>
                <div>
                  <i class="ni ni-bullet-list-67" />
                  <span>bullet-list-67</span>
                </div>
              </button>
            </div>
            <div class="col-lg-3 col-md-6">
              <button
                type="button"
                class="btn-icon-clipboard"
                on:click={() => {
                  addNotification({
                    id: generateId(),
                    text: 'Copied to clipboard',
                    position: 'top-right',
                    notifyClassNames: 'top right',
                    type: 'info',
                    removeAfter: 4000
                  }), copyToClipboard('ni ni-bus-front-12');
                }}>
                <div>
                  <i class="ni ni-bus-front-12" />
                  <span>bus-front-12</span>
                </div>
              </button>
            </div>
            <div class="col-lg-3 col-md-6">
              <button
                type="button"
                class="btn-icon-clipboard"
                on:click={() => {
                  addNotification({
                    id: generateId(),
                    text: 'Copied to clipboard',
                    position: 'top-right',
                    notifyClassNames: 'top right',
                    type: 'info',
                    removeAfter: 4000
                  }), copyToClipboard('ni ni-button-pause');
                }}>
                <div>
                  <i class="ni ni-button-pause" />
                  <span>button-pause</span>
                </div>
              </button>
            </div>
            <div class="col-lg-3 col-md-6">
              <button
                type="button"
                class="btn-icon-clipboard"
                on:click={() => {
                  addNotification({
                    id: generateId(),
                    text: 'Copied to clipboard',
                    position: 'top-right',
                    notifyClassNames: 'top right',
                    type: 'info',
                    removeAfter: 4000
                  }), copyToClipboard('ni ni-button-play');
                }}>
                <div>
                  <i class="ni ni-button-play" />
                  <span>button-play</span>
                </div>
              </button>
            </div>
            <div class="col-lg-3 col-md-6">
              <button
                type="button"
                class="btn-icon-clipboard"
                on:click={() => {
                  addNotification({
                    id: generateId(),
                    text: 'Copied to clipboard',
                    position: 'top-right',
                    notifyClassNames: 'top right',
                    type: 'info',
                    removeAfter: 4000
                  }), copyToClipboard('ni ni-button-power');
                }}>
                <div>
                  <i class="ni ni-button-power" />
                  <span>button-power</span>
                </div>
              </button>
            </div>
            <div class="col-lg-3 col-md-6">
              <button
                type="button"
                class="btn-icon-clipboard"
                on:click={() => {
                  addNotification({
                    id: generateId(),
                    text: 'Copied to clipboard',
                    position: 'top-right',
                    notifyClassNames: 'top right',
                    type: 'info',
                    removeAfter: 4000
                  }), copyToClipboard('ni ni-calendar-grid-58');
                }}>
                <div>
                  <i class="ni ni-calendar-grid-58" />
                  <span>calendar-grid-58</span>
                </div>
              </button>
            </div>
            <div class="col-lg-3 col-md-6">
              <button
                type="button"
                class="btn-icon-clipboard"
                on:click={() => {
                  addNotification({
                    id: generateId(),
                    text: 'Copied to clipboard',
                    position: 'top-right',
                    notifyClassNames: 'top right',
                    type: 'info',
                    removeAfter: 4000
                  }), copyToClipboard('ni ni-camera-compact');
                }}>
                <div>
                  <i class="ni ni-camera-compact" />
                  <span>camera-compact</span>
                </div>
              </button>
            </div>
            <div class="col-lg-3 col-md-6">
              <button
                type="button"
                class="btn-icon-clipboard"
                on:click={() => {
                  addNotification({
                    id: generateId(),
                    text: 'Copied to clipboard',
                    position: 'top-right',
                    notifyClassNames: 'top right',
                    type: 'info',
                    removeAfter: 4000
                  }), copyToClipboard('ni ni-caps-small');
                }}>
                <div>
                  <i class="ni ni-caps-small" />
                  <span>caps-small</span>
                </div>
              </button>
            </div>
            <div class="col-lg-3 col-md-6">
              <button
                type="button"
                class="btn-icon-clipboard"
                on:click={() => {
                  addNotification({
                    id: generateId(),
                    text: 'Copied to clipboard',
                    position: 'top-right',
                    notifyClassNames: 'top right',
                    type: 'info',
                    removeAfter: 4000
                  }), copyToClipboard('ni ni-cart');
                }}>
                <div>
                  <i class="ni ni-cart" />
                  <span>cart</span>
                </div>
              </button>
            </div>
            <div class="col-lg-3 col-md-6">
              <button
                type="button"
                class="btn-icon-clipboard"
                on:click={() => {
                  addNotification({
                    id: generateId(),
                    text: 'Copied to clipboard',
                    position: 'top-right',
                    notifyClassNames: 'top right',
                    type: 'info',
                    removeAfter: 4000
                  }), copyToClipboard('ni ni-chart-bar-32');
                }}>
                <div>
                  <i class="ni ni-chart-bar-32" />
                  <span>chart-bar-32</span>
                </div>
              </button>
            </div>
            <div class="col-lg-3 col-md-6">
              <button
                type="button"
                class="btn-icon-clipboard"
                on:click={() => {
                  addNotification({
                    id: generateId(),
                    text: 'Copied to clipboard',
                    position: 'top-right',
                    notifyClassNames: 'top right',
                    type: 'info',
                    removeAfter: 4000
                  }), copyToClipboard('ni ni-chart-pie-35');
                }}>
                <div>
                  <i class="ni ni-chart-pie-35" />
                  <span>chart-pie-35</span>
                </div>
              </button>
            </div>
            <div class="col-lg-3 col-md-6">
              <button
                type="button"
                class="btn-icon-clipboard"
                on:click={() => {
                  addNotification({
                    id: generateId(),
                    text: 'Copied to clipboard',
                    position: 'top-right',
                    notifyClassNames: 'top right',
                    type: 'info',
                    removeAfter: 4000
                  }), copyToClipboard('ni ni-chat-round');
                }}>
                <div>
                  <i class="ni ni-chat-round" />
                  <span>chat-round</span>
                </div>
              </button>
            </div>
            <div class="col-lg-3 col-md-6">
              <button
                type="button"
                class="btn-icon-clipboard"
                on:click={() => {
                  addNotification({
                    id: generateId(),
                    text: 'Copied to clipboard',
                    position: 'top-right',
                    notifyClassNames: 'top right',
                    type: 'info',
                    removeAfter: 4000
                  }), copyToClipboard('ni ni-check-bold');
                }}>
                <div>
                  <i class="ni ni-check-bold" />
                  <span>check-bold</span>
                </div>
              </button>
            </div>
            <div class="col-lg-3 col-md-6">
              <button
                type="button"
                class="btn-icon-clipboard"
                on:click={() => {
                  addNotification({
                    id: generateId(),
                    text: 'Copied to clipboard',
                    position: 'top-right',
                    notifyClassNames: 'top right',
                    type: 'info',
                    removeAfter: 4000
                  }), copyToClipboard('ni ni-circle-08');
                }}>
                <div>
                  <i class="ni ni-circle-08" />
                  <span>circle-08</span>
                </div>
              </button>
            </div>
            <div class="col-lg-3 col-md-6">
              <button
                type="button"
                class="btn-icon-clipboard"
                on:click={() => {
                  addNotification({
                    id: generateId(),
                    text: 'Copied to clipboard',
                    position: 'top-right',
                    notifyClassNames: 'top right',
                    type: 'info',
                    removeAfter: 4000
                  }), copyToClipboard('ni ni-cloud-download-95');
                }}>
                <div>
                  <i class="ni ni-cloud-download-95" />
                  <span>cloud-download-95</span>
                </div>
              </button>
            </div>
            <div class="col-lg-3 col-md-6">
              <button
                type="button"
                class="btn-icon-clipboard"
                on:click={() => {
                  addNotification({
                    id: generateId(),
                    text: 'Copied to clipboard',
                    position: 'top-right',
                    notifyClassNames: 'top right',
                    type: 'info',
                    removeAfter: 4000
                  }), copyToClipboard('ni ni-cloud-upload-96');
                }}>
                <div>
                  <i class="ni ni-cloud-upload-96" />
                  <span>cloud-upload-96</span>
                </div>
              </button>
            </div>
            <div class="col-lg-3 col-md-6">
              <button
                type="button"
                class="btn-icon-clipboard"
                on:click={() => {
                  addNotification({
                    id: generateId(),
                    text: 'Copied to clipboard',
                    position: 'top-right',
                    notifyClassNames: 'top right',
                    type: 'info',
                    removeAfter: 4000
                  }), copyToClipboard('ni ni-compass-04');
                }}>
                <div>
                  <i class="ni ni-compass-04" />
                  <span>ni-compass-04</span>
                </div>
              </button>
            </div>
            <div class="col-lg-3 col-md-6">
              <button
                type="button"
                class="btn-icon-clipboard"
                on:click={() => {
                  addNotification({
                    id: generateId(),
                    text: 'Copied to clipboard',
                    position: 'top-right',
                    notifyClassNames: 'top right',
                    type: 'info',
                    removeAfter: 4000
                  }), copyToClipboard('ni ni-controller');
                }}>
                <div>
                  <i class="ni ni-controller" />
                  <span>controller</span>
                </div>
              </button>
            </div>
            <div class="col-lg-3 col-md-6">
              <button
                type="button"
                class="btn-icon-clipboard"
                on:click={() => {
                  addNotification({
                    id: generateId(),
                    text: 'Copied to clipboard',
                    position: 'top-right',
                    notifyClassNames: 'top right',
                    type: 'info',
                    removeAfter: 4000
                  }), copyToClipboard('ni ni-credit-card');
                }}>
                <div>
                  <i class="ni ni-credit-card" />
                  <span>credit-card</span>
                </div>
              </button>
            </div>
            <div class="col-lg-3 col-md-6">
              <button
                type="button"
                class="btn-icon-clipboard"
                on:click={() => {
                  addNotification({
                    id: generateId(),
                    text: 'Copied to clipboard',
                    position: 'top-right',
                    notifyClassNames: 'top right',
                    type: 'info',
                    removeAfter: 4000
                  }), copyToClipboard('ni ni-curved-next');
                }}>
                <div>
                  <i class="ni ni-curved-next" />
                  <span>curved-next</span>
                </div>
              </button>
            </div>
            <div class="col-lg-3 col-md-6">
              <button
                type="button"
                class="btn-icon-clipboard"
                on:click={() => {
                  addNotification({
                    id: generateId(),
                    text: 'Copied to clipboard',
                    position: 'top-right',
                    notifyClassNames: 'top right',
                    type: 'info',
                    removeAfter: 4000
                  }), copyToClipboard('ni ni-delivery-fast');
                }}>
                <div>
                  <i class="ni ni-delivery-fast" />
                  <span>delivery-fast</span>
                </div>
              </button>
            </div>
            <div class="col-lg-3 col-md-6">
              <button
                type="button"
                class="btn-icon-clipboard"
                on:click={() => {
                  addNotification({
                    id: generateId(),
                    text: 'Copied to clipboard',
                    position: 'top-right',
                    notifyClassNames: 'top right',
                    type: 'info',
                    removeAfter: 4000
                  }), copyToClipboard('ni ni-diamond');
                }}>
                <div>
                  <i class="ni ni-diamond" />
                  <span>diamond</span>
                </div>
              </button>
            </div>
            <div class="col-lg-3 col-md-6">
              <button
                type="button"
                class="btn-icon-clipboard"
                on:click={() => {
                  addNotification({
                    id: generateId(),
                    text: 'Copied to clipboard',
                    position: 'top-right',
                    notifyClassNames: 'top right',
                    type: 'info',
                    removeAfter: 4000
                  }), copyToClipboard('ni ni-email-83');
                }}>
                <div>
                  <i class="ni ni-email-83" />
                  <span>email-83</span>
                </div>
              </button>
            </div>
            <div class="col-lg-3 col-md-6">
              <button
                type="button"
                class="btn-icon-clipboard"
                on:click={() => {
                  addNotification({
                    id: generateId(),
                    text: 'Copied to clipboard',
                    position: 'top-right',
                    notifyClassNames: 'top right',
                    type: 'info',
                    removeAfter: 4000
                  }), copyToClipboard('ni ni-fat-add');
                }}>
                <div>
                  <i class="ni ni-fat-add" />
                  <span>fat-add</span>
                </div>
              </button>
            </div>
            <div class="col-lg-3 col-md-6">
              <button
                type="button"
                class="btn-icon-clipboard"
                on:click={() => {
                  addNotification({
                    id: generateId(),
                    text: 'Copied to clipboard',
                    position: 'top-right',
                    notifyClassNames: 'top right',
                    type: 'info',
                    removeAfter: 4000
                  }), copyToClipboard('ni ni-fat-delete');
                }}>
                <div>
                  <i class="ni ni-fat-delete" />
                  <span>fat-delete</span>
                </div>
              </button>
            </div>
            <div class="col-lg-3 col-md-6">
              <button
                type="button"
                class="btn-icon-clipboard"
                on:click={() => {
                  addNotification({
                    id: generateId(),
                    text: 'Copied to clipboard',
                    position: 'top-right',
                    notifyClassNames: 'top right',
                    type: 'info',
                    removeAfter: 4000
                  }), copyToClipboard('ni ni-fat-remove');
                }}>
                <div>
                  <i class="ni ni-fat-remove" />
                  <span>fat-remove</span>
                </div>
              </button>
            </div>
            <div class="col-lg-3 col-md-6">
              <button
                type="button"
                class="btn-icon-clipboard"
                on:click={() => {
                  addNotification({
                    id: generateId(),
                    text: 'Copied to clipboard',
                    position: 'top-right',
                    notifyClassNames: 'top right',
                    type: 'info',
                    removeAfter: 4000
                  }), copyToClipboard('ni ni-favourite-28');
                }}>
                <div>
                  <i class="ni ni-favourite-28" />
                  <span>favourite-28</span>
                </div>
              </button>
            </div>
            <div class="col-lg-3 col-md-6">
              <button
                type="button"
                class="btn-icon-clipboard"
                on:click={() => {
                  addNotification({
                    id: generateId(),
                    text: 'Copied to clipboard',
                    position: 'top-right',
                    notifyClassNames: 'top right',
                    type: 'info',
                    removeAfter: 4000
                  }), copyToClipboard('ni ni-folder-17');
                }}>
                <div>
                  <i class="ni ni-folder-17" />
                  <span>folder-17</span>
                </div>
              </button>
            </div>
            <div class="col-lg-3 col-md-6">
              <button
                type="button"
                class="btn-icon-clipboard"
                on:click={() => {
                  addNotification({
                    id: generateId(),
                    text: 'Copied to clipboard',
                    position: 'top-right',
                    notifyClassNames: 'top right',
                    type: 'info',
                    removeAfter: 4000
                  }), copyToClipboard('ni ni-glasses-2');
                }}>
                <div>
                  <i class="ni ni-glasses-2" />
                  <span>glasses-2</span>
                </div>
              </button>
            </div>
            <div class="col-lg-3 col-md-6">
              <button
                type="button"
                class="btn-icon-clipboard"
                on:click={() => {
                  addNotification({
                    id: generateId(),
                    text: 'Copied to clipboard',
                    position: 'top-right',
                    notifyClassNames: 'top right',
                    type: 'info',
                    removeAfter: 4000
                  }), copyToClipboard('ni ni-hat-3');
                }}>
                <div>
                  <i class="ni ni-hat-3" />
                  <span>hat-3</span>
                </div>
              </button>
            </div>
            <div class="col-lg-3 col-md-6">
              <button
                type="button"
                class="btn-icon-clipboard"
                on:click={() => {
                  addNotification({
                    id: generateId(),
                    text: 'Copied to clipboard',
                    position: 'top-right',
                    notifyClassNames: 'top right',
                    type: 'info',
                    removeAfter: 4000
                  }), copyToClipboard('ni ni-headphones');
                }}>
                <div>
                  <i class="ni ni-headphones" />
                  <span>headphones</span>
                </div>
              </button>
            </div>
            <div class="col-lg-3 col-md-6">
              <button
                type="button"
                class="btn-icon-clipboard"
                on:click={() => {
                  addNotification({
                    id: generateId(),
                    text: 'Copied to clipboard',
                    position: 'top-right',
                    notifyClassNames: 'top right',
                    type: 'info',
                    removeAfter: 4000
                  }), copyToClipboard('ni ni-html5');
                }}>
                <div>
                  <i class="ni ni-html5" />
                  <span>html5</span>
                </div>
              </button>
            </div>
            <div class="col-lg-3 col-md-6">
              <button
                type="button"
                class="btn-icon-clipboard"
                on:click={() => {
                  addNotification({
                    id: generateId(),
                    text: 'Copied to clipboard',
                    position: 'top-right',
                    notifyClassNames: 'top right',
                    type: 'info',
                    removeAfter: 4000
                  }), copyToClipboard('ni ni-istanbul');
                }}>
                <div>
                  <i class="ni ni-istanbul" />
                  <span>istanbul</span>
                </div>
              </button>
            </div>
            <div class="col-lg-3 col-md-6">
              <button
                type="button"
                class="btn-icon-clipboard"
                on:click={() => {
                  addNotification({
                    id: generateId(),
                    text: 'Copied to clipboard',
                    position: 'top-right',
                    notifyClassNames: 'top right',
                    type: 'info',
                    removeAfter: 4000
                  }), copyToClipboard('ni ni-circle-08');
                }}>
                <div>
                  <i class="ni ni-circle-08" />
                  <span>circle-08</span>
                </div>
              </button>
            </div>
            <div class="col-lg-3 col-md-6">
              <button
                type="button"
                class="btn-icon-clipboard"
                on:click={() => {
                  addNotification({
                    id: generateId(),
                    text: 'Copied to clipboard',
                    position: 'top-right',
                    notifyClassNames: 'top right',
                    type: 'info',
                    removeAfter: 4000
                  }), copyToClipboard('ni ni-key-25');
                }}>
                <div>
                  <i class="ni ni-key-25" />
                  <span>key-25</span>
                </div>
              </button>
            </div>
            <div class="col-lg-3 col-md-6">
              <button
                type="button"
                class="btn-icon-clipboard"
                on:click={() => {
                  addNotification({
                    id: generateId(),
                    text: 'Copied to clipboard',
                    position: 'top-right',
                    notifyClassNames: 'top right',
                    type: 'info',
                    removeAfter: 4000
                  }), copyToClipboard('ni ni-laptop');
                }}>
                <div>
                  <i class="ni ni-laptop" />
                  <span>laptop</span>
                </div>
              </button>
            </div>
            <div class="col-lg-3 col-md-6">
              <button
                type="button"
                class="btn-icon-clipboard"
                on:click={() => {
                  addNotification({
                    id: generateId(),
                    text: 'Copied to clipboard',
                    position: 'top-right',
                    notifyClassNames: 'top right',
                    type: 'info',
                    removeAfter: 4000
                  }), copyToClipboard('ni ni-like-2');
                }}>
                <div>
                  <i class="ni ni-like-2" />
                  <span>like-2</span>
                </div>
              </button>
            </div>
            <div class="col-lg-3 col-md-6">
              <button
                type="button"
                class="btn-icon-clipboard"
                on:click={() => {
                  addNotification({
                    id: generateId(),
                    text: 'Copied to clipboard',
                    position: 'top-right',
                    notifyClassNames: 'top right',
                    type: 'info',
                    removeAfter: 4000
                  }), copyToClipboard('ni ni-lock-circle-open');
                }}>
                <div>
                  <i class="ni ni-lock-circle-open" />
                  <span>lock-circle-open</span>
                </div>
              </button>
            </div>
            <div class="col-lg-3 col-md-6">
              <button
                type="button"
                class="btn-icon-clipboard"
                on:click={() => {
                  addNotification({
                    id: generateId(),
                    text: 'Copied to clipboard',
                    position: 'top-right',
                    notifyClassNames: 'top right',
                    type: 'info',
                    removeAfter: 4000
                  }), copyToClipboard('ni ni-map-big');
                }}>
                <div>
                  <i class="ni ni-map-big" />
                  <span>map-big</span>
                </div>
              </button>
            </div>
            <div class="col-lg-3 col-md-6">
              <button
                type="button"
                class="btn-icon-clipboard"
                on:click={() => {
                  addNotification({
                    id: generateId(),
                    text: 'Copied to clipboard',
                    position: 'top-right',
                    notifyClassNames: 'top right',
                    type: 'info',
                    removeAfter: 4000
                  }), copyToClipboard('ni ni-mobile-button');
                }}>
                <div>
                  <i class="ni ni-mobile-button" />
                  <span>mobile-button</span>
                </div>
              </button>
            </div>
            <div class="col-lg-3 col-md-6">
              <button
                type="button"
                class="btn-icon-clipboard"
                on:click={() => {
                  addNotification({
                    id: generateId(),
                    text: 'Copied to clipboard',
                    position: 'top-right',
                    notifyClassNames: 'top right',
                    type: 'info',
                    removeAfter: 4000
                  }), copyToClipboard('ni ni-money-coins');
                }}>
                <div>
                  <i class="ni ni-money-coins" />
                  <span>money-coins</span>
                </div>
              </button>
            </div>
            <div class="col-lg-3 col-md-6">
              <button
                type="button"
                class="btn-icon-clipboard"
                on:click={() => {
                  addNotification({
                    id: generateId(),
                    text: 'Copied to clipboard',
                    position: 'top-right',
                    notifyClassNames: 'top right',
                    type: 'info',
                    removeAfter: 4000
                  }), copyToClipboard('ni ni-note-03');
                }}>
                <div>
                  <i class="ni ni-note-03" />
                  <span>note-03</span>
                </div>
              </button>
            </div>
            <div class="col-lg-3 col-md-6">
              <button
                type="button"
                class="btn-icon-clipboard"
                on:click={() => {
                  addNotification({
                    id: generateId(),
                    text: 'Copied to clipboard',
                    position: 'top-right',
                    notifyClassNames: 'top right',
                    type: 'info',
                    removeAfter: 4000
                  }), copyToClipboard('ni ni-notification-70');
                }}>
                <div>
                  <i class="ni ni-notification-70" />
                  <span>notification-70</span>
                </div>
              </button>
            </div>
            <div class="col-lg-3 col-md-6">
              <button
                type="button"
                class="btn-icon-clipboard"
                on:click={() => {
                  addNotification({
                    id: generateId(),
                    text: 'Copied to clipboard',
                    position: 'top-right',
                    notifyClassNames: 'top right',
                    type: 'info',
                    removeAfter: 4000
                  }), copyToClipboard('ni ni-palette');
                }}>
                <div>
                  <i class="ni ni-palette" />
                  <span>palette</span>
                </div>
              </button>
            </div>
            <div class="col-lg-3 col-md-6">
              <button
                type="button"
                class="btn-icon-clipboard"
                on:click={() => {
                  addNotification({
                    id: generateId(),
                    text: 'Copied to clipboard',
                    position: 'top-right',
                    notifyClassNames: 'top right',
                    type: 'info',
                    removeAfter: 4000
                  }), copyToClipboard('ni ni-paper-diploma');
                }}>
                <div>
                  <i class="ni ni-paper-diploma" />
                  <span>paper-diploma</span>
                </div>
              </button>
            </div>
            <div class="col-lg-3 col-md-6">
              <button
                type="button"
                class="btn-icon-clipboard"
                on:click={() => {
                  addNotification({
                    id: generateId(),
                    text: 'Copied to clipboard',
                    position: 'top-right',
                    notifyClassNames: 'top right',
                    type: 'info',
                    removeAfter: 4000
                  }), copyToClipboard('ni ni-pin-3');
                }}>
                <div>
                  <i class="ni ni-pin-3" />
                  <span>pin-3</span>
                </div>
              </button>
            </div>
            <div class="col-lg-3 col-md-6">
              <button
                type="button"
                class="btn-icon-clipboard"
                on:click={() => {
                  addNotification({
                    id: generateId(),
                    text: 'Copied to clipboard',
                    position: 'top-right',
                    notifyClassNames: 'top right',
                    type: 'info',
                    removeAfter: 4000
                  }), copyToClipboard('ni ni-planet');
                }}>
                <div>
                  <i class="ni ni-planet" />
                  <span>planet</span>
                </div>
              </button>
            </div>
            <div class="col-lg-3 col-md-6">
              <button
                type="button"
                class="btn-icon-clipboard"
                on:click={() => {
                  addNotification({
                    id: generateId(),
                    text: 'Copied to clipboard',
                    position: 'top-right',
                    notifyClassNames: 'top right',
                    type: 'info',
                    removeAfter: 4000
                  }), copyToClipboard('ni ni-ruler-pencil');
                }}>
                <div>
                  <i class="ni ni-ruler-pencil" />
                  <span>ruler-pencil</span>
                </div>
              </button>
            </div>
            <div class="col-lg-3 col-md-6">
              <button
                type="button"
                class="btn-icon-clipboard"
                on:click={() => {
                  addNotification({
                    id: generateId(),
                    text: 'Copied to clipboard',
                    position: 'top-right',
                    notifyClassNames: 'top right',
                    type: 'info',
                    removeAfter: 4000
                  }), copyToClipboard('ni ni-satisfied');
                }}>
                <div>
                  <i class="ni ni-satisfied" />
                  <span>satisfied</span>
                </div>
              </button>
            </div>
            <div class="col-lg-3 col-md-6">
              <button
                type="button"
                class="btn-icon-clipboard"
                on:click={() => {
                  addNotification({
                    id: generateId(),
                    text: 'Copied to clipboard',
                    position: 'top-right',
                    notifyClassNames: 'top right',
                    type: 'info',
                    removeAfter: 4000
                  }), copyToClipboard('ni ni-scissors');
                }}>
                <div>
                  <i class="ni ni-scissors" />
                  <span>scissors</span>
                </div>
              </button>
            </div>
            <div class="col-lg-3 col-md-6">
              <button
                type="button"
                class="btn-icon-clipboard"
                on:click={() => {
                  addNotification({
                    id: generateId(),
                    text: 'Copied to clipboard',
                    position: 'top-right',
                    notifyClassNames: 'top right',
                    type: 'info',
                    removeAfter: 4000
                  }), copyToClipboard('ni ni-send');
                }}>
                <div>
                  <i class="ni ni-send" />
                  <span>send</span>
                </div>
              </button>
            </div>
            <div class="col-lg-3 col-md-6">
              <button
                type="button"
                class="btn-icon-clipboard"
                on:click={() => {
                  addNotification({
                    id: generateId(),
                    text: 'Copied to clipboard',
                    position: 'top-right',
                    notifyClassNames: 'top right',
                    type: 'info',
                    removeAfter: 4000
                  }), copyToClipboard('ni ni-settings-gear-65');
                }}>
                <div>
                  <i class="ni ni-settings-gear-65" />
                  <span>settings-gear-65</span>
                </div>
              </button>
            </div>
            <div class="col-lg-3 col-md-6">
              <button
                type="button"
                class="btn-icon-clipboard"
                on:click={() => {
                  addNotification({
                    id: generateId(),
                    text: 'Copied to clipboard',
                    position: 'top-right',
                    notifyClassNames: 'top right',
                    type: 'info',
                    removeAfter: 4000
                  }), copyToClipboard('ni ni-settings');
                }}>
                <div>
                  <i class="ni ni-settings" />
                  <span>settings</span>
                </div>
              </button>
            </div>
            <div class="col-lg-3 col-md-6">
              <button
                type="button"
                class="btn-icon-clipboard"
                on:click={() => {
                  addNotification({
                    id: generateId(),
                    text: 'Copied to clipboard',
                    position: 'top-right',
                    notifyClassNames: 'top right',
                    type: 'info',
                    removeAfter: 4000
                  }), copyToClipboard('ni ni-single-02');
                }}>
                <div>
                  <i class="ni ni-single-02" />
                  <span>single-02</span>
                </div>
              </button>
            </div>
            <div class="col-lg-3 col-md-6">
              <button
                type="button"
                class="btn-icon-clipboard"
                on:click={() => {
                  addNotification({
                    id: generateId(),
                    text: 'Copied to clipboard',
                    position: 'top-right',
                    notifyClassNames: 'top right',
                    type: 'info',
                    removeAfter: 4000
                  }), copyToClipboard('ni ni-single-copy-04');
                }}>
                <div>
                  <i class="ni ni-single-copy-04" />
                  <span>single-copy-04</span>
                </div>
              </button>
            </div>
            <div class="col-lg-3 col-md-6">
              <button
                type="button"
                class="btn-icon-clipboard"
                on:click={() => {
                  addNotification({
                    id: generateId(),
                    text: 'Copied to clipboard',
                    position: 'top-right',
                    notifyClassNames: 'top right',
                    type: 'info',
                    removeAfter: 4000
                  }), copyToClipboard('ni ni-sound-wave');
                }}>
                <div>
                  <i class="ni ni-sound-wave" />
                  <span>sound-wave</span>
                </div>
              </button>
            </div>
            <div class="col-lg-3 col-md-6">
              <button
                type="button"
                class="btn-icon-clipboard"
                on:click={() => {
                  addNotification({
                    id: generateId(),
                    text: 'Copied to clipboard',
                    position: 'top-right',
                    notifyClassNames: 'top right',
                    type: 'info',
                    removeAfter: 4000
                  }), copyToClipboard('ni ni-spaceship');
                }}>
                <div>
                  <i class="ni ni-spaceship" />
                  <span>spaceship</span>
                </div>
              </button>
            </div>
            <div class="col-lg-3 col-md-6">
              <button
                type="button"
                class="btn-icon-clipboard"
                on:click={() => {
                  addNotification({
                    id: generateId(),
                    text: 'Copied to clipboard',
                    position: 'top-right',
                    notifyClassNames: 'top right',
                    type: 'info',
                    removeAfter: 4000
                  }), copyToClipboard('ni ni-square-pin');
                }}>
                <div>
                  <i class="ni ni-square-pin" />
                  <span>square-pin</span>
                </div>
              </button>
            </div>
            <div class="col-lg-3 col-md-6">
              <button
                type="button"
                class="btn-icon-clipboard"
                on:click={() => {
                  addNotification({
                    id: generateId(),
                    text: 'Copied to clipboard',
                    position: 'top-right',
                    notifyClassNames: 'top right',
                    type: 'info',
                    removeAfter: 4000
                  }), copyToClipboard('ni ni-support-16');
                }}>
                <div>
                  <i class="ni ni-support-16" />
                  <span>support-16</span>
                </div>
              </button>
            </div>
            <div class="col-lg-3 col-md-6">
              <button
                type="button"
                class="btn-icon-clipboard"
                on:click={() => {
                  addNotification({
                    id: generateId(),
                    text: 'Copied to clipboard',
                    position: 'top-right',
                    notifyClassNames: 'top right',
                    type: 'info',
                    removeAfter: 4000
                  }), copyToClipboard('ni ni-tablet-button');
                }}>
                <div>
                  <i class="ni ni-tablet-button" />
                  <span>tablet-button</span>
                </div>
              </button>
            </div>
            <div class="col-lg-3 col-md-6">
              <button
                type="button"
                class="btn-icon-clipboard"
                on:click={() => {
                  addNotification({
                    id: generateId(),
                    text: 'Copied to clipboard',
                    position: 'top-right',
                    notifyClassNames: 'top right',
                    type: 'info',
                    removeAfter: 4000
                  }), copyToClipboard('ni ni-tag');
                }}>
                <div>
                  <i class="ni ni-tag" />
                  <span>tag</span>
                </div>
              </button>
            </div>
            <div class="col-lg-3 col-md-6">
              <button
                type="button"
                class="btn-icon-clipboard"
                on:click={() => {
                  addNotification({
                    id: generateId(),
                    text: 'Copied to clipboard',
                    position: 'top-right',
                    notifyClassNames: 'top right',
                    type: 'info',
                    removeAfter: 4000
                  }), copyToClipboard('ni ni-tie-bow');
                }}>
                <div>
                  <i class="ni ni-tie-bow" />
                  <span>tie-bow</span>
                </div>
              </button>
            </div>
            <div class="col-lg-3 col-md-6">
              <button
                type="button"
                class="btn-icon-clipboard"
                on:click={() => {
                  addNotification({
                    id: generateId(),
                    text: 'Copied to clipboard',
                    position: 'top-right',
                    notifyClassNames: 'top right',
                    type: 'info',
                    removeAfter: 4000
                  }), copyToClipboard('ni ni-time-alarm');
                }}>
                <div>
                  <i class="ni ni-time-alarm" />
                  <span>time-alarm</span>
                </div>
              </button>
            </div>
            <div class="col-lg-3 col-md-6">
              <button
                type="button"
                class="btn-icon-clipboard"
                on:click={() => {
                  addNotification({
                    id: generateId(),
                    text: 'Copied to clipboard',
                    position: 'top-right',
                    notifyClassNames: 'top right',
                    type: 'info',
                    removeAfter: 4000
                  }), copyToClipboard('ni ni-trophy');
                }}>
                <div>
                  <i class="ni ni-trophy" />
                  <span>trophy</span>
                </div>
              </button>
            </div>
            <div class="col-lg-3 col-md-6">
              <button
                type="button"
                class="btn-icon-clipboard"
                on:click={() => {
                  addNotification({
                    id: generateId(),
                    text: 'Copied to clipboard',
                    position: 'top-right',
                    notifyClassNames: 'top right',
                    type: 'info',
                    removeAfter: 4000
                  }), copyToClipboard('ni ni-tv-2');
                }}>
                <div>
                  <i class="ni ni-tv-2" />
                  <span>tv-2</span>
                </div>
              </button>
            </div>
            <div class="col-lg-3 col-md-6">
              <button
                type="button"
                class="btn-icon-clipboard"
                on:click={() => {
                  addNotification({
                    id: generateId(),
                    text: 'Copied to clipboard',
                    position: 'top-right',
                    notifyClassNames: 'top right',
                    type: 'info',
                    removeAfter: 4000
                  }), copyToClipboard('ni ni-umbrella-13');
                }}>
                <div>
                  <i class="ni ni-umbrella-13" />
                  <span>umbrella-13</span>
                </div>
              </button>
            </div>
            <div class="col-lg-3 col-md-6">
              <button
                type="button"
                class="btn-icon-clipboard"
                on:click={() => {
                  addNotification({
                    id: generateId(),
                    text: 'Copied to clipboard',
                    position: 'top-right',
                    notifyClassNames: 'top right',
                    type: 'info',
                    removeAfter: 4000
                  }), copyToClipboard('ni ni-user-run');
                }}>
                <div>
                  <i class="ni ni-user-run" />
                  <span>user-run</span>
                </div>
              </button>
            </div>
            <div class="col-lg-3 col-md-6">
              <button
                type="button"
                class="btn-icon-clipboard"
                on:click={() => {
                  addNotification({
                    id: generateId(),
                    text: 'Copied to clipboard',
                    position: 'top-right',
                    notifyClassNames: 'top right',
                    type: 'info',
                    removeAfter: 4000
                  }), copyToClipboard('ni ni-vector');
                }}>
                <div>
                  <i class="ni ni-vector" />
                  <span>vector</span>
                </div>
              </button>
            </div>
            <div class="col-lg-3 col-md-6">
              <button
                type="button"
                class="btn-icon-clipboard"
                on:click={() => {
                  addNotification({
                    id: generateId(),
                    text: 'Copied to clipboard',
                    position: 'top-right',
                    notifyClassNames: 'top right',
                    type: 'info',
                    removeAfter: 4000
                  }), copyToClipboard('ni ni-watch-time');
                }}>
                <div>
                  <i class="ni ni-watch-time" />
                  <span>watch-time</span>
                </div>
              </button>
            </div>
            <div class="col-lg-3 col-md-6">
              <button
                type="button"
                class="btn-icon-clipboard"
                on:click={() => {
                  addNotification({
                    id: generateId(),
                    text: 'Copied to clipboard',
                    position: 'top-right',
                    notifyClassNames: 'top right',
                    type: 'info',
                    removeAfter: 4000
                  }), copyToClipboard('ni ni-world');
                }}>
                <div>
                  <i class="ni ni-world" />
                  <span>world</span>
                </div>
              </button>
            </div>
            <div class="col-lg-3 col-md-6">
              <button
                type="button"
                class="btn-icon-clipboard"
                on:click={() => {
                  addNotification({
                    id: generateId(),
                    text: 'Copied to clipboard',
                    position: 'top-right',
                    notifyClassNames: 'top right',
                    type: 'info',
                    removeAfter: 4000
                  }), copyToClipboard('ni ni-zoom-split-in');
                }}>
                <div>
                  <i class="ni ni-zoom-split-in" />
                  <span>zoom-split-in</span>
                </div>
              </button>
            </div>
            <div class="col-lg-3 col-md-6">
              <button
                type="button"
                class="btn-icon-clipboard"
                on:click={() => {
                  addNotification({
                    id: generateId(),
                    text: 'Copied to clipboard',
                    position: 'top-right',
                    notifyClassNames: 'top right',
                    type: 'info',
                    removeAfter: 4000
                  }), copyToClipboard('ni ni-collection');
                }}>
                <div>
                  <i class="ni ni-collection" />
                  <span>collection</span>
                </div>
              </button>
            </div>
            <div class="col-lg-3 col-md-6">
              <button
                type="button"
                class="btn-icon-clipboard"
                on:click={() => {
                  addNotification({
                    id: generateId(),
                    text: 'Copied to clipboard',
                    position: 'top-right',
                    notifyClassNames: 'top right',
                    type: 'info',
                    removeAfter: 4000
                  }), copyToClipboard('ni ni-image');
                }}>
                <div>
                  <i class="ni ni-image" />
                  <span>image</span>
                </div>
              </button>
            </div>
            <div class="col-lg-3 col-md-6">
              <button
                type="button"
                class="btn-icon-clipboard"
                on:click={() => {
                  addNotification({
                    id: generateId(),
                    text: 'Copied to clipboard',
                    position: 'top-right',
                    notifyClassNames: 'top right',
                    type: 'info',
                    removeAfter: 4000
                  }), copyToClipboard('ni ni-shop');
                }}>
                <div>
                  <i class="ni ni-shop" />
                  <span>shop</span>
                </div>
              </button>
            </div>
            <div class="col-lg-3 col-md-6">
              <button
                type="button"
                class="btn-icon-clipboard"
                on:click={() => {
                  addNotification({
                    id: generateId(),
                    text: 'Copied to clipboard',
                    position: 'top-right',
                    notifyClassNames: 'top right',
                    type: 'info',
                    removeAfter: 4000
                  }), copyToClipboard('ni ni-ungroup');
                }}>
                <div>
                  <i class="ni ni-ungroup" />
                  <span>ungroup</span>
                </div>
              </button>
            </div>
            <div class="col-lg-3 col-md-6">
              <button
                type="button"
                class="btn-icon-clipboard"
                on:click={() => {
                  addNotification({
                    id: generateId(),
                    text: 'Copied to clipboard',
                    position: 'top-right',
                    notifyClassNames: 'top right',
                    type: 'info',
                    removeAfter: 4000
                  }), copyToClipboard('ni ni-world-2');
                }}>
                <div>
                  <i class="ni ni-world-2" />
                  <span>world-2</span>
                </div>
              </button>
            </div>
            <div class="col-lg-3 col-md-6">
              <button
                type="button"
                class="btn-icon-clipboard"
                on:click={() => {
                  addNotification({
                    id: generateId(),
                    text: 'Copied to clipboard',
                    position: 'top-right',
                    notifyClassNames: 'top right',
                    type: 'info',
                    removeAfter: 4000
                  }), copyToClipboard('ni ni-ui-04');
                }}>
                <div>
                  <i class="ni ni-ui-04" />
                  <span>ui-04</span>
                </div>
              </button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  </div>
</div>
