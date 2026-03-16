<template>
  <header class="header-global">
    <base-nav
      class="navbar-main headroom"
      id="navbar-main"
      :type="navbarType ? navbarType : ''"
      effect="dark"
      expand
    >
      <router-link slot="brand" class="navbar-brand mr-lg-5" to="/">
        <img src="img/brand/white.png" alt="logo" />
      </router-link>

      <div class="row" slot="content-header" slot-scope="{ closeMenu }">
        <div class="col-6 collapse-brand">
          <a href="javascript:void(0)">
            <img src="img/brand/blue.png" />
          </a>
        </div>
        <div class="col-6 collapse-close">
          <close-button @click="closeMenu"></close-button>
        </div>
      </div>

      <ul class="navbar-nav navbar-nav-hover align-items-lg-center ml-lg-auto">
        <base-dropdown class="nav-item" menu-classes="dropdown-menu-xl">
          <a
            role="button"
            slot="title"
            href="/elements"
            class="nav-link"
            data-toggle="dropdown"
          >
            <i class="ni ni-ui-04 d-lg-none"></i>
            <span class="nav-link-inner--text">Elements</span>
          </a>
          <router-link to="/landing"></router-link>

          <div class="dropdown-menu-inner">
            <router-link to="/" class="media d-flex align-items-center">
              <div
                class="icon icon-shape bg-gradient-primary rounded-circle text-white"
              >
                <i class="ni ni-spaceship"></i>
              </div>
              <div class="media-body ml-3">
                <h6 class="heading text-primary mb-md-1">Elements</h6>
                <p class="description d-none d-md-inline-block mb-0">
                  Learn how to use compiling Scss, change brand colors and more.
                </p>
              </div>
            </router-link>
            <router-link
              to="/presentation"
              class="media d-flex align-items-center"
            >
              <div
                class="icon icon-shape bg-gradient-warning rounded-circle text-white"
              >
                <i class="ni ni-palette"></i>
              </div>
              <div class="media-body ml-3">
                <h6 class="heading text-primary mb-md-1">Presentation</h6>
                <p class="description d-none d-md-inline-block mb-0">
                  Learn more about colors, typography, icons and the grid system
                  we used for .
                </p>
              </div>
            </router-link>
          </div>
          <div class="dropdown-menu-footer">
            <a
              class="dropdown-item"
              href="https://www.creative-tim.com/learning-lab/vue/overview/argon-design-system"
            >
              <i class="ni ni-atom"></i>
              Getting Started
            </a>
            <a
              class="dropdown-item"
              href="https://www.creative-tim.com/learning-lab/vue/colors/argon-design-system"
            >
              <i class="ni ni-ui-04"></i>
              Foundation
            </a>
            <a
              class="dropdown-item"
              href="https://www.creative-tim.com/learning-lab/vue/alerts/argon-design-system"
            >
              <i class="ni ni-archive-2"></i>
              Components
            </a>
          </div>
        </base-dropdown>
        <base-dropdown class="nav-item">
          <a
            role="button"
            slot="title"
            href="#"
            class="nav-link"
            data-toggle="dropdown"
          >
            <i class="ni ni-app d-lg-none"></i>
            <span class="nav-link-inner--text">Design Blocks</span>
          </a>
          <router-link to="/sections#headers" class="dropdown-item">
            <i class="ni ni-album-2 text-info"></i>
            Headers
          </router-link>
          <router-link to="/sections#features" class="dropdown-item">
            <i class="ni ni-settings text-danger"></i>
            Features
          </router-link>
          <router-link to="/sections#blogs" class="dropdown-item">
            <i class="ni ni-align-left-2 text-primary"></i>
            Blogs
          </router-link>
          <router-link to="/sections#teams" class="dropdown-item">
            <i class="ni ni-user-run text-danger"></i>
            Teams
          </router-link>
          <router-link to="/sections#projects" class="dropdown-item">
            <i class="ni ni-paper-diploma text-purple"></i>
            Projects
          </router-link>
          <router-link to="/sections#pricing" class="dropdown-item">
            <i class="ni ni-money-coins text-pink"></i>
            Pricing
          </router-link>
          <router-link to="/sections#testimonials" class="dropdown-item">
            <i class="ni ni-chat-round text-muted"></i>
            Testimonials
          </router-link>
          <router-link to="/sections#contact-us" class="dropdown-item">
            <i class="ni ni-mobile-button text-success"></i>
            Contact Us
          </router-link>
          <router-link to="/sections#tables" class="dropdown-item">
            <i class="ni ni-chart-bar-32 text-default"></i>
            Tables
          </router-link>
          <router-link to="/sections#accordion" class="dropdown-item">
            <i class="ni ni-collection text-yellow"></i>
            Accordion
          </router-link>
        </base-dropdown>
        <base-dropdown class="nav-item">
          <a
            role="button"
            slot="title"
            href="#"
            class="nav-link"
            data-toggle="dropdown"
          >
            <i class="ni ni-single-copy-04 d-lg-none"></i>
            <span class="nav-link-inner--text">Examples</span>
          </a>
          <router-link to="/about" class="dropdown-item">
            <i class="ni ni-tie-bow text-warning"></i>
            About-us
          </router-link>
          <router-link to="/blog-post" class="dropdown-item">
            <i class="ni ni-align-center text-info"></i>
            Blog Post
          </router-link>
          <router-link to="/blog-posts" class="dropdown-item">
            <i class="ni ni-chart-bar-32 text-yellow"></i>
            Blog Posts
          </router-link>
          <router-link to="/contact-us" class="dropdown-item">
            <i class="ni ni-square-pin text-danger"></i>
            Contact Us
          </router-link>
          <router-link to="/landing-page" class="dropdown-item">
            <i class="ni ni-planet text-purple"></i>
            Landing Page
          </router-link>
          <router-link to="/pricing" class="dropdown-item">
            <i class="ni ni-money-coins text-success"></i>
            Pricing
          </router-link>
          <router-link to="/ecommerce" class="dropdown-item">
            <i class="ni ni-box-2 text-pink"></i>
            Ecommerce Page
          </router-link>
          <router-link to="/product-page" class="dropdown-item">
            <i class="ni ni-bag-17 text-primary"></i>
            Product Page
          </router-link>
          <router-link to="/profile-page" class="dropdown-item">
            <i class="ni ni-circle-08 text-info"></i>
            Profile Page
          </router-link>
          <router-link to="/error" class="dropdown-item">
            <i class="ni ni-button-power text-warning"></i>
            404 Error Page
          </router-link>
          <router-link to="/500-error" class="dropdown-item">
            <i class="ni ni-ungroup text-yellow"></i>
            500 Error Page
          </router-link>
        </base-dropdown>
        <base-dropdown class="nav-item">
          <a
            role="button"
            slot="title"
            href="#"
            class="nav-link"
            data-toggle="dropdown"
          >
            <i class="ni ni-tablet-button d-lg-none"></i>
            <span class="nav-link-inner--text">App Pages</span>
          </a>
          <router-link to="/account" class="dropdown-item">
            <i class="ni ni-lock-circle-open text-muted"></i>
            Account Settings
          </router-link>
          <router-link to="/login" class="dropdown-item">
            <i class="ni ni-tv-2 text-danger"></i>
            Login Page
          </router-link>
          <router-link to="/register" class="dropdown-item">
            <i class="ni ni-air-baloon text-pink"></i>
            Register Page
          </router-link>
          <router-link to="/reset" class="dropdown-item">
            <i class="ni ni-atom text-info"></i>
            Reset Page
          </router-link>
          <router-link to="/invoice" class="dropdown-item">
            <i class="ni ni-bullet-list-67 text-success"></i>
            Invoice Page
          </router-link>
          <router-link to="/checkout" class="dropdown-item">
            <i class="ni ni-basket text-orange"></i>
            Checkout Page
          </router-link>
          <router-link to="/chat-page" class="dropdown-item">
            <i class="ni ni-chat-round text-primary"></i>
            Chat Page
          </router-link>
        </base-dropdown>
      </ul>
    </base-nav>
  </header>
</template>
<script>
import BaseNav from "@/components/BaseNav";
import CloseButton from "@/components/CloseButton";
import BaseDropdown from "@/components/BaseDropdown";
import Headroom from "headroom.js";

export default {
  components: {
    BaseNav,
    CloseButton,
    BaseDropdown,
  },
  props: {
    navbarType: String,
  },
  mounted: function () {
    let headroom = new Headroom(document.getElementById("navbar-main"), {
      offset: 300,
      tolerance: {
        up: 30,
        down: 30,
      },
    });
    headroom.init();
  },
};
</script>
<style>
.navbar-main.headroom {
  z-index: 9999;
}
</style>
