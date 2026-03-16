<script>
  import BaseHeader from "../../../components/BaseHeader.svelte";
  import RouteBreadcrumb from "../../../components/Breadcrumb/RouteBreadcrumb.svelte";
  import BaseButton from "../../../components/BaseButton.svelte";
  import Card from "../../../components/Cards/Card.svelte";
  export let name = "Buttons";
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
      <div class="col-lg-8 card-wrapper ct-example">
        <!-- Styles -->
        <Card noBody className="card">
          <div slot="header">
            <h3 class="mb-0">Styles</h3>
          </div>
          <div class="card-body">
            <BaseButton icon type="primary">Button</BaseButton>
            <BaseButton icon type="primary">
              <span class="btn-inner--icon">
                <i class="ni ni-bag-17" />
              </span>
              <span class="btn-inner--text">With icon</span>
            </BaseButton>
            <BaseButton icon type="primary">
              <span class="btn-inner--icon">
                <i class="ni ni-atom" />
              </span>
            </BaseButton>
          </div>
        </Card>
        <!-- Colors -->
        <Card noBody className="card">
          <div slot="header">
            <h3 class="mb-0">Colors</h3>
          </div>
          <div class="card-body">
            <BaseButton type="default">Default</BaseButton>
            <BaseButton type="primary">Primary</BaseButton>
            <BaseButton type="secondary">Secondary</BaseButton>
            <BaseButton type="info">Info</BaseButton>
            <BaseButton type="success">Success</BaseButton>
            <BaseButton type="danger">Danger</BaseButton>
            <BaseButton type="warning">Warning</BaseButton>
          </div>
        </Card>
        <!-- Outline -->
        <Card noBody className="card">
          <div slot="header">
            <h3 class="mb-0">Outline</h3>
          </div>
          <div class="card-body">
            <BaseButton outline type="default">Default</BaseButton>
            <BaseButton outline type="primary">Primary</BaseButton>
            <BaseButton outline type="secondary">Secondary</BaseButton>
            <BaseButton outline type="info">Info</BaseButton>
            <BaseButton outline type="success">Success</BaseButton>
            <BaseButton outline type="danger">Danger</BaseButton>
            <BaseButton outline type="warning">Warning</BaseButton>
          </div>
        </Card>
        <!-- Sizes -->
        <Card noBody className="card">
          <div slot="header">
            <h3 class="mb-0">Sizes</h3>
          </div>
          <div class="card-body">
            <BaseButton size="lg" type="primary">Large button</BaseButton>
            <BaseButton size="lg" type="secondary">Large button</BaseButton>
            <hr />
            <BaseButton size="sm" type="primary">Small button</BaseButton>
            <BaseButton size="sm" type="secondary">Small button</BaseButton>
            <hr />
            <BaseButton block type="primary" className="mb-0">
              Block level button
            </BaseButton>
            <BaseButton block type="secondary">Block level button</BaseButton>
          </div>
        </Card>
        <!-- Group -->
        <Card noBody className="card">
          <div slot="header">
            <h3 class="mb-0">Group</h3>
          </div>
          <div class="card-body">
            <div class="btn-group" role="group" aria-label="Basic Example">
              <BaseButton type="secondary">Left</BaseButton>
              <BaseButton type="secondary" className="active">
                Middle
              </BaseButton>
              <BaseButton type="secondary">Right</BaseButton>
            </div>
            <hr />
            <div class="btn-group">
              <BaseButton type="info" className="active">1</BaseButton>
              <BaseButton type="info">2</BaseButton>
              <BaseButton type="info">3</BaseButton>
              <BaseButton type="info">4</BaseButton>
            </div>
            <div class="btn-group">
              <BaseButton type="default">5</BaseButton>
              <BaseButton type="default">6</BaseButton>
              <BaseButton type="default">7</BaseButton>
            </div>
          </div>
        </Card>
        <!-- Social -->
        <Card noBody className="card">
          <div slot="header">
            <h3 class="mb-0">Social</h3>
          </div>
          <div class="card-body">
            <BaseButton icon className="btn-facebook btn-icon">
              <span class="btn-inner--icon">
                <i class="fab fa-facebook" />
              </span>
              <span class="btn-inner--text">Facebook</span>
            </BaseButton>
            <BaseButton icon className="btn-twitter">
              <span class="btn-inner--icon">
                <i class="fab fa-twitter" />
              </span>
              <span class="btn-inner--text">Twitter</span>
            </BaseButton>
            <BaseButton icon className="btn-google-plus">
              <span class="btn-inner--icon">
                <i class="fab fa-google-plus-g" />
              </span>
              <span class="btn-inner--text">Google +</span>
            </BaseButton>
            <BaseButton icon className="btn-instagram">
              <span class="btn-inner--icon">
                <i class="fab fa-instagram" />
              </span>
              <span class="btn-inner--text">Instagram</span>
            </BaseButton>
            <BaseButton icon className="btn-pinterest">
              <span class="btn-inner--icon">
                <i class="fab fa-pinterest" />
              </span>
              <span class="btn-inner--text">Pinterest</span>
            </BaseButton>
            <BaseButton icon className="btn-youtube">
              <span class="btn-inner--icon">
                <i class="fab fa-youtube" />
              </span>
              <span class="btn-inner--text">Youtube</span>
            </BaseButton>
            <BaseButton icon className="btn-vimeo">
              <span class="btn-inner--icon">
                <i class="fab fa-vimeo-v" />
              </span>
              <span class="btn-inner--text">Vimeo</span>
            </BaseButton>
            <BaseButton icon className="btn-slack">
              <span class="btn-inner--icon">
                <i class="fab fa-slack" />
              </span>
              <span class="btn-inner--text">Slack</span>
            </BaseButton>
            <BaseButton icon className="btn-dribbbleb">
              <span class="btn-inner--icon">
                <i class="fab fa-dribbble" />
              </span>
              <span class="btn-inner--text">Dribbble</span>
            </BaseButton>
            <hr />
            <BaseButton className="btn-facebook btn-icon-only">
              <span class="btn-inner--icon">
                <i class="fab fa-facebook" />
              </span>
            </BaseButton>
            <BaseButton className="btn-twitter btn-icon-only">
              <span class="btn-inner--icon">
                <i class="fab fa-twitter" />
              </span>
            </BaseButton>
            <BaseButton className="btn-google-plus btn-icon-only">
              <span class="btn-inner--icon">
                <i class="fab fa-google-plus-g" />
              </span>
            </BaseButton>
            <BaseButton className="btn-instagram btn-icon-only">
              <span class="btn-inner--icon">
                <i class="fab fa-instagram" />
              </span>
            </BaseButton>
            <BaseButton className="btn-pinterest btn-icon-only">
              <span class="btn-inner--icon">
                <i class="fab fa-pinterest" />
              </span>
            </BaseButton>
            <BaseButton className="btn-youtube btn-icon-only">
              <span class="btn-inner--icon">
                <i class="fab fa-youtube" />
              </span>
            </BaseButton>
            <BaseButton className="btn-vimeo btn-icon-only">
              <span class="btn-inner--icon">
                <i class="fab fa-vimeo-v" />
              </span>
            </BaseButton>
            <BaseButton className="btn-slack btn-icon-only">
              <span class="btn-inner--icon">
                <i class="fab fa-slack" />
              </span>
            </BaseButton>
            <BaseButton className="btn-dribbble btn-icon-only">
              <span class="btn-inner--icon">
                <i class="fab fa-dribbble" />
              </span>
            </BaseButton>
            <hr />
            <BaseButton round className="btn-facebook btn-icon-only">
              <span class="btn-inner--icon">
                <i class="fab fa-facebook" />
              </span>
            </BaseButton>
            <BaseButton round className="btn-twitter btn-icon-only">
              <span class="btn-inner--icon">
                <i class="fab fa-twitter" />
              </span>
            </BaseButton>
            <BaseButton round className="btn-google-plus btn-icon-only">
              <span class="btn-inner--icon">
                <i class="fab fa-google-plus-g" />
              </span>
            </BaseButton>
            <BaseButton round className="btn-instagram btn-icon-only">
              <span class="btn-inner--icon">
                <i class="fab fa-instagram" />
              </span>
            </BaseButton>
            <BaseButton round className="btn-pinterest btn-icon-only">
              <span class="btn-inner--icon">
                <i class="fab fa-pinterest" />
              </span>
            </BaseButton>
            <BaseButton round className="btn-youtube btn-icon-only">
              <span class="btn-inner--icon">
                <i class="fab fa-youtube" />
              </span>
            </BaseButton>
            <BaseButton round className="btn-vimeo btn-icon-only">
              <span class="btn-inner--icon">
                <i class="fab fa-vimeo-v" />
              </span>
            </BaseButton>
            <BaseButton round className="btn-slack btn-icon-only">
              <span class="btn-inner--icon">
                <i class="fab fa-slack" />
              </span>
            </BaseButton>
            <BaseButton round className="btn-dribbble btn-icon-only">
              <span class="btn-inner--icon">
                <i class="fab fa-dribbble" />
              </span>
            </BaseButton>
          </div>
        </Card>
      </div>
    </div>
  </div>

</div>
