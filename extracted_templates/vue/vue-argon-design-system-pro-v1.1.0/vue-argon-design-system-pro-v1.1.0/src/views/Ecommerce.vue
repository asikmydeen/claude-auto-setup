<template>
  <div class="wrapper">
    <div
      class="page-header page-header-small header-filter skew-separator skew-mini"
    >
      <div
        class="page-header-image"
        style="background-image: url('img/pages/kevin-grieve.jpg')"
      ></div>
      <div class="container pt-0">
        <div class="row">
          <div class="col-lg-6 col-md-7 mx-auto text-center">
            <h1 class="title text-white">See our latest collection!</h1>
            <br />
            <div class="buttons">
              <base-button
                type="danger"
                rounded
                icon-only
                size="lg"
                icon="ni ni-cart ml-1"
              ></base-button>
              <p class="mt-3 d-inline text-white">Shop Now!</p>
            </div>
          </div>
        </div>
      </div>
      <!-- SVG separator -->
      <div class="separator separator-bottom separator-skew">
        <svg
          x="0"
          y="0"
          viewBox="0 0 2560 100"
          preserveAspectRatio="none"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
        >
          <polygon class="fill-white" points="2560 0 2560 100 0 100"></polygon>
        </svg>
      </div>
    </div>
    <div class="main">
      <div class="container">
        <div class="row">
          <div class="col-lg-4 col-md-6">
            <card class="card-blog" data-header="pattern">
              <a href="javascript:;">
                <img
                  class="img pattern rounded"
                  src="img/ill/presentation_bg.png"
                />
              </a>
              <template slot="body">
                <h6 class="card-category text-danger">
                  <i class="ni ni-badge"></i> Wearing
                </h6>
                <h5 class="card-title">
                  <a href="javascript:;">Choose the best products</a>
                </h5>
                <p class="card-description">
                  Yesterday, as Facebook launched its news reader app Paper,
                  design-focused startup FiftyThree called out Facebook...
                </p>
              </template>
            </card>
          </div>
          <div class="col-lg-4 col-md-6">
            <card class="card-blog">
              <template slot="image">
                <img
                  class="card-img-top"
                  src="img/ill/linth3.svg"
                  alt="Image placeholder"
                />
              </template>
              <template slot="body">
                <h6 class="card-category text-danger">
                  <i class="ni ni-badge"></i> Fashion
                </h6>
                <h5 class="card-title">
                  <a href="javascript:;">Wardrobe essentials</a>
                </h5>
                <p class="card-description">
                  Argon is a great free UI package based on Bootstrap 4 that
                  includes the most important components and features.
                </p>
              </template>
            </card>
          </div>
          <div class="col-lg-4 col-md-6">
            <card class="card-blog" data-header="pattern">
              <a href="javascript:;">
                <img class="img pattern rounded" src="img/ill/p2.svg" />
              </a>
              <template slot="body">
                <h6 class="card-category text-danger">
                  <i class="ni ni-badge"></i> Fashion
                </h6>
                <h5 class="card-title">
                  <a href="javascript:;">Wardrobe essentials</a>
                </h5>
                <p class="card-description">
                  Trends may come and go, but wardrobe essentials are here to
                  stay. Basic pieces tend to be universal across.
                </p>
              </template>
            </card>
          </div>
        </div>
      </div>
      <div class="section">
        <div class="container">
          <div class="row">
            <div class="col-md-10 mx-auto text-center">
              <h3 class="desc my-5 text-dark">Fresh new collection</h3>
            </div>
          </div>
          <div class="row">
            <div class="col-md-12">
              <div class="row">
                <div class="col-lg-3 col-md-6">
                  <card class="card-product card-plain">
                    <template slot="image">
                      <badge type="info">NEW</badge>
                      <a href="javascript:;">
                        <img src="img/pages/tshirt.png" alt="..." />
                      </a>
                    </template>
                    <template slot="body">
                      <a href="javascript:;">
                        <h5 class="card-title">Ralph Lauren</h5>
                      </a>
                      <div class="card-footer">
                        <div class="price-container">
                          <span class="price opacity-8"> € 300</span>
                        </div>
                        <base-button
                          type="danger"
                          icon-only
                          rounded
                          size="sm"
                          class="pull-right"
                          icon="ni ni-favourite-28"
                          v-b-tooltip.hover.top
                          title="Remove from wishlist"
                        ></base-button>
                      </div>
                    </template>
                  </card>
                </div>
                <div class="col-lg-3 col-md-6">
                  <card class="card-product card-plain">
                    <template slot="image">
                      <a href="javascript:;">
                        <img src="img/pages/bag.png" alt="..." />
                      </a>
                    </template>
                    <template slot="body">
                      <a href="javascript:;">
                        <h5 class="card-title">Tom Ford</h5>
                      </a>
                      <div class="card-footer">
                        <div class="price-container">
                          <span class="price-old opcaity-8"> € 1179</span>
                          <span class="price-new ml-1"> € 999</span>
                        </div>
                        <base-button
                          type="danger"
                          icon-only
                          rounded
                          size="sm"
                          class="pull-right"
                          icon="ni ni-favourite-28"
                          v-b-tooltip.hover.top
                          title="Remove from wishlist"
                        ></base-button>
                      </div>
                    </template>
                  </card>
                </div>
                <div class="col-lg-3 col-md-6">
                  <card class="card-product card-plain">
                    <template slot="image">
                      <a href="javascript:;">
                        <img src="img/pages/shirt.png" alt="..." />
                      </a>
                    </template>
                    <template slot="body">
                      <a href="javascript:;">
                        <h5 class="card-title">Wooyoungmi</h5>
                      </a>
                      <div class="card-footer">
                        <div class="price-container">
                          <span class="price opacity-8">€ 555</span>
                        </div>
                        <base-button
                          type="danger"
                          icon-only
                          rounded
                          size="sm"
                          class="pull-right"
                          icon="ni ni-favourite-28"
                          v-b-tooltip.hover.top
                          title="Remove from wishlist"
                        ></base-button>
                      </div>
                    </template>
                  </card>
                </div>
                <div class="col-lg-3 col-md-6">
                  <card class="card-product card-plain">
                    <template slot="image">
                      <a href="javascript:;">
                        <img src="img/pages/jeans.png" alt="..." />
                      </a>
                    </template>
                    <template slot="body">
                      <a href="javascript:;">
                        <h5 class="card-title">Thom Sweeney</h5>
                      </a>
                      <div class="card-footer">
                        <div class="price-container">
                          <span class="price opacity-8"> € 680</span>
                        </div>
                        <base-button
                          type="danger"
                          icon-only
                          rounded
                          size="sm"
                          class="pull-right"
                          icon="ni ni-favourite-28"
                          v-b-tooltip.hover.top
                          title="Remove from wishlist"
                        ></base-button>
                      </div>
                    </template>
                  </card>
                </div>
                <div class="col-md-3 ml-auto mr-auto mt-5 text-center">
                  <base-button type="primary" class="btn-round"
                    >Load more...</base-button
                  >
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="container text-center">
        <section class="blogs-1">
          <div class="container">
            <div class="row mb-5">
              <div class="col-md-8 mx-auto">
                <h3 class="display-3">Our recent writings</h3>
                <p class="lead mt-1">
                  The time is now for it to be okay to be great. People in this
                  world shun people for being great.
                </p>
              </div>
            </div>
            <div class="row">
              <div class="col-md-6 col-lg-3">
                <card
                  class="card-blog card-background"
                  data-animation="zooming"
                >
                  <div
                    class="full-background"
                    style="background-image: url('img/theme/josh-appel.jpg')"
                  ></div>
                  <template slot="body">
                    <div class="content-bottom">
                      <h6 class="card-category text-white opacity-8">
                        New Challenges
                      </h6>
                      <h5 class="card-title">Touch on a trend</h5>
                    </div>
                  </template>
                </card>
              </div>
              <div class="col-md-6 col-lg-3">
                <card
                  class="card-blog card-background"
                  data-animation="zooming"
                >
                  <div
                    class="full-background"
                    style="background-image: url('img/theme/john-hoang.jpg')"
                  ></div>
                  <template slot="body">
                    <div class="content-bottom">
                      <h6 class="card-category text-white opacity-8">
                        New Opportunities
                      </h6>
                      <h5 class="card-title">Constantly growing</h5>
                    </div>
                  </template>
                </card>
              </div>
              <div class="col-md-6">
                <card
                  class="card-blog card-background"
                  data-animation="zooming"
                >
                  <div
                    class="full-background"
                    style="background-image: url('img/theme/kit-suman.jpg')"
                  ></div>
                  <template slot="body">
                    <div class="content-bottom">
                      <h6 class="card-category text-white opacity-8">
                        Sales Leads
                      </h6>
                      <h5 class="card-title">
                        Configure Blockchain Technology
                      </h5>
                    </div>
                  </template>
                </card>
              </div>
            </div>
            <div class="row align-items-center">
              <div class="col-lg-6">
                <card
                  class="card-blog card-background"
                  data-animation="zooming"
                >
                  <div
                    class="full-background"
                    style="background-image: url('img/sections/damian.jpg')"
                  ></div>
                  <template slot="body">
                    <div class="content-bottom">
                      <h6 class="card-category text-white opacity-8">
                        AI at the Edge
                      </h6>
                      <h5 class="card-title">Research Byte</h5>
                    </div>
                  </template>
                </card>
              </div>
              <div class="col-lg-3">
                <card
                  class="card-blog card-background"
                  data-animation="zooming"
                >
                  <div
                    class="full-background"
                    style="background-image: url('img/sections/ashim.jpg')"
                  ></div>
                  <template slot="body">
                    <div class="content-bottom">
                      <h6 class="card-category text-white opacity-8">
                        Spectrum
                      </h6>
                      <h5 class="card-title">Data Virtualization</h5>
                    </div>
                  </template>
                </card>
              </div>
              <div class="col-lg-3">
                <card
                  class="card-blog card-background"
                  data-animation="zooming"
                >
                  <div
                    class="full-background"
                    style="background-image: url('img/sections/odin.jpg')"
                  ></div>
                  <template slot="body">
                    <div class="content-bottom">
                      <h6 class="card-category text-white opacity-8">
                        Touch on a trend
                      </h6>
                      <h5 class="card-title">New Challenges</h5>
                    </div>
                  </template>
                </card>
              </div>
            </div>
            <base-button class="mt-4" type="primary" icon="ni ni-bold-right">
              Show more
            </base-button>
          </div>
        </section>
      </div>
      <div class="section">
        <div class="container">
          <div class="row">
            <div class="col-md-10 mx-auto text-center">
              <h3 class="desc my-5">The latest accessories</h3>
            </div>
          </div>
          <div class="row">
            <div class="col-md-12">
              <div class="row">
                <div class="col-lg-3 col-md-6">
                  <card class="card-product">
                    <template slot="image">
                      <a href="javascript:;">
                        <img src="img/pages/hat.png" alt="..." />
                      </a>
                    </template>
                    <template slot="body">
                      <a href="javascript:;">
                        <h4 class="card-title">Winter Hat</h4>
                      </a>
                      <div class="card-footer">
                        <div class="price-container">
                          <span class="price opacity-8">€ 99</span>
                        </div>
                      </div>
                    </template>
                  </card>
                </div>
                <div class="col-lg-3 col-md-6">
                  <card class="card-product">
                    <template slot="image">
                      <a href="javascript:;">
                        <img src="img/pages/shorts.png" alt="..." />
                      </a>
                    </template>
                    <template slot="body">
                      <a href="javascript:;">
                        <h4 class="card-title">Gucci Shorts</h4>
                      </a>
                      <div class="card-footer">
                        <div class="price-container">
                          <span class="price-old"> € 879</span>
                          <span class="price-new ml-1"> € 499</span>
                        </div>
                      </div>
                    </template>
                  </card>
                </div>
                <div class="col-lg-3 col-md-6">
                  <card class="card-product">
                    <template slot="image">
                      <a href="javascript:;">
                        <img src="img/pages/bracelet.png" alt="..." />
                      </a>
                    </template>
                    <template slot="body">
                      <a href="javascript:;">
                        <h4 class="card-title">Ice Bracelet</h4>
                      </a>
                      <div class="card-footer">
                        <div class="price-container">
                          <span class="price">€ 19,999</span>
                        </div>
                      </div>
                    </template>
                  </card>
                </div>
                <div class="col-lg-3 col-md-6">
                  <card class="card-product">
                    <template slot="image">
                      <a href="javascript:;">
                        <img src="img/pages/bullet.png" alt="..." />
                      </a>
                    </template>
                    <template slot="body">
                      <a href="javascript:;">
                        <h4 class="card-title">Necklace</h4>
                      </a>
                      <div class="card-footer">
                        <div class="price-container">
                          <span class="price"> € 229</span>
                        </div>
                      </div>
                    </template>
                  </card>
                </div>
                <div class="col-md-3 ml-auto mr-auto mt-5 text-center">
                  <base-button type="primary" class="btn-round"
                    >Load more...</base-button
                  >
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="testimonials-1 bg-secondary py-5 skew-separator skew-top">
        <div class="container">
          <div class="row">
            <div class="col-md-6 ml-auto mr-auto text-center">
              <h2 class="title">What Clients Say</h2>
            </div>
          </div>
          <b-carousel
            id="carousel-testimonials1"
            height="150vh"
            class="carousel-team"
            ref="myCarousel"
          >
            <b-carousel-slide class="carousel-inner">
              <div class="row text-left">
                <div class="col-md-5 ml-auto mt-5">
                  <h3 class="card-title">Sarah Smith</h3>
                  <h3 class="text-primary">• • •</h3>
                  <h4 class="lead">
                    Take up one idea. Make that one idea your life - think of
                    it, dream of it, live on that idea. Let the brain, muscles,
                    nerves, every part of your body, be full of that idea, and
                    just leave every other idea alone. This is the way to
                    success. A single rose can be my garden... a single friend,
                    my world.
                  </h4>
                  <base-button
                    tag="a"
                    href="javascript:void(0)"
                    class="mt-3"
                    type="primary"
                    >Read more</base-button
                  >
                </div>
                <div class="col-md-5 p-5 ml-auto">
                  <div class="p-3">
                    <img
                      class="img-fluid rounded shadow transform-perspective-right"
                      src="img/faces/fezbot.jpg"
                      alt="First slide"
                    />
                  </div>
                </div>
              </div>
            </b-carousel-slide>
            <b-carousel-slide class="carousel-inner">
              <div class="row text-left">
                <div class="col-md-5 mt-5 ml-auto">
                  <h3 class="card-title">Isaac Hunter</h3>
                  <h3 class="text-info">• • •</h3>
                  <h4 class="lead">
                    Take up one idea. Make that one idea your life - think of
                    it, dream of it, live on that idea. Let the brain, muscles,
                    nerves, every part of your body, be full of that idea, and
                    just leave every other idea alone. This is the way to
                    success. A single rose can be my garden... a single friend,
                    my world.
                  </h4>
                  <base-button
                    tag="a"
                    href="javascript:void(0)"
                    class="mt-3"
                    type="info"
                    >Read more</base-button
                  >
                </div>
                <div class="col-md-5 p-5 ml-auto">
                  <div class="p-3">
                    <img
                      class="img-fluid rounded shadow transform-perspective-right"
                      src="img/faces/brooke-cagle.jpg"
                      alt="First slide"
                    />
                  </div>
                </div>
              </div>
            </b-carousel-slide>
            <a
              class="carousel-control-prev text-primary"
              v-on:click="prev"
              role="button"
              data-slide="prev"
            >
              <i class="ni ni-bold-left"></i>
              <span class="sr-only">Previous</span>
            </a>
            <a
              class="carousel-control-next text-primary"
              v-on:click="next"
              role="button"
              data-slide="next"
            >
              <i class="ni ni-bold-right"></i>
              <span class="sr-only">Next</span>
            </a>
          </b-carousel>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { VBTooltip } from "bootstrap-vue/esm/directives/tooltip/tooltip";
import "bootstrap-vue/dist/bootstrap-vue.min.css";
import { BCarousel } from "bootstrap-vue/esm/components/carousel/carousel";
import { BCarouselSlide } from "bootstrap-vue/esm/components/carousel/carousel-slide";

export default {
  bodyClass: "ecommerce-page",
  components: {
    BCarousel,
    BCarouselSlide,
  },
  directives: {
    BTooltip: VBTooltip,
  },
  methods: {
    prev() {
      this.$refs.myCarousel.prev();
    },
    next() {
      this.$refs.myCarousel.next();
    },
  },
};
</script>
<style>
.ecommerce-page a.carousel-control-prev,
.ecommerce-page a.carousel-control-next {
  z-index: 9999;
}
</style>
