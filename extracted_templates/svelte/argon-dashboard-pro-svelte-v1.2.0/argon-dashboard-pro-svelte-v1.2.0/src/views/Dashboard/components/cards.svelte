<script>
  import BaseHeader from "../../../components/BaseHeader.svelte";
  import RouteBreadcrumb from "../../../components/Breadcrumb/RouteBreadcrumb.svelte";
  import BaseButton from "../../../components/BaseButton.svelte";
  import Card from "../../../components/Cards/Card.svelte";
  import StatsCard from "../../../components/Cards/StatsCard.svelte";
  export let name = "Cards";
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

    <!-- Card stats -->
    <div class="row">
      <div class="col-xl-3 col-md-6">
        <StatsCard
          title="Total traffic"
          type="gradient-red"
          subTitle="350,897"
          icon="ni ni-active-40">
          <div slot="footer">
            <span class="text-success mr-2">
              <i class="fa fa-arrow-up" />
              3.48%
            </span>
            <span class="text-nowrap">Since last month</span>
          </div>
        </StatsCard>
      </div>
      <div class="col-xl-3 col-md-6">
        <StatsCard
          title="Total traffic"
          type="gradient-orange"
          subTitle="2,356"
          icon="ni ni-chart-pie-35">
          <div slot="footer">
            <span class="text-success mr-2">
              <i class="fa fa-arrow-up" />
              12.18%
            </span>
            <span class="text-nowrap">Since last month</span>
          </div>
        </StatsCard>
      </div>
      <div class="col-xl-3 col-md-6">
        <StatsCard
          title="Sales"
          type="gradient-green"
          subTitle="924"
          icon="ni ni-money-coins">
          <div slot="footer">
            <span class="text-danger mr-2">
              <i class="fa fa-arrow-down" />
              5.72%
            </span>
            <span class="text-nowrap">Since last month</span>
          </div>
        </StatsCard>
      </div>
      <div class="col-xl-3 col-md-6">
        <StatsCard
          title="Performance"
          type="gradient-info"
          subTitle="49,65%"
          icon="ni ni-chart-bar-32">
          <div slot="footer">
            <span class="text-success mr-2">
              <i class="fa fa-arrow-up" />
              54.8%
            </span>
            <span class="text-nowrap">Since last month</span>
          </div>
        </StatsCard>
      </div>
    </div>
  </BaseHeader>

  <div class="container-fluid mt--6">
    <div class="row card-wrapper">
      <div class="col-lg-4">
        <!-- Basic with list group -->
        <Card
          noBody
          imgTop
          imgSrc="../../img/theme/img-1-1000x600.jpg"
          alt="Image placeholder">
          <!-- Card image -->
          <!-- List group -->
          <div class="list-group list-group-flush">
            <div class="list-group-item">Cras justo odio</div>
            <div class="list-group-item">Dapibus ac facilisis in</div>
            <div class="list-group-item">Vestibulum at eros</div>
          </div>
          <!-- Card body -->
          <div class="card-body">
            <h3 class="card-title mb-4">Card title</h3>
            <p class="card-text mb-4">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Facilis
              non dolore est fuga nobis ipsum illum eligendi nemo iure repellat,
              soluta, optio minus ut reiciendis voluptates enim impedit
              veritatis officiis.
            </p>
            <BaseButton type="primary">Go somewhere</BaseButton>
          </div>
        </Card>
        <!-- Basic with card title -->
        <Card>
          <!-- Card body -->
          <h3 class="card-title mb-3">Card title</h3>
          <p class="card-text">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Facilis
            non dolore est fuga nobis ipsum illum eligendi nemo iure repellat,
            soluta, optio minus ut reiciendis voluptates enim impedit veritatis
            officiis.
          </p>
          <BaseButton type="primary">Go somewhere</BaseButton>
        </Card>

        <!--Profile card-->
        <Card
          noBody
          imgSrc="../../img/theme/img-1-1000x600.jpg"
          alt="Image placeholder"
          imgTop
          className="card-profile">
          <div class="row justify-content-center">
            <div class="col-lg-3 order-lg-2">
              <div class="card-profile-image">
                <a href="/cards">
                  <img
                    src="../../img/theme/team-4.jpg"
                    class="rounded-circle"
                    alt="Image placeholder" />
                </a>
              </div>
            </div>
          </div>
          <div
            class="card-header text-center border-0 pt-8 pt-md-4 pb-0 pb-md-4">
            <div class="d-flex justify-content-between">
              <BaseButton type="info" size="sm" className="mr-4">
                Connect
              </BaseButton>
              <BaseButton type="default" size="sm" className="float-right">
                Message
              </BaseButton>
            </div>
          </div>
          <div class="card-body pt-0">
            <div class="row">
              <div class="col">
                <div class="card-profile-stats d-flex justify-content-center">
                  <div>
                    <span class="heading">22</span>
                    <span class="description">Friends</span>
                  </div>
                  <div>
                    <span class="heading">10</span>
                    <span class="description">Photos</span>
                  </div>
                  <div>
                    <span class="heading">89</span>
                    <span class="description">Comments</span>
                  </div>
                </div>
              </div>
            </div>
            <div class="text-center">
              <h5 class="h3">
                Jessica Jones
                <span class="font-weight-light">, 27</span>
              </h5>
              <div class="h5 font-weight-300">
                <i class="ni location_pin mr-2" />
                Bucharest, Romania
              </div>
            </div>
          </div>
        </Card>
      </div>

      <div class="col-lg-4">
        <!-- Basic with card header -->
        <Card>
          <!-- Card header -->
          <h5 slot="header" class="h3 mb-0">Card title</h5>
          <!-- Card body -->
          <p class="card-text mb-4">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Facilis
            non dolore est fuga nobis ipsum illum eligendi nemo iure repellat,
            soluta, optio minus ut reiciendis voluptates enim impedit veritatis
            officiis.
          </p>
          <BaseButton type="primary" className="btn btn-primary">
            Go somewhere
          </BaseButton>
        </Card>

        <!-- Contact card -->
        <Card>
          <!-- Card body -->
          <div class="row align-items-center">
            <div class="col-md-auto">
              <!-- Avatar -->
              <a href="/cards" class="avatar avatar-xl rounded-circle">
                <img alt="Image placeholder" src="../../img/theme/team-2.jpg" />
              </a>
            </div>
            <div class="col ml--2">
              <h4 class="mb-0">
                <a href="#!">John Snow</a>
              </h4>
              <p class="text-sm text-muted mb-0">Working remoteley</p>
              <span class="text-success">●</span>
              <small>Active</small>
            </div>
            <div class="col-md-auto">
              <BaseButton type="primary" size="sm">Add</BaseButton>
            </div>
          </div>
        </Card>

        <!-- Team member card -->
        <Card>
          <!-- Card body -->
          <a href="#!">
            <img
              src="../../img/theme/team-1.jpg"
              alt="Image placeholder"
              class="img-fluid rounded-circle img-center shadow shadow-lg--hover"
              style="width: 140px;" />
          </a>
          <div class="pt-4 text-center">
            <h5 class="h3 title">
              <span class="d-block mb-1">Ryan Tompson</span>
              <small class="h4 font-weight-light text-muted">
                Web Developer
              </small>
            </h5>
            <div class="mt-3">
              <a
                href="/cards"
                class="btn btn-twitter btn-icon-only rounded-circle">
                <i class="fab fa-twitter" />
              </a>
              <a
                href="/cards"
                class="btn btn-facebook btn-icon-only rounded-circle">
                <i class="fab fa-facebook" />
              </a>
              <a
                href="/cards"
                class="btn btn-dribbble btn-icon-only rounded-circle">
                <i class="fab fa-dribbble" />
              </a>
            </div>
          </div>
        </Card>
        <!-- Image-Text card -->
        <!-- Card image -->
        <Card
          noBody
          imgSrc="../../img/theme/img-1-1000x900.jpg"
          alt="Image placeholder"
          imgTop>
          <!-- Card body -->
          <div class="card-body">
            <h5 class="card-title h2 mb-0">Get started with Argon</h5>
            <small class="text-muted">
              by John Snow on Oct 29th at 10:23 AM
            </small>
            <p class="card-text mt-4">
              Argon is a great free UI package based on Bootstrap 4 that
              includes the most important components and features.
            </p>
            <a href="/cards" class="btn btn-link px-0">View article</a>
          </div>
        </Card>

        <!-- Basic with blockquote -->
        <Card gradient="default">
          <h3 class="text-white card-title">Testimonial</h3>
          <blockquote class="blockquote text-white mb-0">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
              posuere erat a ante.
            </p>
            <footer class="blockquote-footer text-danger">
              Someone famous in
              <cite title="Source Title">Source Title</cite>
            </footer>
          </blockquote>
        </Card>
      </div>

      <div class="col-lg-4">
        <!-- Pricing -->
        <Card
          gradient="success"
          headerClasses="bg-transparent"
          footerClasses="bg-transparent"
          bodyClasses="px-lg-7"
          className="card-pricing border-0 text-center mb-4">
          <!--Header-->
          <h4 slot="header" class="text-uppercase ls-1 text-white py-3 mb-0">
            Bravo pack
          </h4>
          <!--Card Body-->
          <div class="display-2 text-white">$49</div>
          <span class=" text-white">per application</span>
          <ul class="list-unstyled my-4">
            <li>
              <div class="d-flex align-items-center">
                <div>
                  <div
                    class="icon icon-xs icon-shape bg-white shadow
                    rounded-circle">
                    <i class="fas fa-terminal" />
                  </div>
                </div>
                <div>
                  <span class="pl-2 text-sm text-white">
                    Complete documentation
                  </span>
                </div>
              </div>
            </li>
            <li>
              <div class="d-flex align-items-center">
                <div>
                  <div
                    class="icon icon-xs icon-shape bg-white shadow
                    rounded-circle">
                    <i class="fas fa-pen-fancy" />
                  </div>
                </div>
                <div>
                  <span class="pl-2 text-sm text-white">
                    Working materials in Sketch
                  </span>
                </div>
              </div>
            </li>
            <li>
              <div class="d-flex align-items-center">
                <div>
                  <div
                    class="icon icon-xs icon-shape bg-white shadow
                    rounded-circle">
                    <i class="fas fa-hdd" />
                  </div>
                </div>
                <div>
                  <span class="pl-2 text-sm text-white">2GB cloud storage</span>
                </div>
              </div>
            </li>
          </ul>
          <BaseButton type="primary" className="mb-3">
            Start free trial
          </BaseButton>
          <!--Footer-->
          <a href="/cards" slot="footer" class="text-white">Request a demo</a>
        </Card>
        <!-- Basic with action button -->
        <Card>
          <!-- Card header -->
          <div class="row align-items-center" slot="header">
            <div class="col-8">
              <!-- Title -->
              <h5 class="h3 mb-0">Card title</h5>
            </div>
            <div class="col-4 text-right">
              <a href="/cards" class="btn btn-sm btn-neutral">Action</a>
            </div>
          </div>
          <!-- Card body -->
          <p class="card-text mb-4">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Facilis
            non dolore est fuga nobis ipsum illum eligendi nemo iure repellat,
            soluta, optio minus ut reiciendis voluptates enim impedit veritatis
            officiis.
          </p>
          <a href="/cards" class="btn btn-primary">Go somewhere</a>
        </Card>
        <!-- Image overlay -->
        <Card
          noBody
          imgSrc="../../img/theme/img-1-1000x600.jpg"
          alt="Card image"
          className="bg-dark text-white border-0">
          <div class="card-img-overlay d-flex align-items-center">
            <div>
              <h5 class="card-title h2 text-white mb-2">Card title</h5>
              <p class="card-text">
                This is a wider card with supporting text below as a natural
                lead-in to additional content. This content is a little bit
                longer.
              </p>
              <p class="card-text text-sm font-weight-bold">
                Last updated 3 mins ago
              </p>
            </div>
          </div>
        </Card>
        <!-- Pricing card -->
        <Card
          headerClasses="bg-transparent"
          bodyClasses="px-lg-7"
          className="card-pricing border-0 text-center mb-4">
          <!--Header-->
          <h4 slot="header" class="text-uppercase ls-1 text-primary py-3 mb-0">
            Bravo pack
          </h4>

          <!--Body-->
          <div class="display-2">$49</div>
          <span class=" text-muted">per application</span>
          <ul class="list-unstyled my-4">
            <li>
              <div class="d-flex align-items-center">
                <div>
                  <div
                    class="icon icon-xs icon-shape bg-gradient-primary
                    text-white shadow rounded-circle">
                    <i class="fas fa-terminal" />
                  </div>
                </div>
                <div>
                  <span class="pl-2 text-sm">Complete documentation</span>
                </div>
              </div>
            </li>
            <li>
              <div class="d-flex align-items-center">
                <div>
                  <div
                    class="icon icon-xs icon-shape bg-gradient-primary
                    text-white shadow rounded-circle">
                    <i class="fas fa-pen-fancy" />
                  </div>
                </div>
                <div>
                  <span class="pl-2 text-sm">Working materials in Sketch</span>
                </div>
              </div>
            </li>
            <li>
              <div class="d-flex align-items-center">
                <div>
                  <div
                    class="icon icon-xs icon-shape bg-gradient-primary
                    text-white shadow rounded-circle">
                    <i class="fas fa-hdd" />
                  </div>
                </div>
                <div>
                  <span class="pl-2 text-sm">2GB cloud storage</span>
                </div>
              </div>
            </li>
          </ul>
          <BaseButton type="primary" className="mb-3">
            Start free trial
          </BaseButton>
          <!--Footer-->
          <a href="/cards" class="text-muted" slot="footer">Request a demo</a>
        </Card>
      </div>
    </div>
  </div>

</div>
