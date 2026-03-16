<script>
  import { fade } from "svelte/transition";
  import BaseHeader from "../../../components/BaseHeader.svelte";
  import RouteBreadcrumb from "../../../components/Breadcrumb/RouteBreadcrumb.svelte";
  import BaseButton from "../../../components/BaseButton.svelte";
  import Card from "../../../components/Cards/Card.svelte";
  import CheckboxColoredTable from "./RegularTables/CheckboxColoredTable.svelte";
  import CheckboxTable from "./RegularTables/CheckboxTable.svelte";
  import StripedTable from "./RegularTables/StripedTable.svelte";
  import InlineActionsTable from "./RegularTables/InlineActionsTable.svelte";
  import LightTable from "./RegularTables/LightTable.svelte";
  import TranslucentTable from "./RegularTables/TranslucentTables.svelte";
  import DarkTable from "./RegularTables/DarkTable.svelte";
  export let name = "Tables";
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
</script>

<div transition:fade={{ duration: 250 }}>
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
    <div class="row">
      <div class="col" />
    </div>
    <LightTable />
    <InlineActionsTable />
    <StripedTable />
    <CheckboxTable />
    <CheckboxColoredTable />
    <TranslucentTable />
    <DarkTable />
  </div>
</div>
