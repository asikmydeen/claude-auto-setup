<script>
  import BaseHeader from "../../../components/BaseHeader.svelte";
  import RouteBreadcrumb from "../../../components/Breadcrumb/RouteBreadcrumb.svelte";
  import BaseButton from "../../../components/BaseButton.svelte";
  import Card from "../../../components/Cards/Card.svelte";
  export let name = "GridSystem";
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
</script>

<div transition:fade={{ duration: 250 }}>
  <div style="transform-origin: center top;">
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
          <!-- Grid system -->
          <Card className="card">
            <h3 slot="header" class="mb-0">Grid system</h3>
            <div class="row row-example">
              <div class="col-sm">One of three column</div>
              <div class="col-sm">One of three column</div>
              <div class="col-sm">One of three column</div>
            </div>
          </Card>
          <!-- Equal-width -->
          <Card>
            <h3 slot="header" class="mb-0">Equal-width</h3>
            <div class="row row-example">
              <div class="col">
                <span>1 of 2</span>
              </div>
              <div class="col">
                <span>2 of 2</span>
              </div>
            </div>
            <div class="row row-example">
              <div class="col">
                <span>1 of 3</span>
              </div>
              <div class="col">
                <span>2 of 3</span>
              </div>
              <div class="col">
                <span>3 of 3</span>
              </div>
            </div>
          </Card>
          <!-- Setting one column width -->
          <Card>
            <h3 slot="header" class="mb-0">Setting one column width</h3>

            <div class="row row-example">
              <div class="col">
                <span>1 of 3</span>
              </div>
              <div class="col-6">
                <span>2 of 3 (wider)</span>
              </div>
              <div class="col">
                <span>3 of 3</span>
              </div>
            </div>
            <div class="row row-example">
              <div class="col">
                <span>1 of 3</span>
              </div>
              <div class="col-5">
                <span>2 of 3 (wider)</span>
              </div>
              <div class="col">
                <span>3 of 3</span>
              </div>
            </div>
          </Card>
          <!-- Variable width content -->
          <Card noBody>
            <div class="card-header">
              <h3 class="mb-0">Variable width content</h3>
            </div>
            <div class="card-body">
              <div class="row row-example justify-content-md-center">
                <div class="col-lg-2">
                  <span>1 of 3</span>
                </div>
                <div class="col-md-auto">
                  <span>variable width content</span>
                </div>
                <div class="col-lg-2">
                  <span>3 of 3</span>
                </div>
              </div>
              <div class="row row-example">
                <div class="col">
                  <span>1 of 3</span>
                </div>
                <div class="col-md-auto">
                  <span>Variable width content</span>
                </div>
                <div class="col-lg-2">
                  <span>3 of 3</span>
                </div>
              </div>
            </div>
          </Card>
          <!-- Equal-width multi-row -->
          <Card>
            <h3 slot="header" class="mb-0">Equal-width multi-row</h3>

            <div class="row row-example">
              <div class="col">
                <span>col</span>
              </div>
              <div class="col">
                <span>col</span>
              </div>
              <div class="w-100" />
              <div class="col">
                <span>col</span>
              </div>
              <div class="col">
                <span>col</span>
              </div>
            </div>
          </Card>
          <!-- Mix and match -->
          <Card>
            <h3 slot="header" class="mb-0">Mix and match</h3>

            <!-- Stack the columns on mobile by making one full-width and the other half-width -->
            <div class="row row-example">
              <div class="col-12 col-md-8">
                <span>.col12 .col-md-8</span>
              </div>
              <div class="col-6 col-md-4">
                <span>.col-6 .col-md-4</span>
              </div>
            </div>
            <!-- Columns start at 50% wide on mobile and bump up to 33.3% wide on desktop -->
            <div class="row row-example">
              <div class="col-6 col-md-4">
                <span>.col-6 .col-md-4</span>
              </div>
              <div class="col-6 col-md-4">
                <span>.col-6 .col-md-4</span>
              </div>
              <div class="col-6 col-md-4">
                <span>.col-6 .col-md-4</span>
              </div>
            </div>
            <!-- Columns are always 50% wide, on mobile and desktop -->
            <div class="row row-example">
              <div class="col-6">
                <span>.col-6</span>
              </div>
              <div class="col-6">
                <span>.col-6</span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  </div>

</div>
