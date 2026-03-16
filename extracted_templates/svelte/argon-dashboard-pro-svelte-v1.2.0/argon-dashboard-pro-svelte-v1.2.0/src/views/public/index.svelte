<script>
  import Card from "../../Components/Cards/Card.svelte";
  import Badge from "../../components/Badge.svelte";
  import SvelteTooltip from "svelte-tooltip";
  document.body.classList = "";
  import { fade, scale } from "svelte/transition";
</script>

<div class="main-content" in:scale={{ y: 200, duration: 500 }} out:scale={{ y: 200, duration: 100 }}>
  <div style="">
    <div class="header bg-danger pt-7 pb-7">
      <div class="container">
        <div class="header-body">
          <div class="row align-items-center">
            <div class="col-lg-6">
              <div class="pr-5">
                <h1 class="display-2 text-white font-weight-bold mb-0">
                  Argon Dashboard PRO Svelte
                </h1>
                <h2 class="display-4 text-white font-weight-light">
                  A beautiful premium dashboard for Bootstrap 4.
                </h2>
                <p class="text-white mt-4">
                  Argon perfectly combines reusable HTML and modular CSS with a
                  modern styling and beautiful markup throughout each HTML
                  template in the pack.
                </p>
                <div class="mt-5">
                  <a href="/dashboard" class="btn btn-neutral my-2 mr-1">
                    Explore Dashboard
                  </a>
                  <a
                    href="https://www.creative-tim.com/product/argon-dashboard-pro-svelte"
                    class="btn btn-default my-2">
                    Purchase now
                  </a>
                </div>
              </div>
            </div>
            <div class="col-lg-6">
              <div class="row pt-5">
                <div class="col-md-6">
                  <Card noBody>
                    <div class="card-body">
                      <div
                        class="icon icon-shape bg-gradient-red text-white
                        rounded-circle shadow mb-4">
                        <i class="ni ni-active-40" />
                      </div>
                      <h5 class="h3">Components</h5>
                      <p>Argon comes with over 70 handcrafted components.</p>
                    </div>
                  </Card>
                  <Card noBody>
                    <div class="card-body">
                      <div
                        class="icon icon-shape bg-gradient-info text-white
                        rounded-circle shadow mb-4">
                        <i class="ni ni-active-40" />
                      </div>
                      <h5 class="h3">Plugins</h5>
                      <p>
                        Fully integrated and extendable third-party plugins that
                        you will love.
                      </p>
                    </div>
                  </Card>
                </div>
                <div class="pt-lg-5 pt-4 col-md-6">
                  <Card noBody className="mb-4">
                    <div class="card-body">
                      <div
                        class="icon icon-shape bg-gradient-success text-white
                        rounded-circle shadow mb-4">
                        <i class="ni ni-active-40" />
                      </div>
                      <h5 class="h3">Pages</h5>
                      <p>
                        From simple to complex, you get a beautiful set of 15+
                        page examples.
                      </p>
                    </div>
                  </Card>
                  <Card noBody className="mb-4">
                    <div class="card-body">
                      <div
                        class="icon icon-shape bg-gradient-warning text-white
                        rounded-circle shadow mb-4">
                        <i class="ni ni-active-40" />
                      </div>
                      <h5 class="h3">Documentation</h5>
                      <p>You will love how easy is to to work with Argon.</p>
                    </div>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="separator separator-bottom separator-skew zindex-100">
        <svg
          x="0"
          y="0"
          viewBox="0 0 2560 100"
          preserveAspectRatio="none"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg">
          <polygon points="2560 0 2560 100 0 100" class="fill-default" />
        </svg>
      </div>
    </div>
    <section class="py-6 pb-9 bg-default">
      <div class="row justify-content-center text-center">
        <div class="col-md-6">
          <h2 class="display-3 text-white">A complete HTML solution</h2>
          <p class="lead text-white">
            Argon is a completly new product built on our newest re-built from
            scratch framework structure that is meant to make our products more
            intuitive, more adaptive and, needless to say, so much easier to
            customize. Let Argon amaze you with its cool features and build
            tools and get your project to a whole new level.
          </p>
        </div>
      </div>
    </section>
    <section class="section section-lg pt-lg-0 mt--7">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-lg-12">
            <div class="row">
              <div class="col-lg-4">
                <Card noBody className="card-lift--hover shadow border-0">
                  <div class="card-body py-5">
                    <div
                      class="icon icon-shape bg-gradient-primary text-white
                      rounded-circle mb-4">
                      <i class="ni ni-check-bold" />
                    </div>
                    <h4 class="h3 text-primary text-uppercase">
                      Based on Bootstrap 4
                    </h4>
                    <p class="description mt-3">
                      Argon is built on top of the most popular open source
                      toolkit for developing with HTML, CSS, and JS.
                    </p>
                    <div>
                      <Badge pill={true} variant="primary">bootstrap 4</Badge>
                      <Badge pill={true} variant="primary">dashboard</Badge>
                      <Badge pill={true} variant="primary">template</Badge>
                    </div>
                  </div>
                </Card>
              </div>
              <div class="col-lg-4">
                <Card noBody className="card-lift--hover shadow border-0">
                  <div class="card-body py-5">
                    <div
                      class="icon icon-shape bg-gradient-success text-white
                      rounded-circle mb-4">
                      <i class="ni ni-istanbul" />
                    </div>
                    <h4 class="h3 text-success text-uppercase">
                      Integrated build tools
                    </h4>
                    <p class="description mt-3">
                      Use Argons's included npm and gulp scripts to compile
                      source code, run tests, and more with just a few simple
                      commands.
                    </p>
                    <div>
                      <Badge pill={true} variant="success">npm</Badge>
                      <Badge pill={true} variant="success">gulp</Badge>
                      <Badge pill={true} variant="success">build tools</Badge>
                    </div>
                  </div>
                </Card>
              </div>
              <div class="col-lg-4">
              <Card noBody className="card card-lift--hover shadow border-0">
                <div class="card-body py-5">
                  <div class="icon icon-shape bg-gradient-warning text-white rounded-circle mb-4">
                      <i class="ni ni-planet"></i>
                    </div>
                    <h4 class="h3 text-warning text-uppercase">FULL SASS SUPPORT</h4>
                    <p class="description mt-3">Argon makes customization easier than ever before. You get all the tools to make your website building process a breeze.</p>
                    <div>
                      <Badge pill={true} variant="warning">sass</Badge>
                      <Badge pill={true} variant="warning">design</Badge>
                      <Badge pill={true} variant="warning">customize</Badge>
                    </div>
                </div>
              </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="py-6">
      <div class="container">
        <div class="row row-grid align-items-center">
          <div class="order-md-2 col-md-6">
            <img alt="" src="img/theme/landing-1.png" class="img-fluid" />
          </div>
          <div class="order-md-1 col-md-6">
            <div class="pr-md-5">
              <h1>Awesome features</h1>
              <p>
                This dashboard comes with super cool features that are meant to
                help in the process. Handcrafted components, page examples and
                functional widgets are just a few things you will see and love
                at first sight.
              </p>
              <ul class="list-unstyled mt-5">
                <li class="py-2">
                  <div class="d-flex align-items-center">
                    <div>
                      <span
                        class="badge badge-circle mr-3 badge-success badge-pill">
                        <i class="ni ni-settings-gear-65" />
                      </span>
                    </div>
                    <div>
                      <h4 class="mb-0">Carefully crafted components</h4>
                    </div>
                  </div>
                </li>
                <li class="py-2">
                  <div class="d-flex align-items-center">
                    <div>
                      <span
                        class="badge badge-circle mr-3 badge-success badge-pill">
                        <i class="ni ni-html5" />
                      </span>
                    </div>
                    <div>
                      <h4 class="mb-0">Amazing page examples</h4>
                    </div>
                  </div>
                </li>
                <li class="py-2">
                  <div class="d-flex align-items-center">
                    <div>
                      <span
                        class="badge badge-circle mr-3 badge-success badge-pill">
                        <i class="ni ni-satisfied" />
                      </span>
                    </div>
                    <div>
                      <h4 class="mb-0">Super friendly support team</h4>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="py-6">
      <div class="container">
        <div class="row row-grid align-items-center">
          <div class="col-md-6">
            <img alt="" src="img/theme/landing-2.png" class="img-fluid" />
          </div>
          <div class="col-md-6">
            <div class="pr-md-5">
              <h1>Example pages</h1>
              <p>
                If you want to get inspiration or just show something directly
                to your clients, you can jump start your development with our
                pre-built example pages.
              </p>
              <a href="#/pages/user" class="font-weight-bold text-warning mt-5">
                Explore pages
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="py-6">
      <div class="container">
        <div class="row row-grid align-items-center">
          <div class="order-md-2 col-md-6">
            <img alt="" src="img/theme/landing-3.png" class="img-fluid" />
          </div>
          <div class="col-md-6 col-md-6">
            <div class="pr-md-5">
              <h1>Lovable widgets and cards</h1>
              <p>
                We love cards and everybody on the web seems to. We have gone
                above and beyond with options for you to organise your
                information. From cards designed for content, to pricing cards
                or user profiles, you will have many options to choose from.
              </p>
              <a href="#/widgets" class="font-weight-bold text-info mt-5">
                Explore widgets
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="py-7 section-nucleo-icons bg-white overflow-hidden">
      <div class="container">
        <div class="row justify-content-center">
          <div class="text-center col-lg-8">
            <h2 class="display-3">Nucleo Icons</h2>
            <p class="lead">
              The official package contains over 21.000 icons which are looking
              great in combination with Argon Design System. Make sure you check
              all of them and use those that you like the most.
            </p>
            <div class="btn-wrapper">
              <a
                href="https://www.creative-tim.com/learning-lab/svelte/icons/argon-dashboard"
                class="btn btn-primary">
                View demo icons
              </a>
              <a
                href="https://nucleoapp.com/?ref=1712"
                target="_blank"
                class="btn btn-default mt-3 mt-md-0">
                View all icons
              </a>
            </div>
          </div>
        </div>
        <div class="blur--hover">
          <a
            href="https://www.creative-tim.com/learning-lab/svelte/icons/argon-dashboard">
            <div class="icons-container blur-item mt-5">
              <i class="icon ni ni-diamond" />
              <i class="icon icon-sm ni ni-album-2" />
              <i class="icon icon-sm ni ni-app" />
              <i class="icon icon-sm ni ni-atom" />
              <i class="icon ni ni-bag-17" />
              <i class="icon ni ni-bell-55" />
              <i class="icon ni ni-credit-card" />
              <i class="icon icon-sm ni ni-briefcase-24" />
              <i class="icon icon-sm ni ni-building" />
              <i class="icon icon-sm ni ni-button-play" />
              <i class="icon ni ni-calendar-grid-58" />
              <i class="icon ni ni-camera-compact" />
              <i class="icon ni ni-chart-bar-32" />
            </div>
            <span class="blur-hidden h5 text-success">
              Eplore all the 21.000+ Nucleo Icons
            </span>
          </a>
        </div>
      </div>
    </section>
    <section class="py-7">
      <div class="container">
        <div class="row row-grid justify-content-center">
          <div class="text-center col-lg-8">
            <h2 class="display-3">
              Do you love this awesome
              <span class="text-success">Dashboard for Bootstrap 4?</span>
            </h2>
            <p class="lead">
              Cause if you do, it can be yours now. Hit the button below to
              navigate to get the free version or purchase a license for your
              next project. Build a new web app or give an old Bootstrap project
              a new look!
            </p>
            <div class="btn-wrapper">
              <a
                href="https://www.creative-tim.com/product/argon-dashboard-svelte?ref=adpsvelte-index-page"
                target="_blank"
                class="btn btn-neutral mb-3 mb-sm-0 disabled">
                <span class="btn-inner--text">Get FREE version</span>
              </a>
              <a
                href="https://www.creative-tim.com/product/argon-dashboard-pro-svelte?ref=adpsvelte-index-page"
                class="btn btn-success btn-icon mb-3 mb-sm-0">
                <span class="btn-inner--icon">
                  <i class="ni ni-basket" />
                </span>
                <span class="btn-inner--text">Purchase now</span>
                <span
                  size="md"
                  class="badge badge-floating border-white badge-danger
                  badge-pill">
                  $89
                </span>
              </a>
            </div>
            <div class="text-center">
              <h4 class="display-4 mb-5 mt-5">
                Available on these technologies
              </h4>
              <div class="row justify-content-center overflow-hidden">
                <div class="my-2 col-md-2 col-3" style="color: #fff;">
                <SvelteTooltip tip="Svelte - Cybernetically enhanced web apps" top color="#000">
                  <a
                    href="https://www.creative-tim.com/product/argon-dashboard-pro-svelte?ref=adpsvelte-index-page"
                    target="_blank"
                    class="el-tooltip"
                    aria-describedby="el-tooltip-9512"
                    tabindex="0">
                    <img
                      alt=""
                      src="https://raw.githubusercontent.com/creativetimofficial/public-assets/master/logos/svelte.jpg"
                      class="shadow shadow-lg--hover img-fluid rounded-circle" />
                  </a>
                  </SvelteTooltip>
                </div>
                <div class="my-2 col-md-2 col-3" style="color: #fff;">
                <SvelteTooltip tip="Bootstrap 4 - Most popular fron-end component library" top color="#000">
                  <a
                    href="https://www.creative-tim.com/product/argon-dashboard-pro?ref=adpsvelte-index-page"
                    target="_blank"
                    class="el-tooltip"
                    aria-describedby="el-tooltip-9512"
                    tabindex="0">
                    <img
                      alt=""
                      src="https://s3.amazonaws.com/creativetim_bucket/tim_static_images/presentation-page/bootstrap.jpg"
                      class="shadow shadow-lg--hover img-fluid rounded-circle" />
                  </a>
                  </SvelteTooltip>
                </div>
                <div class="my-2 col-md-2 col-3"  style="color: #fff;">
                <SvelteTooltip tip="Vue.js - The progressive javascript framework" top color="#000">
                  <a
                    href="https://www.creative-tim.com/product/vue-argon-dashboard-pro?ref=adpsvelte-index-page"
                    target="_blank"
                    class="el-tooltip"
                    aria-describedby="el-tooltip-4193"
                    tabindex="0">
                    <img
                      alt=""
                      src="https://s3.amazonaws.com/creativetim_bucket/tim_static_images/presentation-page/vue.jpg"
                      class="img-fluid rounded-circle" />
                  </a>
                  </SvelteTooltip>
                </div>
                <div class="my-2 col-md-2 col-3" style="color: #fff;">
                <SvelteTooltip tip="Sketch - Digital design toolkit" top color="#000">
                  <a
                    href="https://www.creative-tim.com/product/argon-dashboard-pro?ref=adpsvelte-index-page"
                    target="_blank"
                    class="el-tooltip"
                    aria-describedby="el-tooltip-9075"
                    tabindex="0">
                    <img
                      alt=""
                      src="https://s3.amazonaws.com/creativetim_bucket/tim_static_images/presentation-page/sketch.jpg"
                      class="img-fluid rounded-circle" />
                  </a>
                  </SvelteTooltip>
                </div>
                <div class="my-2 col-md-2 col-3" style="color: #fff;">
                  <SvelteTooltip tip="[Coming Soon] Adope Photoshop - Software for digital images manipulation" top color="#000">
                  <a
                    href=" https://www.adobe.com/products/photoshop.html"
                    target="_blank"
                    class="el-tooltip"
                    aria-describedby="el-tooltip-7637"
                    tabindex="0">
                    <img
                      alt=""
                      src="https://s3.amazonaws.com/creativetim_bucket/tim_static_images/presentation-page/ps.jpg"
                      class="opacity-3 img-fluid rounded-circle" />
                  </a>
                  </SvelteTooltip>
                </div>
                <div class="my-2 col-md-2 col-3" style="color: #fff;">
                <SvelteTooltip tip="Angular - One framework, Mobile" top color="#000">
                  <a
                    href="https://www.creative-tim.com/product/argon-dashboard-pro-angular?ref=adpsvelte-index-page"
                    target="_blank"
                    class="el-tooltip"
                    aria-describedby="el-tooltip-1520"
                    tabindex="0">
                    <img
                      alt=""
                      src="https://s3.amazonaws.com/creativetim_bucket/tim_static_images/presentation-page/angular.jpg"
                      class="img-fluid rounded-circle" />
                  </a>
                  </SvelteTooltip>
                </div>
                <div class="my-2 col-md-2 col-3" style="color: #fff;">
                  <SvelteTooltip tip="React - A JavaScript library for building user interfaces" top color="#000">
                  <a
                    href="https://www.creative-tim.com/product/argon-dashboard-pro-react?ref=adpsvelte-index-page"
                    target="_blank"
                    class="el-tooltip"
                    aria-describedby="el-tooltip-1940"
                    tabindex="0">
                    <img
                      alt=""
                      src="https://s3.amazonaws.com/creativetim_bucket/tim_static_images/presentation-page/react.jpg"
                      class="img-fluid rounded-circle" />
                  </a>
                  </SvelteTooltip>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</div>
