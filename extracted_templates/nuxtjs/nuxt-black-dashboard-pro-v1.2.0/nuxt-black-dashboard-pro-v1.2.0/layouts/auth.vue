<template>
  <div>
    <base-nav
      v-model="showMenu"
      type="white"
      :transparent="true"
      menu-classes="justify-content-end"
      class="auth-navbar fixed-top"
    >
      <div slot="brand" class="navbar-wrapper">
        <a class="navbar-brand" href="#" v-if="title">{{ title }}</a>
      </div>

      <ul class="navbar-nav">
        <nuxt-link class="nav-item" tag="li" to="/">
          <a class="nav-link text-primary">
            <i class="tim-icons icon-minimal-left"></i> Back to Dashboard
          </a>
        </nuxt-link>
        <nuxt-link class="nav-item" tag="li" to="/register">
          <a class="nav-link">
            <i class="tim-icons icon-laptop"></i> Register
          </a>
        </nuxt-link>

        <nuxt-link class="nav-item" tag="li" to="/login">
          <a class="nav-link">
            <i class="tim-icons icon-single-02"></i> Login
          </a>
        </nuxt-link>

        <nuxt-link class="nav-item" tag="li" to="/pricing">
          <a class="nav-link"> <i class="tim-icons icon-coins"></i> Pricing </a>
        </nuxt-link>

        <nuxt-link class="nav-item" tag="li" to="/lock">
          <a class="nav-link">
            <i class="tim-icons icon-lock-circle"></i> Lock
          </a>
        </nuxt-link>
      </ul>
    </base-nav>

    <div class="wrapper wrapper-full-page">
      <div class="full-page" :class="pageClass">
        <div class="content">
          <zoom-center-transition
            :duration="pageTransitionDuration"
            mode="out-in"
          >
            <nuxt></nuxt>
          </zoom-center-transition>
        </div>
        <footer class="footer">
          <div class="container-fluid">
            <nav>
              <ul class="nav">
                <li class="nav-item">
                  <a
                    href="https://www.creative-tim.com"
                    target="_blank"
                    rel="noopener"
                    class="nav-link"
                  >
                    Creative Tim
                  </a>
                </li>
                <li class="nav-item">
                  <a
                    href="http://presentation.creative-tim.com"
                    target="_blank"
                    rel="noopener"
                    class="nav-link"
                  >
                    About Us
                  </a>
                </li>
                <li class="nav-item">
                  <a
                    href="http://blog.creative-tim.com"
                    target="_blank"
                    rel="noopener"
                    class="nav-link"
                  >
                    Blog
                  </a>
                </li>
              </ul>
            </nav>
            <div class="copyright">
              &copy; {{ year }}, made with
              <i class="tim-icons icon-heart-2"></i> by
              <a href="https://binarcode.com" target="_blank">BinarCode</a> and
              <a
                href="https://www.creative-tim.com/?ref=pdf-vuejs"
                target="_blank"
                rel="noopener"
                >Creative Tim</a
              >
              for a better web.
            </div>
          </div>
        </footer>
      </div>
    </div>
  </div>
</template>
<script>
import { BaseNav } from '@/components';
import { ZoomCenterTransition } from 'vue2-transitions';

export default {
  components: {
    BaseNav,
    ZoomCenterTransition
  },
  props: {
    backgroundColor: {
      type: String,
      default: 'black'
    }
  },
  data() {
    return {
      showMenu: false,
      menuTransitionDuration: 250,
      pageTransitionDuration: 200,
      year: new Date().getFullYear(),
      pageClass: 'login-page'
    };
  },
  computed: {
    title() {
      let parts = this.$route.path.split('/')
      let name = parts[parts.length - 1]
      return `${name} Page`;
    }
  },
  methods: {
    closeMenu() {
      document.body.classList.remove('nav-open');
      this.showMenu = false;
    }
  },
  beforeDestroy() {
    this.closeMenu();
  },
  beforeRouteUpdate(to, from, next) {
    // Close the mobile menu first then transition to next page
    if (this.showMenu) {
      this.closeMenu();
      setTimeout(() => {
        next();
      }, this.menuTransitionDuration);
    } else {
      next();
    }
  }
};
</script>
<style lang="scss">
.navbar.auth-navbar {
  top: 0;
}

$scaleSize: 0.8;
@keyframes zoomIn8 {
  from {
    opacity: 0;
    transform: scale3d($scaleSize, $scaleSize, $scaleSize);
  }
  100% {
    opacity: 1;
  }
}

.wrapper-full-page .zoomIn {
  animation-name: zoomIn8;
}

@keyframes zoomOut8 {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
    transform: scale3d($scaleSize, $scaleSize, $scaleSize);
  }
}

.wrapper-full-page .zoomOut {
  animation-name: zoomOut8;
}
</style>
