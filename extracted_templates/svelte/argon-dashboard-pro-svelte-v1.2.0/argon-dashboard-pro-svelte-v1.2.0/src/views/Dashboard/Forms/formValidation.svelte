<script>
  import CustomStylesValidation from "./FormValidation/CustomStylesValidation.svelte";
  import BrowserDefaultsValidations from "./FormValidation/BrowserDefaultsValidations.svelte";
  import ServerSideValidation from "./FormValidation/ServerSideValidation.svelte";
  import BaseHeader from "../../../components/BaseHeader.svelte";
  import RouteBreadcrumb from "../../../components/Breadcrumb/RouteBreadcrumb.svelte";
  import BaseButton from "../../../components/BaseButton.svelte";
  import { fade } from "svelte/transition";
  export let name = "Forms validation";
  import { onMount } from "svelte";
  onMount(function() {
    let topmenu = document.getElementsByTagName("nav").item(0);
    topmenu.classList.add("bg-success");
    topmenu.classList.add("navbar-dark");
    topmenu.classList.remove("navbar-light");
    let search = document.getElementsByTagName("form").item(0);
    search.classList.remove("navbar-search-dark");
    search.classList.add("navbar-search-light");
  });
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
        <BaseButton size="sm" type="neutral" className="mr-1">New</BaseButton>
        <BaseButton size="sm" type="neutral">Filters</BaseButton>
      </div>
    </div>
  </BaseHeader>
  <div class="container-fluid mt--6">
    <div class="row">
      <div class="col">
        <div class="card-wrapper">
          <CustomStylesValidation />
          <BrowserDefaultsValidations />
          <ServerSideValidation />
        </div>
      </div>
    </div>
  </div>
</div>
